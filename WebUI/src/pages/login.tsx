import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";

export default function login() {
  return (
<Container>
  <Row className="justify-content-md-center g-4 m-1" xs={1} md={2}>
    <Col>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Username*</Form.Label>
          <Form.Control type="text" placeholder="username" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Password*</Form.Label>
          <Form.Control type="password" placeholder="password" />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      {/* {errors.username && <Alert variant="danger" className="m-2">Username field is required!</Alert>}
      {errors.password && <Alert variant="danger" className="m-2">Password field is required!</Alert>} */}
    </Col>
  </Row>
</Container>
  );
}
