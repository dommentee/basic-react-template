// React
import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles.scss';

interface IState {//outline of the data
  todoList: string[]//string array = to array
  todoInputVal: string
}


// create App, which is the main react component
class App extends React.Component<{},IState> {
  constructor(props) {//
    super(props); 
    this.state = {
      todoList: ['todo 1', 'todo 2'],
      todoInputVal: ''
    }
  }

  renderTodoList() {//for each todo display as list item
    return this.state.todoList.map((todo, index)=> {//map retrurns array of html element
      return <li key={index}>{todo}</li>//map needs key
    })
  } 

  onInputSubmit() {//runs to submit input text
    let uppDatedTodoList = this.state.todoList;
    uppDatedTodoList.push(this.state.todoInputVal);
    this.setState({todoList: uppDatedTodoList});
    this.setState({todoInputVal: ''});
  }

  render() {
    return (
      <div>
        <Title/> {/* call component into app */}
        <input 
          type="text" 
          value={this.state.todoInputVal}//reflect the value of the state
          onChange={event=> this.setState({todoInputVal: event.target.value})}//sets input value state to value of enetered text
        />
        <button onClick={()=>this.onInputSubmit()}>Submit</button>
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

ReactDOM.render(<App />, document.getElementById("render-target"));
//React Dom
//React 