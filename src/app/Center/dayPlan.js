'use client'


function DayPlan() {

  const cancelDayPlan = () => {
    document.getElementById("dayPlan").style.transform = "translatey(2000px)";
  };
  
  return (
    <div className="w-full h-full absolute flex justify-center duration-200 translate-y-[2000px]" id="dayPlan">
      <div className="relative w-[50%] h-[80%] shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden flex justify-center">
          <div className="m-3">
              <h2 className="text-2xl" id="dayTitle">Esemeny</h2>
              <form noValidate="" action="" className="space-y-12">
                <div className="space-y-4">
                    <div> 
                      <input type="text" name="title" id="title" placeholder="Add a title" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white "  />
                    </div>
                    <div className="flex gap-6">
                      <input type="date" name="date1" id="date1" placeholder="date1" className="w-[16.5%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white "   />
                      <input type="text" name="hours1" id="hours1" placeholder="hours1" className="w-[12%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white "   />
                      <p> - </p>
                      <input type="date" name="date2" id="date2" placeholder="date2" className="w-[16.5%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white "   />
                      <input type="text" name="hours2" id="hours2" placeholder="hours2" className="w-[12%]  px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white "   />
                    </div>
                    <div>
                      <input type="text" name="desc" id="desc" placeholder="Description" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white "  />
                    </div>
                    <div>
                      <input type="text" name="place" id="place" placeholder="Place" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white "  />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className='w-full flex justify-center'>
                      <button type="button" className="absolute bottom-4 right-4 px-8 py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-75" >Save</button>
                    </div>
                  </div>
              </form>
          </div>
            <button className="absolute top-2 right-2" onClick={cancelDayPlan}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
    </div>
  );
}

export default DayPlan;