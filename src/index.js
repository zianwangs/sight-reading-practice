import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const valueToNote = {
  0: "do",
  1: "re",
  2: 'mi',
  3: 'fa',
  4: 'sol',
  5: 'la',
  6: 'si',
  7: 'Do',
}

const valueToKeyCode = {
  0: 70,
  1: 71,
  2: 72,
  3: 74,
  4: 75,
  5: 76,
  6: 186,
  7: 222,
}

const valueToMargin = {
  0: 250,
  1: 230,
  2: 217,
  3: 202,
  4: 187,
  5: 172,
  6: 157,
  7: 142,
}

const supportedKeys = {
       84: "T", 89: "Y",        73: "I", 79: "O", 80: "P",
  70: "F", 71: "G", 72: "H", 74: "J", 75:"K", 76: "L", 186: ";", 222:"'",
}

const soundUrls = [
  "https://cdn.freesound.org/previews/334/334538_4959932-lq.mp3",
  "https://cdn.freesound.org/previews/334/334536_4959932-lq.mp3",
  "https://cdn.freesound.org/previews/334/334542_4959932-lq.mp3",
  "https://cdn.freesound.org/previews/334/334541_4959932-lq.mp3",
  "https://cdn.freesound.org/previews/334/334540_4959932-lq.mp3",
  "https://cdn.freesound.org/previews/334/334534_4959932-lq.mp3",
  "https://cdn.freesound.org/previews/334/334539_4959932-lq.mp3",
  "https://cdn.freesound.org/previews/334/334537_4959932-lq.mp3",

]

function Key(props) {
  return (
  <div className={props.type} id={props.value}>
    {props.value}
  </div>
  )
}

function Blacks() {
  return (
    <div>
      <Key type="black" id="T" value="T" />
      <Key type="black" id="Y" value="Y" />
      <Key type="black" id="I" value="I" />
      <Key type="black" id="O" value="O" />
      <Key type="black" id="P" value="P" />

    </div>
  )
}

function Whites() {
  return (
    <div>
      <Key type="white" id="F" value="F" margin-left="202px"/>
      <Key type="white" id="G" value="G" />
      <Key type="white" id="H" value="H" />
      <Key type="white" id="J" value="J" />
      <Key type="white" id="K" value="K" />
      <Key type="white" id="L" value="L" />
      <Key type="white" id=";" value=";" />
      <Key type="white" id="'" value="'" />

    </div>
  )
}
function KeyBoard() {
  return (
    <div className="KeyBoard">
      <Blacks />
    
      <Whites />
    </div>
  )
}

function Sheet() {
  const LEN = 8
  const [notes, setNotes] = useState(Array(LEN))
  let [cursor, setCursor] = useState(1)

  useEffect(genNotes, []);
 
  function genNote() {
    return Math.floor(Math.random() * 8);
  }

  function genNotes() {
    for (let i = 0; i < LEN; ++i) {
      notes[i] = genNote();
    }
    const copy = notes.slice();
    setNotes(copy);
    
  }


  function handleKeyDown(e) {
    // let parent = document.getElementsByClassName("note");
    // parent[cursor].style.filter = "opacity(0.3) drop-shadow(0 0 0 red)";
    // setCursor((cursor + 1) % LEN);
  
    let curKeyCode = valueToKeyCode[notes[(cursor + LEN - 1) % LEN]];
    if (e.keyCode in supportedKeys) {

      let element = document.getElementById(supportedKeys[e.keyCode]);
      element.style.backgroundColor = "pink";
      element.style.color = "black";      
    }
    if (curKeyCode === e.keyCode) {
      let audio = new Audio(soundUrls[notes[(cursor + LEN - 1) % LEN]]);
      audio.play();
      let parent = document.getElementsByClassName("note");
      parent[cursor].style.filter = "opacity(0.4) drop-shadow(0 0 0 red)";
      parent[(cursor + LEN - 1) % LEN].style.filter = "none";
      setCursor((cursor + 1) % LEN);
      if (cursor == 0) {
        genNotes();
      }
      
    }
  }

  function handleKeyUp(e) {
    if (e.keyCode in supportedKeys) {

      let element = document.getElementById(supportedKeys[e.keyCode]);
      element.style.filter = "none"
      element.style.backgroundColor = (e.keyCode >= 79 && e.keyCode <= 89 || e.keyCode == 73) ? "black"
 : "white";   
      element.style.color = (e.keyCode >= 79 && e.keyCode <= 89 || e.keyCode == 73) ? "white"
 : "black";  
    }
  }
    
  useEffect(() => {window.addEventListener("keydown", handleKeyDown); return () => window.removeEventListener("keydown", handleKeyDown)} , [cursor]);
  useEffect(() => window.onkeyup = handleKeyUp, []);

  function renderNote(i) {
    return (
      <h3 className="note" id="{valueToNote[i]}" style= {{marginTop: valueToMargin[i] + 'px'}}>
      </h3>
    )
  }
  return (
    <h2 className="img" >
      
      {notes.map(v => renderNote(v))}
      
    </h2>
 
    
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <audio src="./audios/0.mp3" id = "myaudio"></audio>
        <h1>Sight-reading Practice.</h1>
        <div className="sheet">
          <Sheet />
        </div>
        <div>
          <KeyBoard />
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
