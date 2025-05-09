"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { PropsWithChildren, useState } from "react";

export const SideBar = ({ children }: PropsWithChildren) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <aside
      className={`hidden lg:block sticky top-24 h-[calc(100vh-12rem)] overflow-auto transition-all duration-300 ${
        sidebarCollapsed ? "w-12" : "w-80"
      }`}
    >
      <div className="bg-card border rounded-lg p-4 h-full">
        {sidebarCollapsed ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="w-full h-8 flex justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
            </div>
            {children}
          </>
        )}
      </div>
    </aside>
  );
};
