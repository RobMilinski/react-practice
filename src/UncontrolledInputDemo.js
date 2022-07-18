import React, { useRef } from "react";
const UncontrolledInputDemo = () => {
    const inputRef = useRef();

    function updateValue() {
        inputRef.current.value = "Anshul";
      }
    
    function getValue() {
        alert(inputRef.current.value);
      }

    return (
        <>
            Uncontrolled Element: <input type="text" ref={inputRef} />
            <br />
            <input type="button" onClick={updateValue} value="Click to Update" />
            <br />
            <input type="button" onClick={getValue} value="Click to Get Values" />
        </>
    )
}


export default UncontrolledInputDemo;