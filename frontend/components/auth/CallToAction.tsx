import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div>
      {/* ปุ่มกด */}
      <Button className="absolute top-[500px] left-[645px] h-[47.6px] w-[250px] rounded-[40px] bg-green-500 text-sm font-bold text-white hover:bg-gray-800">
        <span>LOOK FOR FOOD</span>
        <ArrowRight size={18} className="ml-1" />
      </Button>
    </div>
  );
};

export default CallToAction;
