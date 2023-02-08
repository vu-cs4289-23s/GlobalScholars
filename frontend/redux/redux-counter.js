import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { increment, decrement } from "./counter-slice";

function ReduxCounter() {
  // DELETE THIS LINE

  // TODO #7: create a hook to access dispatch function
  const dispatch = useDispatch();

  // TODO #8: retrieve the current counter state
  const { counter } = useSelector((state) => state.counter);

  const incrementCounter = () => {
    // TODO #9: use dispatch to increment the counter
    dispatch(increment());
  };

  const decrementCounter = () => {
    // TODO #10: use dispatch to decrement the counter
    dispatch(decrement());
  };

  return (
    <div className="counter-content">
      <h2>Redux Counter&nbsp;&#128216;</h2>
      <button onClick={incrementCounter}>&#10133;</button>
      <h1>{counter}</h1>
      <button onClick={decrementCounter}>&#10134;</button>
    </div>
  );
}

export default ReduxCounter;
