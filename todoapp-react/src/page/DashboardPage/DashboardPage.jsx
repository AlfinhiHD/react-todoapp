import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ListGroup, Form, DropdownButton, Dropdown } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:8000/api/todos';

const TodoStatus = {
  TODO: 'Todo',
  PROGRESS: 'Progress',
  FINISH: 'Finish',
};

function Dashboard() {

  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        userid: user.userid,
      });
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
      const response = await axios.post(API_BASE_URL, {
        title: newTodo,
        status: TodoStatus.TODO,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, { status });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filterTodos = (todo) => {
    if (filter === '') return true;
    return todo.status === filter;
  };

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>

      <Form onSubmit={addTodo}>
        <Form.Group controlId="formBasicTodo">
          <Form.Label className=''>Add a Todo:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary mt-3" type="submit">
          Add
        </Button>
      </Form>

      <DropdownButton
        className="mt-4"
        title={`Filter: ${filter === '' ? 'All' : filter}`}
        variant="secondary"
        onSelect={(e) => setFilter(e)}
      >
        <Dropdown.Item eventKey="">All</Dropdown.Item>
        <Dropdown.Item eventKey={TodoStatus.TODO}>Todo</Dropdown.Item>
        <Dropdown.Item eventKey={TodoStatus.PROGRESS}>Progress</Dropdown.Item>
        <Dropdown.Item eventKey={TodoStatus.FINISH}>Finish</Dropdown.Item>
      </DropdownButton>

      <ListGroup className="mt-4">
        {todos.filter(filterTodos).map((todo) => (
          <ListGroup.Item key={todo.id}>
            {todo.title}
            <Button
              variant="success"
              className="float-right mr-2"
              disabled={todo.status === TodoStatus.FINISH}
              onClick={() => updateStatus(todo.id, TodoStatus.PROGRESS)}
            >
              Progress
            </Button>
            <Button
              variant="info"
              className="float-right mr-2"
              disabled={todo.status === TodoStatus.FINISH}
              onClick={() => updateStatus(todo.id, TodoStatus.FINISH)}
            >
              Finish
            </Button>
            <Button
              variant="danger"
              className="float-right"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Dashboard;
