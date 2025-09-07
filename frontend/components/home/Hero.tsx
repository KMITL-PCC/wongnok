"use client";

import Image from "next/image";

export default function Hero() {
  const imageUrls = {
    img1: "/food1.png",
    img2: "/food2.png",
    img3: "/food3.png",
    img4: "/food4.png",
    img5: "/food5.png",
    img6: "/food6.png",
    img7: "/food7.png",
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <main className="container mx-auto flex w-full flex-col items-center px-4 pt-5 pb-16 md:px-8">
        <h1 className="font-Inter mb-8 text-center text-4xl text-black/50 sm:text-5xl md:mb-12 md:text-6xl">
          อยากกินอะไร เราหาให้
        </h1>

        <div className="mx-auto w-full max-w-5xl">
          {/* Desktop (5 คอลัมน์) */}
          <div
            className="hidden lg:grid lg:grid-cols-5 lg:gap-4"
            style={{ aspectRatio: "5 / 1.5" }}
          >
            {/* Box 1: 2 รูป */}
            <div className="relative top-1/4 flex flex-col gap-4">
              <div className="group relative h-40 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <Image
                  src={imageUrls.img2}
                  alt="อาหารจานที่ 2"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                  priority
                />
              </div>
              <div className="group relative h-20 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <Image
                  src={imageUrls.img1}
                  alt="อาหารจานที่ 1"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
              </div>
            </div>

            {/* Box 2 */}
            <div className="group relative overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <div className="relative h-full w-full">
                <Image
                  src={imageUrls.img3}
                  alt="อาหารจานที่ 3"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
              </div>
            </div>

            {/* Box 3 */}
            <div className="flex items-start justify-center">
              <div className="group relative h-60 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <Image
                  src={imageUrls.img4}
                  alt="อาหารจานที่ 4"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
              </div>
            </div>

            {/* Box 4 */}
            <div className="group relative overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <div className="relative h-full w-full">
                <Image
                  src={imageUrls.img5}
                  alt="อาหารจานที่ 5"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
              </div>
            </div>

            {/* Box 5: 2 รูป */}
            <div className="relative top-1/4 flex flex-col gap-4">
              <div className="group relative h-40 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <Image
                  src={imageUrls.img7}
                  alt="อาหารจานที่ 7"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
              </div>
              <div className="group relative h-20 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <Image
                  src={imageUrls.img6}
                  alt="อาหารจานที่ 6"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
              </div>
            </div>
          </div>

          {/* มือถือ/แท็บเล็ต */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {[
              imageUrls.img1,
              imageUrls.img2,
              imageUrls.img3,
              imageUrls.img4,
            ].map((src, i) => (
              <div
                key={src}
                className="group relative aspect-square overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500"
              >
                <Image
                  src={src}
                  alt={`อาหารลำดับที่ ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
