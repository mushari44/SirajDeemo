import React from "react";
import sirajIcon from "../assets/Siraj-icon.png";

const WelcomeMessage = ({ timestamp }) => {

  const welcomingText = "WELCOME TEST MERGE ";
  const suggestQ = "ما هي مواضيع المدونة؟";

  return (
    <div className="Message-Suggests">
      <div className="Time-Icon">
        <img src={sirajIcon} alt="Sirah icon" />
        <div>
          <h2>سراج</h2>
          <p className="text-sm">{`${timestamp}`}</p>
        </div>
      </div>
      <div className="bg-blue-600 text-white rounded-md p-4 Welcome-Message">
        <p className="text-xl">
          {welcomingText.split("<br>").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className="SuggestQ">
        <p className="bg-blue-600 text-white rounded-md p-4 suggest">
          {suggestQ}
        </p>
        <p className="bg-blue-600 text-white rounded-md p-4 suggest">
          {suggestQ}
        </p>
        <p className="bg-blue-600 text-white rounded-md p-4 suggest">
          {suggestQ}
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
