import React, { useCallback } from "react";
import "./NotePadStyle.css";
const NotePad = ({ textValue, setTextValue }) => {
  const handleNotePad = useCallback(
    (e) => {
      setTextValue(e.target.value);
    },
    [setTextValue]
  );

  return (
    <div className="home-notepad">
      <textarea
        name="notepad-textarea"
        className="notepad-textarea"
        placeholder="중요한 메모를 남겨보세요"
        value={textValue}
        onChange={(e) => handleNotePad(e)}
      />
    </div>
  );
};

export default NotePad;
