import React, { useState } from "react";


export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("UpperCase was clicked: " + text);
    let newText = text.toUpperCase()
    setText(newText);
  }

  const handleOnChange = (event) => {
    // console.log("On Change")
    setText(event.target.value);
  }

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  }

  const clearText = () => {
    let newText = ("");
    setText(newText);
  }

  const handleCopy = () => {
    let text = document.getElementById("mybox");
    text.select();
    navigator.clipboard.writeText(text.value);
  }

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  }

  // const firstLetterCapital = () => {                         // This function will make the first letter capital of a sentence 
  //   if (!text) return;

  //   const newText =
  //     text.charAt(0).toUpperCase() + text.slice(1);

  //   setText(newText);
  // };

  const firstLetterCapital = () => {
    if (!text) return;

    const newText = text
      .split(" ")
      .map(
        word =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

    setText(newText);
  };



  const countVowels = () => {
    const vowels = text.match(/[aeiouAEIOU]/g);
    const count = vowels ? vowels.length : 0;
    alert(`Number of vowels: ${count}`);
  };

  const [text, setText] = useState("");
  // text = "new text"; // Wrong way to change the state
  // setText = ("new text"); // Correct way to change the state
  return (
    <>
      <div className="container"  style={{color: props.mode === "dark" ? "white" : "#042743"}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={handleOnChange} id="mybox" rows="8" style={{backgroundColor: props.mode === "dark" ? "gray" : "white", color: props.mode === "dark" ? "white" : "#042743"}}></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to UpperCase</button>
        <button className="btn btn-info mx-1" onClick={handleLoClick}>Convert to LowerCase</button>
        <button className="btn btn-danger mx-1" onClick={clearText}>Clear Text</button>
        <button className="btn btn-warning mx-1" onClick={countVowels}>Count Vowels</button>
        <button className="btn btn-dark mx-1" onClick={handleCopy}>Copy Text</button>
        <button className="btn btn-success mx-1" onClick={handleExtraSpaces}>Remove Extra Space</button>
        <button className="btn btn-secondary mx-1" onClick={firstLetterCapital}>Make First Letter Capital</button>
      </div>
      <div className="container my-3" style={{color: props.mode === "dark" ? "white" : "#042743"}}>
        <h2>Your text summary</h2>
        <p>{text.split(" ").length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0 ? text : "Enter something in the textbox above to preview it here"}</p>
      </div>
    </>
  );
}
