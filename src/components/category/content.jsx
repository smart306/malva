"use client"
import { SidebarProvider, useSidebar } from "../ui/sidebar";
import Filter from "./filter";
import { SlidersIcon } from "lucide-react";
import { Button } from "../ui/button";
import Background from "../background";
import CardProduct from "./cardpro";
export default function ContentCategory({datacontent}){
    
    const MobileTrigger = () => {
      const { toggleSidebar } = useSidebar();
      return (
        <Button variant="secondary" onClick={toggleSidebar} className="p-2">
          <SlidersIcon />
        </Button>
      );
    };
    return (
      <div className="w-full h-full relative">
        <div className="absolute hidden lg:block w-full h-full -z-10">
          <Background />
        </div>
        <div className="my-container relative flex flex-col md:flex-row gap-x-4">
          <SidebarProvider className="contents h-full">
            <div className="md:hidden flex justify-center items-center p-4">
              <MobileTrigger />
            </div>
            <Filter />
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {datacontent.map((item) => (
                 <CardProduct key={item._id} item={item}/>
                ))}
              </div>
              <div className="w-full flex justify-center p-4">
                <Button
                  variant="secondary"
                  className="px-4 py-2 flex justify-center items-center text-center rounded-full w-full md:w-fit"
                >
                  <p className="h3 font-secondary text-center items-center ">
                    Більше
                  </p>
                </Button>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    );
}