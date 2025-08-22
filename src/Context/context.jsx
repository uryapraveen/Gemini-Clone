// context/context.js
import { createContext, useContext, useState } from "react";
import runChat from "../config/gemini";
import SideBar from "../Components/SideBar/SideBar";

export const context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevprompts, setprevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // ✅ Function for printing response with delay (word by word)
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index); // 75ms delay per word
  };

  const newchat = () => {
    setLoading(false);
    setshowResult(false);
    setResultData("");
  };
  
  const handleClick = async (event) => {
    let prompt = event.target.innerText;
    setLoading(true);
    setshowResult(true);
    let response;
    let currentPrompt = "";

    if (prompt !== undefined) {
      currentPrompt = prompt;
    } else {
      currentPrompt = input;
    }

    // ✅ Add prompt only if it's not already in the list
    setprevPrompts((prev) => {
      if (prev.includes(currentPrompt)) {
        return prev;
      }
      return [...prev, currentPrompt];
    });

    setrecentPrompt(currentPrompt);

    // Call API
    response = await runChat(currentPrompt);

    // Remove duplicate sentences (simple way)
    let uniqueResponse = response
      .split(". ")
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .join(". ");

    // Format bold text for **word**
    let responseArray = uniqueResponse.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 1) {
        newResponse += "<b>" + responseArray[i] + "</b>";
      } else {
        newResponse += responseArray[i];
      }
    }

    // Replace "*" with line breaks
    let newResponse2 = newResponse.replace(/\*/g, "</br>");

    // ✅ Typing effect (word by word)
    setResultData(""); // clear old response
    let words = newResponse2.split(" ");
    words.forEach((word, index) => {
      delayPara(index, word + " ");
    });

    setLoading(false);
    setInput("");
  };


  const onSent = async (prompt) => {
    setLoading(true);
    setshowResult(true);
    let response;
    let currentPrompt = "";

    if (prompt !== undefined) {
      currentPrompt = prompt;
    } else {
      currentPrompt = input;
    }

    // ✅ Add prompt only if it's not already in the list
    setprevPrompts((prev) => {
      if (prev.includes(currentPrompt)) {
        return prev;
      }
      return [...prev, currentPrompt];
    });

    setrecentPrompt(currentPrompt);

    // Call API
    response = await runChat(currentPrompt);

    // Remove duplicate sentences (simple way)
    let uniqueResponse = response
      .split(". ")
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .join(". ");

    // Format bold text for **word**
    let responseArray = uniqueResponse.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 1) {
        newResponse += "<b>" + responseArray[i] + "</b>";
      } else {
        newResponse += responseArray[i];
      }
    }

    // Replace "*" with line breaks
    let newResponse2 = newResponse.replace(/\*/g, "</br>");

    // ✅ Typing effect (word by word)
    setResultData(""); // clear old response
    let words = newResponse2.split(" ");
    words.forEach((word, index) => {
      delayPara(index, word + " ");
    });

    setLoading(false);
    setInput("");
  };

  const ContextValue = {
    prevprompts,
    setprevPrompts,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newchat,
    handleClick
  };

  return (
    <context.Provider value={ContextValue}>
      {props.children}
    </context.Provider>
  );
};

export default ContextProvider;
