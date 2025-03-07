import {
  Card,
  CardContent,
} from "@/components/ui/card";

const ClientPage = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-5 gap-2 h-full p-4">
      {/* Top Left Card */}
      <Card className="col-span-3 row-span-3">
        <CardContent className="flex items-center justify-center h-full">
          1
        </CardContent>
      </Card>

      {/* Top Right Card */}
      <Card className="col-span-3 row-span-3 col-start-4">
        <CardContent className="flex items-center justify-center h-full">
          2
        </CardContent>
      </Card>

      {/* Bottom Left Card */}
      <Card className="col-span-2 row-span-2 row-start-4">
        <CardContent className="flex items-center justify-center h-full">
          3
        </CardContent>
      </Card>

      {/* Bottom Middle Card */}
      <Card className="col-span-2 row-span-2 col-start-3 row-start-4">
        <CardContent className="flex items-center justify-center h-full">
          4
        </CardContent>
      </Card>

      {/* Bottom Right Card */}
      <Card className="col-span-2 row-span-2 col-start-5 row-start-4">
        <CardContent className="flex items-center justify-center h-full">
          5
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPage;
