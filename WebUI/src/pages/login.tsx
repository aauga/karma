import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";
import { LoginModel } from '../models/login';
import { AccountService } from '../services/loginService';

interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required().typeError("Neteisingas vardas"),
  password: yup.string().required().typeError("Neteisingas slaptazodis"),
}).required();

export default function login() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<LoginModel> = data => AccountService.login(data).then( res => {
    if (res.status === 200){
      // handle success maybe show a toast
      console.log('success')
    }else{
      // handle failure maybe show a toast
      console.log('failure')
    }
  })
  .catch( () => {
    // handle failure maybe show a toast
    console.log('failure')
  });

  return (
<Container>
  <Row className="justify-content-md-center g-4 m-1" xs={1} md={2}>
    <Col>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Username*</Form.Label>
          <Form.Control type="text" placeholder="username" {...register("username")} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Password*</Form.Label>
          <Form.Control type="password" {...register("password")} placeholder="password" />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      {errors.username && <Alert variant="danger" className="m-2">Username field is required!</Alert>}
      {errors.password && <Alert variant="danger" className="m-2">Password field is required!</Alert>}
    </Col>
  </Row>
</Container>
  );
}
