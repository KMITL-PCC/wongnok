import React from 'react'
import { Button } from "@/components/ui/button"
import {ArrowRight, Icon } from 'lucide-react';

const CallToAction = () => {
  return (
    <div>
      {/* ปุ่มกด */}
            <Button
              className="absolute w-[250px] h-[47.6px] top-[500px] left-[645px] 
                         rounded-[40px] text-sm font-bold
                         bg-green-500 hover:bg-gray-800 text-white"
            >
              <span>LOOK FOR FOOD</span>
              <ArrowRight size={18} className="ml-1" />
            </Button>   
    </div>
  )
}

export default CallToAction
