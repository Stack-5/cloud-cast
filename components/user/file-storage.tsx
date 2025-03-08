import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { CardContent, CardFooter, CardTitle } from "../ui/card";

// Mock data for files
const files = [
  { fileName: "Unit Testing Report", type: ".docx", size: "2.4MB" },
  { fileName: "Project Proposal", type: ".pdf", size: "1.2MB" },
  { fileName: "Meeting Notes", type: ".txt", size: "500KB" },
  { fileName: "Design Mockups", type: ".png", size: "4.8MB" },
  { fileName: "Final Report", type: ".pdf", size: "3.1MB" },
];

const FileStorage = () => {
  return (
    <ScrollArea className="h-[250px] w-full px-2">
      {files.map((file, index) => (
        <div key={index} className="mb-2 p-3 shadow-sm border border-[#C1C7D0] rounded-lg bg-white">
          <CardContent className="p-2">
            <CardTitle className="text-[#172B4D]">{file.fileName}</CardTitle>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-[#7A869A] px-3 pb-3">
            <span>{file.type}</span>
            <span>{file.size}</span>
          </CardFooter>
        </div>
      ))}
    </ScrollArea>
  );
};

export default FileStorage;
