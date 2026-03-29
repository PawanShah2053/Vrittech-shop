export default function TrendingCoursesSection() {
  return (
    <section className="min-h-screen w-full ">
      <div className="mx-auto max-w-7xl">
        <p className="text-[20px] font-medium tracking-[-0.02em] text-[#3b3b3b] md:text-[26px]">
          Explore our classes and master trending skills!
        </p>

        <h1 className="mt-4 text-[34px] font-extrabold leading-tight tracking-[-0.04em] text-[#222] md:text-[56px]">
          Dive Into{' '}
          <span className="text-[#1fa57a]">What’s Hot Right Now!</span>
          <span className="ml-2 inline-block">🔥</span>
        </h1>

        <div className="mt-10 h-[460px] grid grid-cols-1 gap-6 lg:grid-cols-[2.1fr_1fr_1fr]">
          <div className="relative overflow-hidden w-[600px] h-[460px] rounded-[34px] bg-[#c92d3d] px-8 py-8 text-white md:px-12 md:py-10">
            <div className="flex items-start justify-end group">
              <button className="rounded-full px-2 py-1 text-right text-[16px] font-semibold text-white transition hover:opacity-90 md:text-[16px] relative">
                View all Courses <span className="ml-1">→</span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 2l8 8M6 2c1 3 2 6 4 8m-4 2v6m0 0h6"></path>
                  </svg>
                </div>
              </button>
            </div>

            <div className="mt-8 flex items-center gap-8 md:gap-6">
              <img src="/image/react.png" alt="React" className=" md:h-18 md:w-32" />

              <div className="relative flex items-center gap-1 text-[12px] md:text-[34px]">
               <img src="/image/Frame.png" alt="Course Frame" className=" md:h-36 md:w-48" />
                
              </div>

              <div className="relative flex items-center">
                <img src="/image/Frame1.png" alt="Course Frame 1" className=" md:h-36 md:w-48" />
              </div>

              <div className="relative flex items-center">
                <img src="/image/Frame2.png" alt="Course Frame 2" className=" md:h-24 md:w-36" />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:gap-8">
              <div className="leading-none tracking-[-0.08em] text-[#f6e7e8]">
                <span className="text-[120px] font-black md:text-[120px]">23</span>
                <span className="align-top  font-black md:text-[52px]">+</span>
              </div>

              <div className="">
                <h2 className="text-[24px] font-extrabold tracking-[-0.04em] text-[#fff6f6] md:text-[24px]">
                  All Courses
                </h2>
                <p className="mt-2 max-w-[320px] text-[22px] leading-[1.25]  text-[#ffeef0] md:text-[16px]">
                  courses you&apos;re powering <br /> through right now.
                </p>
                 
              </div>
            </div>
          </div>
          

          <div className="relative overflow-hidden rounded-[34px] bg-[#eadedf] px-6 py-8 text-[#c92d3d] md:px-6 md:py-2">
            <div className="flex h-full flex-col justify-between">
              <div className="mx-auto flex h-full w-full items-center justify-center ">
                <div className="rotate-180  [writing-mode:vertical-rl] h-[200px]">
                  <h3 className="text-[34px] font-extrabold leading-none  md:text-[30px]">
                    Upcoming Courses
                  </h3>
                   <div className=" [writing-mode:vertical-rl] h-[250px]">
                  <p className="text-[20px] font-medium ]  md:text-[18px]">
                    exciting new courses<br />waiting to boost your skills.
                  </p>
                </div>
                </div>
               
              </div>

              <div className="flex  justify-between">
                <div className="leading-none tracking-[-0.08em]">
                  <span className="text-[120px] font-black md:text-[150px]">05</span>
                  <span className="align-top text-[54px] font-black md:text-[74px]">+</span>
                </div>
               
              </div>
            </div>
          </div>

            <div className="relative overflow-hidden rounded-[34px] bg-[#eadedf] px-6 py-8 text-[#c92d3d] md:px-6 md:py-2">
            <div className="flex h-full  flex-col justify-between">
              <div className="mx-auto flex h-full w-full items-center justify-center gap-">
                <div className="rotate-180  [writing-mode:vertical-rl] h-[200px]">
                  <h3 className="text-[34px] font-extrabold leading-none  md:text-[30px]">
                    Ongoing Courses
                  </h3>
                   <div className=" [writing-mode:vertical-rl] h-[250px]">
                  <p className="text-[20px] font-medium ]  md:text-[18px]">
                  
                    currently happening <br />don’t miss out on the action!
                  </p>
                </div>
                </div>
               
              </div>

              <div className="flex items-end justify-between">
                <div className="leading-none tracking-[-0.08em]">
                  <span className="text-[120px] font-black md:text-[150px]">10</span>
                  <span className="align-top text-[54px] font-black md:text-[74px]">+</span>
                </div>
               
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </section>
  );
}