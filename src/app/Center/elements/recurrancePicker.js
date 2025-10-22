import { useState } from "react";

const RecurrancePicker = ({ pickedOption }) => {
    const [selectedOption, setSelectedOption] = useState("Never");

      const options = [
        "Never",
        "Weekly",
        "Monthly",
        "Yearly",
      ]

      function pick(option) {
        setSelectedOption(option);
        pickedOption(option);
      }
      

  return (
    <div className="w-full">
        <p className="text-lg font-semibold mb-2">
            Repeat
        </p>
        <div className={`
        flex flex-col gap-1 py-2 w-full h-full transition-all duration-500
        `}>
            {
                options.map((option) => (
                    <div key={option} onClick={() => pick(option)} className={`bg-[#494949b0] p-2 rounded-md duration-200 hover:scale-105 ${selectedOption === option ? 'outline-2 outline-offset-2 outline-white' : ''}`} >
                        <p>{option}</p>
                    </div>
                ))
            }
        </div>
    </div>
  );
}
export default RecurrancePicker;