"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample mock data
const userActivityData = [
  { month: "Jan", active: 120, returning: 80 },
  { month: "Feb", active: 180, returning: 100 },
  { month: "Mar", active: 150, returning: 90 },
];

const taskData = [
  { project: "Project A", completed: 30, pending: 15 },
  { project: "Project B", completed: 45, pending: 20 },
];

const orgData = [
  { role: "Admins", count: 5 },
  { role: "Product Managers", count: 8 },
  { role: "Employees", count: 25 },
];

const storageData = [
  { org: "Org A", used: 75, total: 100 },
  { org: "Org B", used: 60, total: 100 },
];

// Ensure TypeScript recognizes all possible chart data structures
type ChartDataType = typeof userActivityData | typeof taskData | typeof orgData | typeof storageData;

// Chart options mapping
const dataMap: Record<string, ChartDataType> = {
  "User Activity": userActivityData,
  "Project & Task Management": taskData,
  "Organization & Team Metrics": orgData,
  "File & Storage Usage": storageData,
};

const Analytics = () => {
  const [selectedChart, setSelectedChart] = useState<keyof typeof dataMap>("User Activity");
  const [chartData, setChartData] = useState<ChartDataType>(userActivityData);

  // Update chart data when dropdown selection changes
  useEffect(() => {
    console.log("Selected Chart:", selectedChart);
    console.log("Data Used:", dataMap[selectedChart]);

    setChartData(dataMap[selectedChart]);
  }, [selectedChart]);

  return (
    <div className="p-6 w-full h-full">
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 bg-[#0052CC] text-white rounded-md shadow-md">
          <span>{selectedChart}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-[#172B4D] text-[#172B4D]">
          {Object.keys(dataMap).map((option) => (
            <DropdownMenuItem
              key={option}
              className="hover:bg-[#0052CC] hover:text-white cursor-pointer px-4 py-2"
              onClick={() => setSelectedChart(option as keyof typeof dataMap)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Chart Display */}
      <div className="mt-6 p-4 bg-white rounded-md shadow-md border border-[#172B4D] w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} className="w-full h-full">
            <CartesianGrid strokeDasharray="3 3" strokeLinecap="round" />
            <XAxis
              dataKey={
                selectedChart === "Organization & Team Metrics"
                  ? "role"
                  : selectedChart === "File & Storage Usage"
                  ? "org"
                  : selectedChart === "Project & Task Management"
                  ? "project"
                  : "month"
              }
            />
            <Tooltip contentStyle={{ borderRadius: "8px" }} />
            <Legend />
            
            {/* Ensure each dataset has correct dataKey */}
            {selectedChart === "User Activity" && (
              <>
                <Bar dataKey="active" fill="#FF5630" radius={[8, 8, 0, 0]} />
                <Bar dataKey="returning" fill="#FFAB00" radius={[8, 8, 0, 0]} />
              </>
            )}
            {selectedChart === "Project & Task Management" && (
              <>
                <Bar dataKey="completed" fill="#36B37E" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pending" fill="#00B8D9" radius={[8, 8, 0, 0]} />
              </>
            )}
            {selectedChart === "Organization & Team Metrics" && (
              <Bar dataKey="count" fill="#6554C0" radius={[8, 8, 0, 0]} />
            )}
            {selectedChart === "File & Storage Usage" && (
              <>
                <Bar dataKey="used" fill="#0052CC" radius={[8, 8, 0, 0]} />
                <Bar dataKey="total" fill="#172B4D" radius={[8, 8, 0, 0]} />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
