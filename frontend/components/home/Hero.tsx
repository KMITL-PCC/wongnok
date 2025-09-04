"use client";
// src/app/page.tsx

export default function Hero() {
  // URLs of images referencing from the public folder
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
      {/* Main Content Section */}
      <main className="container mx-auto flex w-full flex-col items-center px-4 pt-5 pb-16 md:px-8">
        <h1 className="font-Inter mb-8 text-center text-4xl text-black/50 sm:text-5xl md:mb-12 md:text-6xl">
          อยากกินอะไร เราหาให้
        </h1>

        {/* --- 5 Box Gallery Section (Custom Layout with Images) --- */}
        <div className="mx-auto w-full max-w-5xl">
          {/* Layout for large screens (lg) - Using a 5-column, 1-row Grid */}
          <div
            className="hidden lg:grid lg:grid-cols-5 lg:gap-4"
            style={{ aspectRatio: "5 / 1.5" }}
          >
            {/* Box 1 (Contains 2 images) - Moved down */}
            <div className="relative top-1/4 flex flex-col gap-4">
              <div className="group h-50 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <img
                  src={imageUrls.img4}
                  alt="Food 4" // Correct
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="group h-20 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <img
                  src={imageUrls.img6}
                  alt="Food 6" // ✅ Corrected
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Box 2 */}
            <div className="group overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img2}
                alt="Food 2" // ✅ Corrected
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Box 3 - Height adjusted and aligned to top */}
            <div className="flex items-start justify-center">
              <div className="group h-60 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <img
                  src={imageUrls.img1}
                  alt="Food 1" // ✅ Corrected
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Box 4 */}
            <div className="group overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img3}
                alt="Food 3" // ✅ Corrected
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Box 5 (Contains 2 images) */}
            <div className="relative top-1/4 flex flex-col gap-4">
              <div className="group h-50 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <img
                  src={imageUrls.img5}
                  alt="Food 5" // ✅ Corrected
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="group h-20 w-full overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
                <img
                  src={imageUrls.img7}
                  alt="Food 7" // Correct
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* A simple grid for mobile and tablet layout */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            <div className="group aspect-square overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img1}
                alt="Food 1"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="group aspect-square overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img2}
                alt="Food 2"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="group aspect-square overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img3}
                alt="Food 3"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="group aspect-square overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img4}
                alt="Food 4"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="group col-span-2 aspect-video overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img5}
                alt="Food 5"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            {/* ✅ Added missing images for mobile view */}
            <div className="group aspect-square overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img6}
                alt="Food 6"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="group aspect-square overflow-hidden rounded-2xl border-t-4 border-l-4 border-green-500">
              <img
                src={imageUrls.img7}
                alt="Food 7"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
