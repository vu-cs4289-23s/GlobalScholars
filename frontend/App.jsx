import { useState } from "react";
import { NavLink } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./redux/counter-slice";

function App() {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state.counter);
  const [oneApiData, setOneApiData] = useState();
  const [anotherApiData, setAnotherApiData] = useState();
  const urlWithProxy = "/api/v1";

  const incrementCounter = () => {
    // TODO #9: use dispatch to increment the counter
    dispatch(increment());
  };

  const decrementCounter = () => {
    // TODO #10: use dispatch to decrement the counter
    dispatch(decrement());
  };

  const getOneApiDataFromServer = () => {
    axios
      .get(urlWithProxy + "/oneapi")
      .then((res) => setOneApiData(res.data))
      .catch((err) => {
        console.error(err);
      });
  };

  const getAnotherDataFromServer = () => {
    axios
      .get(urlWithProxy + "/anotherapi")
      .then((res) => setAnotherApiData(res.data))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={incrementCounter}>Increment {counter}</button>
        <button onClick={decrementCounter}>Decerement {counter}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <button onClick={getOneApiDataFromServer}>
          Access server using proxy for One API
        </button>
        <p>data : {oneApiData}</p>
      </div>
      <div>
        <button onClick={getAnotherDataFromServer}>
          Access server using proxy for Another API
        </button>
        <p>data : {anotherApiData}</p>
      </div>
      <h1>REACT ROUTER ROUTES</h1>

      <div>
        <NavLink to="/forum">Forum Page</NavLink>
      </div>
      <div>
        <NavLink to="/landing">Landing Page</NavLink>
      </div>
      <div>
        <NavLink to="/login">Login Page</NavLink>
      </div>
      <div>
        <NavLink to="/register">Register Page</NavLink>
      </div>
      <div>
        <NavLink to="/profile">Profile Page</NavLink>
      </div>

      <div>
        <NavLink to="/oihoahsdfoiadfa">
          Random route will go to an error page
        </NavLink>
      </div>
    </div>
  );
}

export default App;
