import React, { useContext, useState } from "react";
import "./SideBar.css";
import { assets } from "../../assets/app";
import { context } from "../../Context/context";

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null); // track active question
  const [isOpen, setIsOpen] = useState(true);
  const { onSent, prevprompts, setrecentPrompt,newchat } = useContext(context);

  const loadprompt = async (prompt) => {
    setrecentPrompt(prompt);
    await onSent(prompt);
  }

  const handleClick = (index) => {
    setActiveIndex(index); // set clicked item active
  };

  const handleChange = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="sidebar"
      style={{ width: isOpen ? "272px" : "70px" }}
    >
      {/* Top Section */}
      <div className="top">
        {/* Menu */}
        <div className="menu">
          <img src={assets.Menu} alt="menu" onClick={handleChange} />
          {isOpen && <img className="Search" src={assets.Search} alt="search" />}
        </div>

        {/* New Chat */}
        <div className="newchat">
          <img src={assets.NewChat} alt="new chat" />
          {isOpen && <p onClick={newchat}>New Chat</p>}
        </div>

        {/* Recent */}
        <div className="recent">
          {isOpen && <p>Recent</p>}
          {prevprompts.map((item, index) => (
            isOpen && (
              <p
                key={index}
                onClick={() => {
                  handleClick(index);   
                  loadprompt(item);         
                }}
                className={`Questions ${activeIndex === index ? "active" : ""}`}
              >
                {item}...
              </p>

            )
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="Settings">
          <img src={assets.Settings} alt="settings" />
          {isOpen && <p>Settings and Help</p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
