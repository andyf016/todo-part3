import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
//import { BrowserRouter } from "react-router-dom";
import { Route, NavLink } from "react-router-dom";
import TodoList from './TodoList'
//import TodoItem from './TodoItem'
import {connect} from "react-redux"
import {addTodo, clearCompletedTodos, deleteTodo} from "./actions" 



class App extends Component {
  state = {
    todos: todosList
  };

  //handleDeleteTodo = (event, todoIdToDelete) => {
  //  this.props.deleteTodo(todoIdToDelete)
  //}

  handleToggleComplete = (event, todoIdToToggle) => {
    this.props.toggleComplete(todoIdToToggle)
  };

  handleAddTodo = event => {
    if (event.key === "Enter") {
      this.props.addTodo(event.target.value);
      event.target.value = "";
    }
  };

  handleClearCompletedTodos = event =>{
    this.props.clearCompletedTodos();
  }

  render() {
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            onKeyDown={this.handleAddTodo}
            autoFocus
          />
        </header>
        <Route
          exact
          path='/'
          render={() => (
            <TodoList
              todos={this.props.todos}
              //handleToggleComplete={this.handleToggleComplete}
              //handleDeleteTodo = {this.handleDeleteTodo}
            />
          )}
        />
        <Route
          path='/active'
          render={() => (
            <TodoList
              todos={this.props.todos.filter(todo => todo.completed === false)}
              //handleToggleComplete={this.handleToggleComplete}
              //handleDeleteTodo = {this.handleDeleteTodo}
            />
          )}
        />

        <Route
          path='/completed'
          render={() => (
            <TodoList
              todos={this.props.todos.filter(todo => todo.completed === true)}
              //handleToggleComplete={this.handleToggleComplete}
              //handleDeleteTodo = {this.handleDeleteTodo}
            />
          )}
        />
        <footer className='footer'>
          {/* <!-- This should be `0 items left` by default --> */}
          <span className='todo-count'>
            <strong>0</strong> item(s) left
          </span>
          <ul className='filters'>
            <li>
              <NavLink exact to='/' activeClassName='selected'>
                All
              </NavLink>
            </li>
            <li>
              <NavLink to='/active' activeClassName='selected'>
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to='/completed' activeClassName='selected'>
                Completed
              </NavLink>
            </li>
          </ul>
          <button className='clear-completed' onClick = {this.handleClearCompletedTodos}>Clear completed</button>
        </footer>
      </section>
    );
  }
}
//this.props.handleToggleComplete

//<TodoList />

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = {
  addTodo,
  clearCompletedTodos,
  deleteTodo
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
