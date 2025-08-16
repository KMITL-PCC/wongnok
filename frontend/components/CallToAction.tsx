// src/app/CallToAction.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    // This button is positioned absolutely relative to its parent container in the Hero component.
    // It will appear centered below the desktop image gallery.
    <div className="absolute top-120 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Button className="group inline-flex h-auto items-center rounded-full bg-green-500 px-6 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-600">
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
