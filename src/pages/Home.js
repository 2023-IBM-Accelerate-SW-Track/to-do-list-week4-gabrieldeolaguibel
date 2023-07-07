import React, { Component } from "react";
import Todos from "../component/todos";
import AddTodo from "../component/AddTodo";
import "../pages/Home.css";
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    this.fetchTodoItems();
  }

  fetchTodoItems = () => {
    axios.get('http://localhost:3001/all/items')
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/item/${id}`)
      .then(res => {
        if(res.status === 200) {
          this.fetchTodoItems();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="Home">
        <h1>Todo's </h1>
        <AddTodo fetchTodoItems={this.fetchTodoItems} />
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default Home;
