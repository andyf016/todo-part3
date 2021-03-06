import todoList from "./todos.json";
import {
  ADD_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED_TODOS,
  TOGGLE_TODO
} from "./actions.js";

const initialState = {
  todos: todoList
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodos = state.todos.slice();

      newTodos.push(action.payload);

      return { todos: newTodos };
    case TOGGLE_TODO: {
      const newTodos = state.todos.slice();
      const newnewTodos = newTodos.map(todo => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }

        return todo;
      });
      return{ todos: newnewTodos };
    }
    case DELETE_TODO: {
      const newTodoList = state.todos.filter(todo => {
        if (todo.id === action.payload) {
          return false;
        }
        return true;
      });
      return { todos: newTodoList };
    }
    case CLEAR_COMPLETED_TODOS:
      const newTodoList = state.todos.filter(todo => {
        if (todo.completed === true) {
          return false;
        }
        return true;
      });
      return { todos: newTodoList };
    default:
      return state;
  }
};

export default todosReducer;
