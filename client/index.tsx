// React
import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles.scss';
import Cookies from "js-cookie";
import Title from './components/Title';
import { Button } from 'antd';
import 'antd/dist/antd.css'


interface IState {//outline of the data
  todoList: string[]//string array = to array
  todoInputVal: string
  counter: number
}


// create App, which is the main react component. this is root component
class App extends React.Component<{},IState> {//component = piece of UI 
  constructor(props) {//
    super(props); //Using props means we expect the parent to be in control of changing the value of props. Using state means we expect the component to be in control of its own state.
    this.state = {//state = data we want displayed when the componet is rendered
      todoList: Cookies.getJSON('todoList') ? Cookies.getJSON('todoList') : [], //un load or reload of page will check for cookies if noe return empty erray
      todoInputVal: '',
      counter: Cookies.getJSON('count') ? Cookies.getJSON('count') : 0,
    }
  }

  componentWillUpdate(currentState: IState, newState: IState) {//method that checks changes
    if(currentState.todoList !== newState.todoList) {
      Cookies.set('todoList', newState.todoList);//changes in the list save as cookies
    }
  }

  counterWillupDAte(oldState: IState, refreshState: IState) {
    if(oldState.todoList.length !== refreshState.todoList.length) {
    }
  }

  renderTodoList() {//for each todo display as list item
    return this.state.todoList.map((todo, index, todoList)=> {//map return html elements in an array. index = method
      return <li key={index}>{todo}<button type="primary" id="delete" onClick={()=>this.deletTodo(index)}>Delete</button></li>//map needs key
    })
  } 

  onInputSubmit() {//method that runs when submit input text
    let uppDatedTodoList = this.state.todoList;//actual list
    uppDatedTodoList.push(this.state.todoInputVal);//push = appendChild of the input
    this.setState({todoList: uppDatedTodoList});//set the todolist array to the input text
    this.setState({todoInputVal: ''});//set input text to empty afterwards   
  }

  addTodoOnEnter = event => {
    if(event.key == 'Enter' ) {
      let uppDatedTodoList = this.state.todoList;//actual list
      uppDatedTodoList.push(this.state.todoInputVal);//push = appendChild of the input
      this.setState({todoList: uppDatedTodoList});//set the todolist array to the input text
      this.setState({todoInputVal: ''});
    }
  }

  //object.method() "this." will work
  //functtion() "this." will not wor

  // deletTodo(todoIndex: number) {
  //   this.setState({ todoList: this.state.todoList.filter((todo, index) => todoIndex !== index ? todo: null ) }); 
  // }

  deletTodo(todoIndex: number) {
    const todoList = this.state.todoList.filter((todo, index) => {
      return (todoIndex !== index) ? todo : null  
      // if (todoIndex !== index) {
      //   return todo
      // } else {
      //   return null
      // }
    });
    this.setState({ todoList }); 
    this.setState({ counter: this.state.counter -1 && todoList.length});
  }

  render() {// responsible for describing what the UI should look like
    return (
      <div className="main">
        <Title/> {/* call component into app */}
        <div className="input-todo-wrap">
          <input 
            type="text" 
            onKeyPress={this.addTodoOnEnter}
            value={this.state.todoInputVal}//reflect the value of the state
            onChange={event=> this.setState({todoInputVal: event.target.value})}//sets input value state to value of enetered text
          />
          <Button type="primary" onClick={()=>this.onInputSubmit()}>add todo</Button>
        </div>
        <div className="num-of-todo">
          <p>Your currently have</p>
          {/* <div className="counter">{this.formatCount()}</div> */}
          <div className="counter">{this.state.todoList.length}</div>
        </div>
        <div className="todo-list">
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