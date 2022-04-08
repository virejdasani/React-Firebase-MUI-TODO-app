import "./App.css";
import Navbar from "./Components/Navbar";
import Todos from "./Components/Todos";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Todos />
      <p>
        This project is made only to test some firebase and react functionality.
        This isn't a finished project
      </p>
    </div>
  );
}

export default App;
