import { useState } from "react";
import { morseCodeArray } from "../../../../../constants/morseCode";
import "./MorseTranslator.css";
const MorseTranslator = () => {
  const [morseCode, setMorseCode] = useState("");
  const [text, setText] = useState("");

  const getMorseCode = (character) => {
    const codeObject = morseCodeArray.find(
      (code) => code.character === character.toUpperCase()
    );
    return codeObject.morse;
  };

  const getTextVal = (morse) => {
    const codeObject = morseCodeArray.find((code) => code.morse === morse);
    return codeObject.character;
  };

  const textChangeHandler = (e) => {
    const textInp = e.target.value;
    setText(textInp);

    const morseArr = [];
    const textArr = textInp.split("");

    textArr.forEach((character) => {
      morseArr.push(getMorseCode(character));
    });

    setMorseCode(morseArr.join(""));
  };

  const isValidMorseCode = (morseInp) => {
    const isValid = /^[.-]*$/.test(morseInp);
    return isValid;
  };

  const morseChangeHandler = (e) => {
    const morseInp = e.target.value;
    if (isValidMorseCode(morseInp)) {
      setMorseCode(morseInp);
      setText(getTextVal(morseInp));
    }
  };

  return (
    <div className="text-trans">
      <div>
        <div>Text</div>
        <textarea
          className="trans-txtarea"
          value={text}
          onChange={textChangeHandler}
        />
      </div>
      <div>
        <div>Morse Code</div>
        <textarea
          className="trans-txtarea"
          value={morseCode}
          onChange={morseChangeHandler}
        />
      </div>
    </div>
  );
};
export default MorseTranslator;
