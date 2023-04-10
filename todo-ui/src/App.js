import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Input, Button, Container } from "reactstrap";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const BASE_URL = "http://localhost:5000/todo";

  const fetchTodos = () => {
    axios
      .get(`${BASE_URL}/all`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log("Error Fetching Todos: ", err));
  };

  const addTodo = () => {
    axios
      .post(
        BASE_URL,
        { title },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => {
        fetchTodos();
        setTitle("");
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        fetchTodos();
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container className="text-white App" fluid>
      <div className="text-center">
        <h1>EEC - Workshop</h1>
        <Row className="w-50 mx-auto">
          <Input
            type="text"
            className="mt-5"
            placeholder="Enter Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Row>
        <Row className="w-50 mx-auto">
          <Button
            color="primary"
            className="w-25 mt-3 mx-auto"
            onClick={() => addTodo()}
          >
            Add
          </Button>
        </Row>
      </div>
      <hr width="100%" />
      <div className="text-center">
        {todos.map(({ title, _id }, index) => (
          <Row className="mx-auto d-flex justify-content-center mb-2">
            <Col md="4">
              {index + 1}) {title}
            </Col>
            <Col md="1">
              <Button
                title="Delete"
                size="sm"
                color="danger"
                onClick={() => deleteTodo(_id)}
              >
                X
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default App;
