// React
import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles.scss';

// create App, which is the main react component
class App extends React.Component {
  todoList: string[] = ['todo 1', 'todo 2']; //string array = to array

  renderTodoList() {//for each todo display as list item
    return this.todoList.map((todo, index)=> {//map retrurns array of html element
      return <li key={index}>{todo}</li>//map needs key
    })

  } 

  render() {
    return (
      <div>
        <Title/> {/* call component into app */}
        <Input/>
        <ul>{this.renderTodoList()}</ul>
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

class Input extends React.Component {
  render() {
    return (
      <div className="input-wrap">
        <input type="text"/>
      </div>

    )
  }
}

ReactDOM.render(<App />, document.getElementById("render-target"));
//React Dom
//React 