import React from 'react';
import ReactDom from 'react-dom';

// In order for react to know that a function is a component, the 
// function name should be capitalised
function Greeting() {
  // This function must return JSX

  return <h4>This is Tshepo and this is my first component</h4>
}

ReactDom.render(<Greeting/>, document.getElementById('root'));