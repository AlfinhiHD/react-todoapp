import React, { useState, useEffect } from 'react';
import { Form, Button, DropdownButton, Dropdown, ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../component/Header';

const API_BASE_URL = 'https://projek-kelompok-8.as.r.appspot.com/todos';

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

      fetchTodos();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const confirmed = window.confirm('Apakah Anda yakin ingin menghapus todo ini?');

      if (confirmed) {
        await axios.delete(`${API_BASE_URL}/${id}`, {
          headers: {
            'token': user.token
          }
        });
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const deleteAllTodo = async () => {
    try {
      const confirmed = window.confirm('Apakah Anda yakin ingin menghapus semua todo?');

      if (confirmed) {
        await axios.delete(`${API_BASE_URL}/delete/${user.userid}`, {
          headers: {
            'token': user.token
          }
        });
        setTodos([])
      }
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
    <>
      <Header />
      <Container className="p-5" style={{ maxWidth: '1000px' }}>
        <h1 className="text-center mb-4">Todo List</h1>

        <Form onSubmit={addTodo}>
          <Form.Group controlId="formBasicTodo" className='mb-3'>
            <Form.Label>Add a Todo:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicStatus" className='mb-3'>
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
          <div className='d-grid'>
            <Button variant="primary my-3" type="submit">
              Add
            </Button>
          </div>
        </Form>

        <div className="d-flex justify-content-center align-items-center mt-4">
          <DropdownButton
            className="me-3"
            title={`Filter: ${filter === '' ? 'All' : filter}`}
            variant="secondary"
            onSelect={(e) => setFilter(e)}
          >
            <Dropdown.Item eventKey="">All</Dropdown.Item>
            <Dropdown.Item eventKey="Todo">Todo</Dropdown.Item>
            <Dropdown.Item eventKey="Progress">Progress</Dropdown.Item>
            <Dropdown.Item eventKey="FINISH">Finish</Dropdown.Item>
          </DropdownButton>
          
          <Button variant="danger" onClick={() => deleteAllTodo()}>
            Clear All Todos
          </Button>
        </div>

        <div className="card mt-4">
          <div className="list-group list-group-flush">
            {todos.filter(filterTodos).map((todo) => (
              <div className="list-group-item" key={todo.id}>
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
                        <Dropdown.Item eventKey="Progress" active={todo.status === 'Progress'}>
                          Progress
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="FINISH" active={todo.status === 'FINISH'}>
                          Finish
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <Button variant="danger" onClick={() => deleteTodo(todo.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default TodoList;