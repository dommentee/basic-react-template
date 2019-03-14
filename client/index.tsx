// React
import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles.scss';

// create App, which is the main react component
class App extends React.Component {
  render() {
    return (
      <div>
        <Title/> {/* call component into app */}
        This is basic react!
      </div>
    );
  }
}

class Title extends React.Component {//creat the component 
  render() {
    return (
      <div>
        <h1>Hello Dom</h1>
        <hr/>
      </div>
    );
  }
} 


ReactDOM.render(<App />, document.getElementById("render-target"));
//React Dom
//React 