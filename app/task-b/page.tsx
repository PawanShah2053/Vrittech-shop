"use client"
import { useMemo, useEffect, useState, useRef } from "react"


export default function TaskB(){
  const [wordStep, setWordStep] = useState(0);
  const wordIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rotatingWords = useMemo(
    () => ["Blockchain", "UI & UX", "Development", "Animation"],
    []
  );
  const columnSets = useMemo(
    () => [
      [...rotatingWords, ...rotatingWords],
      [
        rotatingWords[2],
        rotatingWords[0],
        rotatingWords[1],
        rotatingWords[2],
        rotatingWords[0],
        rotatingWords[1],
      ],
      [
        rotatingWords[1],
        rotatingWords[2],
        rotatingWords[0],
        rotatingWords[1],
        rotatingWords[2],
        rotatingWords[0],
      ],
    ],
    [rotatingWords]
  );
    useEffect(() => {
    wordIntervalRef.current = setInterval(() => {
      setWordStep((prev) => prev + 1);
    }, 1400);

    return () => {
      if (wordIntervalRef.current) {
        clearInterval(wordIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (wordStep === rotatingWords.length) {
      const resetTimer = setTimeout(() => {
        setWordStep(0);
      }, 720);

      return () => clearTimeout(resetTimer);
    }
  }, [wordStep, rotatingWords.length]);

    return (
        <>
       <div className="bg-white min-h-screen px-6 md:px-16 py-10 font-sans">
      
      <div className="grid md:grid-cols-2 gap-10 items-start">
        
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
            Experience our expert solutions tailored to enhance your business
            with top-tier design, development, and animation.
          </h1>

          <button 
            onClick={() => window.location.href = '/courses'}
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Services
          </button>
        </div>

        
        <div className="space-y-6 text-right md:text-left">
                   <div className="relative h-[240px] md:h-[300px] w-full max-w-[420px] overflow-hidden">
            <div className="grid gap-1 md:gap-2 w-full max-w-[420px] pt-1">
            {columnSets.map((items, columnIndex) => {
              const shouldAnimate = wordStep !== rotatingWords.length;

              return (
                <div
                  key={columnIndex}
                  className="relative h-[64px] sm:h-[76px] md:h-[92px] overflow-hidden"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `translateY(-${wordStep * 100}%)`,
                      transition: shouldAnimate
                        ? `transform 720ms cubic-bezier(0.22, 1, 0.36, 1) ${columnIndex * 80}ms`
                        : "none",
                    }}
                  >
                    {items.map((word, index) => (
                      <div
                        key={`${columnIndex}-${word}-${index}`}
                        className="h-[64px] sm:h-[76px] md:h-[92px] flex items-center justify-start md:justify-end"
                      >
                        <h2 className="text-[44px] sm:text-[54px] md:text-[60px] leading-none font-bold tracking-[-0.05em] text-gray-900">
                          {word}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>

      
      <div className="mt-16 overflow-hidden">
        <div className="flex gap-6 overflow-x-auto pb-4">
          
          <div className="relative min-w-[70%] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
              alt="workspace"
              className="w-full h-[350px] object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-200 text-gray-700 w-24 h-24 rounded-full flex items-center justify-center shadow-md">
                Drag
              </div>
            </div>
          </div>

          
          <div className="min-w-[100%] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28"
              alt="device"
              className="w-full h-[350px] object-cover"
            />
          </div>
        </div>

        
        <div className="h-1 bg-gray-300 rounded-full mt-4">
          <div className="w-1/3 h-full bg-gray-500 rounded-full"></div>
        </div>
      </div>

     
      <div className="mt-20 text-center">
        <h3 className="text-gray-600 mb-10 font-bold">Our Partners</h3>

        <div className="flex flex-wrap justify-center items-center gap-40 opacity-70">
          <img src="/image/cloudedu.png" alt="Cloud Education" className="h-12 grayscale" />
          <img src="/image/cmclogo.png" alt="CMC" className="h-12 grayscale" />
          <img src="/image/Group.png" alt="IT SNP" className="h-12 grayscale" />
            <img src="/image/image-13.png" alt="Vrittech" className="h-12 grayscale" />
        </div>
      </div>
    </div>
        </>
    )
}