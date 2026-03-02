"use client";
import Lowbar from "./lowbar";
import TopBar from "./topbar";

export default function Navbar() {
  return (
    <div className="w-full absolute top-0 left-0 z-50">
      <div className="hidden lg:block mb-5">
        <TopBar />
      </div>
      <Lowbar />
    </div>
  );
}
