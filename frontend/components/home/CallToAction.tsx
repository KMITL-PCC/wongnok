import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center p-4 md:absolute md:top-140 md:left-1/2 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:transform md:p-0">
      {/* --- ปุ่มสำหรับจอเล็ก --- */}
      {/* เปลี่ยน h-auto เป็น h-10 (ความสูง 40px) */}
      <Button className="group inline-flex items-center justify-center rounded-full bg-green-500 px-5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-600 md:hidden">
        <span>LOOK FOR FOOD</span>
        <ArrowRight
          size={18}
          className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Button>

      {/* --- ปุ่มสำหรับจอใหญ่ --- */}
      {/* เปลี่ยน h-auto เป็น h-12 (ความสูง 48px) */}
      <Button className="group hidden items-center justify-center rounded-full bg-green-500 px-6 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-600 md:inline-flex">
        <span>LOOK FOR FOOD</span>
        <ArrowRight
          size={18}
          className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Button>
    </div>
  );
};

export default CallToAction;
