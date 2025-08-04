// src/app/page.tsx
import { Search, User, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import './globals.css';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      
      {/* ส่วน Header */}
      <header className="w-full bg-white p-4 shadow-sm flex items-center justify-between fixed top-0 left-0 z-50">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          </div>
          <span className="text-xl font-bold text-green-500 hidden sm:block">Logo Text</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full bg-gray-100 p-2 max-w-md w-full mx-4">
          <Search className="text-gray-500 ml-2" size={20} />
          <Input 
            type="text" 
            placeholder="Search" 
            className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 text-base"
          />
        </div>

        {/* Login Button */}
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 hidden sm:flex items-center space-x-2">
          <User size={20} />
          <span>เข้าสู่ระบบ</span>
        </Button>
      </header>

      {/* ส่วน Content หลัก */}
      <main className="container mx-auto p-8 mt-20 flex flex-col items-center">
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center my-10">
          อยากกินอะไร เราหาให้
        </h1>

        {/* Gallery Grid - Layout ใหม่ */}
        <div className="relative w-full max-w-[1920px] mx-auto grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-7 gap-4 auto-rows-max">
          
          {/* รูปที่ 2 (ซ้ายของรูปที่ 3) */}
          <div className="relative col-span-2 row-span-2 rounded-[40px] shadow-lg overflow-hidden">
            <Image src="/food2.png" alt="Food 2" layout="fill" objectFit="cover" />
          </div>
          
          {/* รูปที่ 3 (ซ้ายของรูปที่ 4) */}
          <div className="relative col-span-2 row-span-3 rounded-[40px] shadow-lg overflow-hidden">
            <Image src="/food3.png" alt="Food 3" layout="fill" objectFit="cover" />
          </div>
          
          {/* รูปที่ 4 (ตรงกลาง) */}
          <div className="relative col-span-2 row-span-3 rounded-[40px] shadow-lg overflow-hidden">
            <Image src="/food4.png" alt="Food 4" layout="fill" objectFit="cover" />
          </div>
          
          {/* รูปที่ 5 (ขวาของรูปที่ 4) */}
          <div className="relative col-span-2 row-span-3 rounded-[40px] shadow-lg overflow-hidden">
            <Image src="/food5.png" alt="Food 5" layout="fill" objectFit="cover" />
          </div>
          
          {/* รูปที่ 7 (ขวาของรูปที่ 5) */}
          <div className="relative col-span-2 row-span-2 rounded-[40px] shadow-lg overflow-hidden">
            <Image src="/food7.png" alt="Food 7" layout="fill" objectFit="cover" />
          </div>

          {/* รูปที่ 1 (ล่างรูปที่ 2) */}
          <div className="relative col-span-2 rounded-[40px] shadow-lg overflow-hidden">
            <Image src="/food1.png" alt="Food 1" layout="fill" objectFit="cover" />
          </div>

          {/* รูปที่ 6 (ล่างรูปที่ 7) */}
          <div className="relative col-span-2 rounded-[40px] shadow-lg overflow-hidden">
            <Image src="/food6.png" alt="Food 6" layout="fill" objectFit="cover" />
          </div>
          
          {/* ปุ่มกด - จัดวางให้อยู่บนสุด */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3 space-x-2 shadow-lg">
              <span>LOOK FOR FOOD</span>
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};