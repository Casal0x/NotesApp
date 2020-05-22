import React from 'react';
import { connect } from 'react-redux';
import { addTestItem } from '../store/actions/testActions';

const Test = (props) => {
  console.log(props.test);
  const getRandom = () => {
    return Math.floor(Math.random() * 100);
  }

  const addRandomItem = () => {
    props.addTestItem({
      id: getRandom(),
      title: "ADDED NEW TEST",
      description: "DESC"
    })
  }
  
  return (
    <div>
      <h1>Test Page</h1>
      <ul>
        { props.test && props.test.map( item => {
          return <li key={item.id}>{item.title} {item.description}</li>
        })}
      </ul>

      <button onClick={() => addRandomItem()}> Add Random Item</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    test: state.test.testData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTestItem: (item) => dispatch(addTestItem(item))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
