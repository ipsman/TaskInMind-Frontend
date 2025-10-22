import { useState } from "react";

const ColorPicker = ({ pickedColor }) => {

  const [selectedColor, setSelectedColor] = useState("#D93630");



  const colors = [
{ name: "Tomato Red", hex: "#D93630" }, 

    // Narancs: meleg, jól látható
    { name: "Tangerine Orange", hex: "#F47A00" }, 

    // Sárga: kontrasztos, tiszta
    { name: "Goldenrod Yellow", hex: "#F5C300" }, 

    // Zöld: klasszikus Google Naptár zöld
    { name: "Basil Green", hex: "#0B8043" }, 

    // Cián/Türkiz: világosabb, de megkülönböztethető kék
    { name: "Peacock Blue", hex: "#039BE5" }, 

    // Kék: mélyebb, professzionális kék
    { name: "Sapphire Blue", hex: "#3F51B5" }, 

    // Lila: erőteljes, jól elkülönül a többi színtől
    { name: "Amethyst Purple", hex: "#795548" }, 
    
    // Barna/Földszín: hasznos semleges árnyalat
    { name: "Earth Brown", hex: "#6D28D9" }, 

    // Rózsaszín/Magenta: kiegészítő, nőiesebb árnyalat
    { name: "Fuchsia Pink", hex: "#E91E63" }, 

    // Szürke: alapértelmezett, diszkrét opció
    { name: "Slate Grey", hex: "#616161" },
  ];

  function pick(color) {
    pickedColor(color);
    setSelectedColor(color);
  }


  return (
    <div className="w-full mb-4">
      <p className="text-lg font-semibold mb-2">Color Selection</p>



      <div className={`
            grid grid-cols-4 gap-2 w-fit h-fit transition-all duration-500 ease-in-out
        `}>
        {
          colors.map((colorItem) => (
            <div
              key={colorItem.hex} // Use hex as key for uniqueness
              onClick={() => pick(colorItem.hex)} // Call pick with the hex color
              className={`
                            w-11 h-11 rounded-md duration-200 hover:scale-110 cursor-pointer 
                            ${selectedColor === colorItem.hex ? 'outline-2 outline-offset-2 outline-white' : ''}
                        `}
              style={{ backgroundColor: colorItem.hex }}
              title={colorItem.name} // Show color name on hover
            ></div>
          ))
        }
      </div>
    </div>
  );
}
export default ColorPicker;