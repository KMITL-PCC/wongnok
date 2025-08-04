// src/app/page.tsx
import { Search, User, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

export default function HomePage() {
  // URLs of images referencing from the public folder
  const imageUrls = {
    img1: '/food1.png',
    img2: '/food2.png',
    img3: '/food3.png',
    img4: '/food4.png',
    img5: '/food5.png',
    img6: '/food6.png',
    img7: '/food7.png',
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      
      {/* ส่วน Header */}
      <header className="w-full bg-white p-4 shadow-sm flex items-center justify-between fixed top-0 left-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
             {/* ใส่ Logo ของคุณที่นี่ */}
          </div>
          <span className="text-xl font-bold text-green-500 hidden sm:block">FoodApp</span>
        </div>
        <div className="flex items-center border border-gray-300 rounded-full bg-gray-100 p-2 max-w-md w-full mx-4">
          <Search className="text-gray-500 ml-2" size={20} />
          <Input 
            type="text" 
            placeholder="Search" 
            className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 text-base"
          />
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 hidden sm:flex items-center space-x-2">
          <User size={20} />
          <span>เข้าสู่ระบบ</span>
        </Button>
      </header>

      {/* ส่วน Content หลัก */}
      <main className="container mx-auto p-4 md:p-8 mt-20 flex flex-col items-center">
        
        <h1 className="text-4x1 sm:text-5xl font-bold text-gray-800 text-center mb-">
          อยากกินอะไร เราหาให้
        </h1>

        {/* Gallery Layout with 70% scale and proper centering */}
        <div className="w-full bg-white font-sans flex justify-center py-8">
          <div className="relative w-[1330px] h-[700px]">
            
            {/* รูปที่ 2: อยู่ข้างซ้ายของรูปที่ 3 */}
            <div className="absolute w-[300px] h-[242.9px] top-[100px] left-[-90px] rounded-[40px] overflow-hidden">
              <Image src={imageUrls.img2} alt="Food 2" layout="fill" objectFit="cover" />
            </div>

            {/* รูปที่ 1: อยู่ข้างล่างรูปที่ 2 */}
            <div className="absolute w-[300px] h-[116.2px] top-[360px] left-[-90px] rounded-[40px] overflow-hidden">
              <Image src={imageUrls.img1} alt="Food 1" layout="fill" objectFit="cover" />
            </div>

            {/* รูปที่ 3: อยู่ซ้ายมือของรูปที่ 4 */}
            <div className="absolute w-[227.5px] h-[386.4px] top-[50px] left-[220px] rounded-[40px] overflow-hidden">
              <Image src={imageUrls.img3} alt="Food 3" layout="fill" objectFit="cover" />
            </div>

            {/* รูปที่ 4: อยู่ตรงกลาง */}
            <div className="absolute w-[300px] h-[270px] top-[50px] left-[460px] rounded-[40px] overflow-hidden">
              <Image src={imageUrls.img4} alt="Food 4" layout="fill" objectFit="cover" />
            </div>

            {/* รูปที่ 5: อยู่ด้านขวาของรูปที่ 4 */}
            <div className="absolute w-[227.5px] h-[386.4px] top-[50px] left-[767.9px] rounded-[40px] overflow-hidden">
              <Image src={imageUrls.img5} alt="Food 5" layout="fill" objectFit="cover" />
            </div>
            
            {/* รูปที่ 7: อยู่ขวามือของรูปที่ 5 */}
            <div className="absolute w-[298.9px] h-[242.9px] top-[100px] left-[1008.7px] rounded-[40px] overflow-hidden">
              <Image src={imageUrls.img7} alt="Food 7" layout="fill" objectFit="cover" />
            </div>

            {/* รูปที่ 6: อยู่ข้างล่างของรูปที่ 7 */}
            <div className="absolute w-[298.9px] h-[116.2px] top-[360px] left-[1008.7px] rounded-[40px] overflow-hidden">
              <Image src={imageUrls.img6} alt="Food 6" layout="fill" objectFit="cover" />
            </div>
            
            {/* ปุ่มกด */}
            <Button
              className="absolute w-[250px] h-[47.6px] top-[340px] left-[490px] 
                         rounded-[40px] text-sm font-bold
                         bg-green-500 hover:bg-gray-800 text-white"
            >
              <span>LOOK FOR FOOD</span>
              <ArrowRight size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
