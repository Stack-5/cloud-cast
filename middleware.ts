import { type NextRequest } from "next/server"
 
import { updateSession } from "./lib/supabse/middleware"
 
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
 
export const config = {
  matcher: ["/","/dashboard","/protected", "/signin", "/admin/:path*"],
}