import sirajIcon from "../assets/Siraj-icon.png";

const BotResponse = ({ response,timestamp }) => {
  
  return response ? (<div className="Bot-Response">
          <div className="Time-Icon">
            <img src={sirajIcon} alt="Sirah icon"/>
            <div>
              <h2>سراج</h2>
              <p className="text-sm">{`${timestamp}`}</p>
            </div>
          </div>
          <div className="bg-gray p-4 rounded-md mb-2 Response-Container">
          <p className="Response">{response}</p>
        </div>
    </div> ): (<div className="loader"><div  className="bg-blue-600 text-white rounded-md"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg></div>
              </div>)

};

export default BotResponse;
