import { useState } from "react";

const ColorPicker = ({ pickedColor }) => {

    const [isColorsOpened, setIsColorsOpened] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FF2C2C");

      const toggleColors = () => {
        setIsColorsOpened(!isColorsOpened);
      };
  

      const colors = [
        "#FF2C2C",
        "#FF7518",
        "#FFD32C",
        "#68BA7F",
        "#2E6F40",
        "#4682B4",
        "#6C3BAA",
        "#777777",
      ]

      var newColor = "#FF2C2C";

      const pick = ( color ) => {
        pickedColor(color);
        setSelectedColor(color);
        toggleColors();
      }
      
  return (
    <div>
        <p>
            Color
        </p>
        <div
        onClick={toggleColors}
        className={`px-4 py-2 w-8 h-8 rounded-md bg-[${selectedColor}] duration-500 text-white rounded-md`}
        >
        
        </div>

        <div className={`
        grid grid-cols-4 gap-1 py-2 w-[15%] 
        ${isColorsOpened ? 'opacity-100' : 'opacity-0'}
        transition-all duration-500 overflow-hidden
        `}>
            {
                colors.map((color) => (
                    <div key={color} onClick={() => pick(color)} className={`w-8 h-8 rounded-md bg-[${color}] duration-200 hover:scale-110`}></div>
                ))
            }
        </div>
    </div>
  );
}
export default ColorPicker;