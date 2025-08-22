import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/app';
import { context } from '../../Context/context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, handleClick } = useContext(context);

  return (
    <div className="Main">

      <div className="heading">
        <p>Gemini</p>
        <img src={assets.UserIcon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Surya</span></p>
              <p><span>How can I help you?</span></p>
            </div>

            <div className="cards">
              <div className="card">
                <p onClick={handleClick}>Suggest some beautiful spots on the upcoming road trip</p>
                <img src={assets.Compass} alt="Compass" />
              </div>

              <div className="card">
                <p onClick={handleClick}>Summarize the concept: Urban Planning</p>
                <img src={assets.Bulb} alt="Bulb" />
              </div>

              <div className="card">
                <p onClick={handleClick}>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.Message} alt="Message" />
              </div>

              <div className="card">
                <p onClick={handleClick}>Improve the readability of the following code</p>
                <img src={assets.Code} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.UserIcon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <div className="circle-loader">
                  <div className="circle"></div>
                  <img src={assets.GeminiIcon} alt="Gemini Logo" className="gemini-logo" />
                </div>
              ) : (
                <>
                  <img src={assets.GeminiIcon} alt="Gemini Icon" />
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="Text">
        <div className="Search-Box">
          <textarea
            placeholder="Ask Gemini"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          ></textarea>
        </div>

        <div className="icons">
          <img src={assets.Gallary} alt="Gallery" />
          {input ? <img src={assets.Send} alt="Send" onClick={() => onSent(input)} /> : null}
          <img src={assets.Mic} alt="Mic" />
        </div>

        <div className="bottom-info">
          <p>
            Gemini may display inaccurate info, including about people, so double-check its response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
