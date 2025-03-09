import { createClient } from "@/lib/supabse/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const supabase = await createClient();
    const { inviteCode, userId } = await req.json();

    console.log("🔹 Received request with:", { inviteCode, userId });

    if (!userId) {
      console.error("❌ Error: No user ID found in request.");
      return NextResponse.json({ error: "Unauthorized. No user ID found." }, { status: 401 });
    }

    // Fetch the organization by invite code
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .select("id")
      .eq("join_code", inviteCode)
      .single();

    if (!org || orgError) {
      console.error("❌ Error: Invalid invite code.");
      return NextResponse.json({ error: "Invalid invite code." }, { status: 400 });
    }

    // Fetch the user name
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("name")
      .eq("id", userId)
      .single();

    if (!user || userError) {
      console.error("❌ Error: User not found.");
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from("organization_members")
      .select("id")
      .eq("organization_id", org.id)
      .eq("user_id", userId)
      .single();

    if (existingMember) {
      console.error("❌ Error: User is already a member.");
      return NextResponse.json({ error: "You are already a member of this organization." }, { status: 400 });
    }

    // Add user to organization_members with employee_name
    const { error: insertError } = await supabase.from("organization_members").insert({
      organization_id: org.id,
      user_id: userId,
      employee_name: user.name, // ✅ Store the user's name
      role: "employee", // ✅ Default role
      joined_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("❌ Error: Failed to insert into organization_members.", insertError);
      return NextResponse.json({ error: "Failed to join the organization." }, { status: 500 });
    }

    console.log("✅ Success: User joined organization.");
    return NextResponse.json({ success: "You have successfully joined the organization!" }, { status: 200 });

  } catch (error) {
    console.error("❌ Unexpected server error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
};
