import { CSSProperties, useState } from "react";
import hex2rgb from "../../utils/hex2rgb";

export function CheckColor() {
  const styleStart: CSSProperties = {
    backgroundColor: "white",
  };

  const [style, setStyle] = useState(styleStart);
  const [rgb, setRgb] = useState({
    r: 0,
    g: 0,
    b: 0,
    error: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    if (value.length >= 7) {
      if (value.match(/^#[a-f0-9]{6}$/)) {
        const rgbC = hex2rgb(value);
        console.log(rgbC);
        setStyle((prevForm) => ({ ...prevForm, backgroundColor: value }));
        setRgb((prevForm) => ({
          ...prevForm,
          r: rgbC.r,
          g: rgbC.g,
          b: rgbC.b,
          error: false,
        }));
      } else {
        setStyle((prevForm) => ({ ...prevForm, backgroundColor: "red" }));
        setRgb((prevForm) => ({ ...prevForm, error: true }));
      }
    } else {
      setStyle((prevForm) => ({ ...prevForm, backgroundColor: "white" }));
      setRgb((prevForm) => ({ ...prevForm, r: 0, g: 0, b: 0, error: false }));
    }
  };

  return (
    <>
      <div className="converter" style={style}>
        <div className="container">
          <input
            type="text"
            className="input"
            placeholder="HEX"
            onChange={handleChange}
          />
          {!rgb.error && (
            <div className="rgb">
              R: {rgb.r} G:{rgb.g} B:{rgb.b}
            </div>
          )}
          {rgb.error && <div className="rgb">Ошибка!</div>}
        </div>
      </div>
    </>
  );
}
