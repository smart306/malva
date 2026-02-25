"use client";
import Lowbar from "./lowbar";
import TopBar from "./topbar";

export default function Navbar(){
    return (
      <div className="w-full">
        <div className="hidden lg:block">
          <TopBar />
        </div>
        <Lowbar />
      </div>
    );
}