import "../../App.css";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/">Go to Home</Link>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default WelcomePage;
