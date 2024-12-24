import "./style.css";
import logo from "./assets/logo-white.png";
import Card from "./components/Card";
function App() {
  return (
    <div className="App">
      <header className="App-header text-black">
        <h1>Sriaj</h1>
        <img src={logo} className="App-logo bg-green" alt="logo" />
      </header>

      <Card />
    </div>
  );
}

export default App;
