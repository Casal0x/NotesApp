import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTestItem } from "../store/actions/testActions";

const Test = (props) => {
  const testData = useSelector((state) => state.test.testData);
  const dispatch = useDispatch();

  const getRandom = () => {
    return Math.floor(Math.random() * 100);
  };

  const addRandomItem = () => {
    dispatch(
      addTestItem({
        id: getRandom(),
        title: "ADDED NEW TEST",
        description: "DESC",
      })
    );
  };

  return (
    <div>
      <h1>Test Page</h1>
      <ul>
        {testData &&
          testData.map((item) => {
            return (
              <li key={item.id}>
                {item.title} {item.description}
              </li>
            );
          })}
      </ul>

      <button onClick={() => addRandomItem()}> Add Random Item</button>
    </div>
  );
};

export default Test;
