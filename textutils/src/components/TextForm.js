import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleUpClick = () => {
    setText(text.toUpperCase());
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
  };

  const clearText = () => {
    setText("");
  };

  const handleCopy = () => {
    const textBox = document.getElementById("mybox");
    textBox.select();
    navigator.clipboard.writeText(textBox.value);
    props.showAlert("Copied to clipboard", "success");
  };

  const handleExtraSpaces = () => {
    setText(text.split(/[ ]+/).join(" "));
    props.showAlert("Extra spaces removed", "success");
  };

  const firstLetterCapital = () => {
    if (!text) return;
    const newText = text.replace(/(^\s*[a-zA-Z]|[\.\!\?]\s*[a-zA-Z])/g, (match) => {
      return match.toUpperCase();
    });

    setText(newText);
    if (props.showAlert) props.showAlert("First letters capitalized", "success");
  };

  const countVowels = () => {
    const vowels = text.match(/[aeiouAEIOU]/g);
    const count = vowels ? vowels.length : 0;
    if (props.showAlert) props.showAlert(`Number of vowels: ${count}`, "success");
  };

  const themeStyles = {
    light: { text: "#042743", bg: "white", textareaBg: "white" },
    dark: { text: "white", bg: "#343a40", textareaBg: "gray" },
    red: { text: "white", bg: "#dd2c2cff", textareaBg: "#dd2c2cff" }
  };

  return (
    <>
      <div
        className="container"
        style={{
          color: themeStyles[props.mode]?.text || "black",
          backgroundColor: themeStyles[props.mode]?.bg || "white"
        }}
      >
        <h1>{props.heading}</h1>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={e => setText(e.target.value)}
            id="mybox"
            rows="8"
            style={{
              backgroundColor: themeStyles[props.mode]?.textareaBg || "white",
              color: themeStyles[props.mode]?.text || "black"
            }}
          ></textarea>
        </div>

        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        <button className="btn btn-info mx-1" onClick={handleLoClick}>
          Convert to LowerCase
        </button>
        <button className="btn btn-danger mx-1" onClick={clearText}>
          Clear Text
        </button>
        <button className="btn btn-warning mx-1" onClick={countVowels}>
          Count Vowels
        </button>
        <button className="btn btn-dark mx-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-success mx-1" onClick={handleExtraSpaces}>
          Remove Extra Space
        </button>
        <button className="btn btn-secondary mx-1" onClick={firstLetterCapital}>
          Make First Letter Capital
        </button>
      </div>

      <div
        className="container my-3"
        style={{ color: themeStyles[props.mode]?.text || "black" }}
      >
        <h2>Your text summary</h2>
        <p>
          {text.trim().split(/\s+/).filter(Boolean).length} words and {text.length} characters
        </p>
        <p>
          {0.008 * text.trim().split(/\s+/).filter(Boolean).length} Minutes read
        </p>

        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something in the textbox above to preview it here"}</p>
      </div>
    </>
  );
}
