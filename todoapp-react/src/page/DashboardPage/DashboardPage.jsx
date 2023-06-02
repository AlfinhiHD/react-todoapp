import React, { useState, useEffect } from 'react';
import { Form, Button, DropdownButton, Dropdown, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/todos';

// const TodoStatus = {
//   TODO: 'Todo',
//   PROGRESS: 'Progress',
//   FINISH: 'Finish',
// };

const TodoList = () => {

  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('');
  const [newStatus, setNewStatus] = useState('Todo');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${user.userid}`, {
        headers: {
          'token': user.token
        }
      });
      console.log(response.data.todo)
      setTodos(response.data.todo);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_BASE_URL, {
        title: newTodo,
        status: newStatus
      }, {
        headers: {
          "token": user.token
        }
      });
      const newTodoItem = response.data.todo;
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        status: status
      }, {
        headers: {
          "token": user.token
        }
      });
      const updatedTodoItem = response.data.todo;

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === updatedTodoItem.id ? updatedTodoItem : todo))
      );
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          'token': user.token
        }
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filterTodos = (todo) => {
    if (filter === '') {
      return true;
    }
    return todo.status === filter;
  };

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>

      <Form onSubmit={addTodo}>
        <Form.Group controlId="formBasicTodo">
          <Form.Label>Add a Todo:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicStatus">
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Todo">Todo</option>
            <option value="Progress">Progress</option>
            <option value="FINISH">Finish</option>
          </Form.Control>
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
        <Dropdown.Item eventKey="Todo">Todo</Dropdown.Item>
        <Dropdown.Item eventKey="Progress">Progress</Dropdown.Item>
        <Dropdown.Item eventKey="FINISH">Finish</Dropdown.Item>
      </DropdownButton>

      <ListGroup className="mt-4">
        {todos.filter(filterTodos).map((todo) => (
          <ListGroup.Item key={todo.id}>
            <div className="d-flex justify-content-between align-items-center">
              <span>{todo.title}</span>
              <div className="d-flex">
                <div className="me-2">
                  <DropdownButton
                    variant="success"
                    title={todo.status}
                    onSelect={(status) => updateStatus(todo.id, status)}
                  >
                    <Dropdown.Item eventKey="Todo" active={todo.status === 'Todo'}>
                      Todo
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Progress"
                      active={todo.status === 'Progress'}
                    >
                      Progress
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="FINISH"
                      active={todo.status === 'FINISH'}
                    >
                      Finish
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;