"use client";
// src/app/page.tsx
import { Search, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CallToAction from "./CallToAction"; // สมมติว่าไฟล์ CallToAction.tsx อยู่ในโฟลเดอร์เดียวกัน

export default function Hero() {
  // URLs of images referencing from the public folder
  const imageUrls = {
    img1: "/food 1.png",
    img2: "/food 2.png",
    img3: "/food 3.png",
    img4: "/food 4.png",
    img5: "/food 5.png",
    img6: "/food 6.png",
    img7: "/food 7.png",
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {/* Main Content Section */}
      <main className="container mx-auto flex w-full flex-col items-center px-4 pt-5 pb-16 md:px-8">
        <h1 className="font-Inter mb-8 text-center text-4xl text-black/50 sm:text-5xl md:mb-0 md:text-6xl">
          อยากกินอะไร เราหาให้
        </h1>

        {/* --- Image Gallery Section --- */}
        <div className="mx-auto w-full max-w-5xl">
          {/* Layout for large screens (lg) - Uses Absolute positioning with % for responsiveness */}
          <div
            className="relative hidden w-full lg:block"
            style={{ aspectRatio: "1330 / 500" }}
          >
            {/* Image 2 */}
            <div
              className="group absolute overflow-hidden rounded-[40px] border-t-5 border-l-5 border-solid border-green-400"
              style={{
                width: "22.5%",
                height: "48.5%",
                top: "20%",
                left: "-1.5%",
              }}
            >
              <img
                src={imageUrls.img4}
                alt="Tom Yum"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/300x243/e2e8f0/94a3b8?text=Tom+Yum")
                }
              />
            </div>
            {/* Image 1 */}
            <div
              className="group absolute overflow-hidden rounded-[40px] border-t-5 border-l-5 border-solid border-green-400"
              style={{
                width: "22.5%",
                height: "23.2%",
                top: "72%",
                left: "-1.5%",
              }}
            >
              <img
                src={imageUrls.img6}
                alt="Pad Thai"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/300x116/e2e8f0/94a3b8?text=Pad+Thai")
                }
              />
            </div>
            {/* Image 3 */}
            <div
              className="group absolute overflow-hidden rounded-[40px] border-t-5 border-l-5 border-solid border-green-400"
              style={{
                width: "17.1%",
                height: "77.2%",
                top: "10%",
                left: "22%",
              }}
            >
              <img
                src={imageUrls.img2}
                alt="Boat Noodles"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/227x386/e2e8f0/94a3b8?text=Boat+Noodles")
                }
              />
            </div>
            {/* Image 4 */}
            <div
              className="group absolute overflow-hidden rounded-[40px] border-t-5 border-l-5 border-solid border-green-400"
              style={{
                width: "20%",
                height: "70%",
                top: "10%",
                left: "40%",
              }}
            >
              <img
                src={imageUrls.img1}
                alt="Pad Krapow"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/300x270/e2e8f0/94a3b8?text=Pad+Krapow")
                }
              />
            </div>
            {/* Image 5 */}
            <div
              className="group absolute overflow-hidden rounded-[40px] border-t-5 border-l-5 border-solid border-green-400"
              style={{
                width: "17.1%",
                height: "77.2%",
                top: "10%",
                left: "61%",
              }}
            >
              <img
                src={imageUrls.img3}
                alt="Khao Man Gai"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/227x386/e2e8f0/94a3b8?text=Khao+Man+Gai")
                }
              />
            </div>
            {/* Image 7 */}
            <div
              className="group absolute overflow-hidden rounded-[40px] border-t-5 border-l-5 border-solid border-green-400"
              style={{
                width: "22.4%",
                height: "48.5%",
                top: "20%",
                left: "79%",
              }}
            >
              <img
                src={imageUrls.img5}
                alt="Assorted Dishes"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/299x243/e2e8f0/94a3b8?text=Assorted")
                }
              />
            </div>
            {/* Image 6 */}
            <div
              className="group absolute overflow-hidden rounded-[40px] border-t-5 border-l-5 border-solid border-green-400"
              style={{
                width: "22.4%",
                height: "23.2%",
                top: "72%",
                left: "79%",
              }}
            >
              <img
                src={imageUrls.img7}
                alt="Som Tum"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/299x116/e2e8f0/94a3b8?text=Som+Tum")
                }
              />
            </div>
          </div>

          {/* Layout for mobile and tablet (displays when screen is smaller than lg) */}
          <div className="flex w-full flex-col items-center gap-4 lg:hidden">
            <div className="grid w-full grid-cols-3 gap-4">
              {/* เลือก 3 รูปแรกสำหรับหน้าจอมือถือ */}
              {Object.values(imageUrls)
                .slice(0, 3)
                .map((url, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-2xl border-t-5 border-l-5 border-solid border-green-400"
                  >
                    <img
                      src={url}
                      alt={`Food image ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      onError={(e) =>
                        (e.currentTarget.src = `https://placehold.co/300x300/e2e8f0/94a3b8?text=Image+${
                          index + 1
                        }`)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
