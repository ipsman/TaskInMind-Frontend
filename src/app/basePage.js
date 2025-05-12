'use client'

import Calendar from "./Center/calendar";
import Sidenav from "./SideNav/Sidenav";

const BasePage = ({ onLogout }) => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const months = [
    "január",
    "február",
    "március",
    "április",
    "május",
    "június",
    "július",
    "augusztus",
    "szeptember",
    "október",
    "november",
    "december"
  ];

  return (
    <div className="w-full h-full flex-col">
      <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-[55px] flex gap-28">
        <h1 className="text-3xl content-center">TaskInMind</h1>
        <p className="text-xl content-center">{currentYear}. {months[currentMonth]}</p>
      </div>
      <div className="flex h-[calc(100%-55px)]">
        <Sidenav onLogout={onLogout}></Sidenav>
        <div className="h-full w-full"><Calendar></Calendar></div>
        <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-full w-[80px]">oldalsav</div>
      </div>
    </div>
  );
}
export default BasePage;