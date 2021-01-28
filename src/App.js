import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import SearchTodo from './components/SearchTodo';

const App = () =>{

  const [todos, setTodos] = useState([]);

  const [todoToEdit, setTodoToEdit] = useState({
    id: null,
    title: '',
    completed: false
  });

  const [editMode, setEditMode] = useState(false);
  
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setTodos([
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Do the dishes',
        completed: false
      },
      {
        id: 3,
        title: 'Clean the house',
        completed: false
      },
    ])
    // eslint-disable-next-line
  },[]);


  const completeTodo = id => {
    setTodos([...todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo
    })])
  }
  
  const deleteTodo = id => { setTodos([...todos.filter(todo => todo.id !== id)]) }

  const addTodo = title => {
    setTodos([...todos,{
      id: Math.floor(Math.random() * 1000),
      title,
      completed: false
    }])
  }

  const activateEditMode = todo => {
    setEditMode(true);
    setTodoToEdit(todo);
  }

  const deactivateEditMode = todo => {
    setEditMode(false);
    setTodoToEdit({
      id: null,
      title: '',
      completed: false
    });
  }

  const editTodo = (id, title) => {
    setTodos([...todos.map(todo => {
        if(todo.id === id){
          todo.title = title
        }
        return todo;
      }
    )])
  }

  const searchTodo = title => {
    setFiltered([...todos.filter(todo => {
      const regex = new RegExp(`${title}`, 'gi');
      return todo.title.match(regex)
    })])
  }
  
  return (
    <Router>
      <Fragment>
        <Navbar todosQuantity={todos.length}/>
        <Route exact path="/"  render={props => (
          <div className="container">
            <Fragment>
              {
                editMode ?
                <EditTodo
                  todoToEdit={todoToEdit}
                  deactivateEditMode={deactivateEditMode}
                  editTodo={editTodo}
                />
                :
                <AddTodo addTodo={addTodo}/>
              }
              <SearchTodo searchTodo={searchTodo}/>
              {
                filtered.length === 0 ?
                  <Todos
                    todos={todos}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                    activateEditMode={activateEditMode}
                  />
                :
                  <Todos
                    todos={filtered}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                    activateEditMode={activateEditMode}
                  />
              }
            </Fragment>
          </div>
        )}/>
        <Route path="/about" component={About} />
      </Fragment>
    </Router>
  )
}

export default App