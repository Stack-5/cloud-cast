import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardFooter } from "@/components/ui/card";

const messages = [
  {
    id: 1,
    sender: "Ljan",
    message: "Hello, babe! I'm almost finished here.",
    time: "13:00",
  },
  { id: 2, sender: "Black Nibbs", message: "You: Lig lig", time: "15:24" },
  { id: 3, sender: "Angel", message: "Pasundo pls", time: "17:02" },
  {
    id: 4,
    sender: "Another User",
    message: "More messages to check layout responsiveness.",
    time: "18:45",
  },
  {
    id: 5,
    sender: "Someone Else",
    message:
      "This is a very long message to test if it truncates properly when the text is too long to fit in the available space...",
    time: "20:10",
  },
];

const truncateMessage = (text: string, maxLength = 65) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Inbox = () => {
  return (
    <Tabs defaultValue="opened" className="flex flex-col h-full">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="opened">Opened</TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
      </TabsList>

      {/* Opened Messages */}
      <TabsContent value="opened" className="flex-1 flex flex-col">
        <ScrollArea className="h-[200px] w-full">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="mb-2 border border-gray-300 rounded-md bg-white p-3"
            >
              <div className="font-semibold">{msg.sender}</div>
              <CardFooter className="flex justify-between items-center text-sm text-gray-600 px-0 pb-0">
                <span>{truncateMessage(msg.message)}</span>
                <span className="whitespace-nowrap">{msg.time}</span>
              </CardFooter>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>

      {/* Unread Messages */}
      <TabsContent value="unread" className="flex-1 flex flex-col">
        <ScrollArea className="h-[200px] w-full">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="mb-2 border border-gray-300 rounded-md bg-white p-3"
            >
              <div className="font-semibold">{msg.sender}</div>
              <CardFooter className="flex justify-between items-center text-sm text-gray-600 px-0 pb-0">
                <span>{truncateMessage(msg.message)}</span>
                <span className="whitespace-nowrap">{msg.time}</span>
              </CardFooter>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default Inbox;
