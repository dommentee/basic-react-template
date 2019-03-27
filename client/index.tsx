// React
import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles.scss';
import Cookies from "js-cookie";
import Title from './components/Title';


interface IState {//outline of the data
  todoList: string[]//string array = to array
  todoInputVal: string
}


// create App, which is the main react component. this is root component
class App extends React.Component<{},IState> {//component = piece of UI 
  constructor(props) {//
    super(props); //Using props means we expect the parent to be in control of changing the value of props. Using state means we expect the component to be in control of its own state.
    this.state = {//state = data we want displayed when the componet is rendered
      todoList: Cookies.getJSON('todoList') ? Cookies.getJSON('todoList') : [], // the input will be added to this array
      todoInputVal: ''
    }
  }

  componentWillUpdate(currentState: IState, newState: IState) {
    if(currentState.todoList !== newState.todoList) {
      Cookies.set('todoList', newState.todoList)
    }
  }

  renderTodoList() {//for each todo display as list item
    return this.state.todoList.map((todo, index)=> {//map return html elements in an array. index = method
      return <li key={index}>{todo}<button onClick={()=>this.deletTodo(index)}>delete</button></li>//map needs key
    })
  } 
  onInputSubmit() {//method that runs when submit input text
    let uppDatedTodoList = this.state.todoList;//actual list
    uppDatedTodoList.push(this.state.todoInputVal);//push = appendChild of the input
    this.setState({todoList: uppDatedTodoList});//set the todolist array to the input text
    this.setState({todoInputVal: ''});//set input text to empty afterwards  
  }

  // deletTodo(todoIndex: number) {
  //   this.setState({ todoList: this.state.todoList.filter((todo, index) => todoIndex !== index ? todo: null ) }); 
  // }

  deletTodo(todoIndex: number) {
    const todoList =this.state.todoList.filter((todo, index) => {
      return (todoIndex !== index) ? todo : null  
      // if (todoIndex !== index) {
      //   return todo
      // } else {
      //   return null
      // }
    });
    this.setState({ todoList }); 
  }

  render() {// responsible for describing what the UI should look like
    return (
      <div className="main">
        <Title/> {/* call component into app */}
        <div className="input-todo-wrap">
          <input 
            type="text" 
            value={this.state.todoInputVal}//reflect the value of the state
            onChange={event=> this.setState({todoInputVal: event.target.value})}//sets input value state to value of enetered text
          />
          <button onClick={()=>this.onInputSubmit()}>Submit</button>
        </div>
        <div className="todo-list">
          <p>Your current list</p>
          <hr/>
          <ul>{this.renderTodoList()}</ul>
        </div>
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById("render-target"));
//React Dom
//React 