'use client'


function Settings() {

  const cancelDayPlan = () => {
    document.getElementById("settings").style.transform = "translatey(2000px)";
  };
  
  return (
    <div className="w-full h-full absolute flex justify-center duration-200 translate-y-[2000px]" id="settings">
      <div className="relative w-[50%] h-[80%] shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden flex justify-center">
          <div className="m-3">
              <h2 className="text-2xl" id="dayTitle">Settings</h2>
              <div className="h-full dark:bg-[#000000b9] left-0 absolute w-[250px] flex flex-col gap-2">
                <button>Profile settings</button>
                <button>Customization</button>
                <button>Notifications</button>
              </div>
              
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

export default Settings;