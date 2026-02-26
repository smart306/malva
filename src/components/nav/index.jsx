"use client";
import Lowbar from "./lowbar";
import TopBar from "./topbar";

export default function Navbar() {
  return (
    <div className="w-full space-y-5 max-lg:pt-5">
      <div className="hidden lg:block">
        <TopBar />
      </div>
      <Lowbar />
    </div>
  );
}
