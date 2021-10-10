import React from 'react';
import { Field, useFormik, Formik, ErrorMessage } from 'formik';
import { Alert, Button, Form, Container, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 20) {
    errors.description = 'Must be 20 characters or less';
  }

  return errors;
};

const AddListing = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    desc: Yup.string().required(),
    city: Yup.string().required(),
    category: Yup.string().required('Please select a category')
  });

  const renderError = message => (
    <Alert variant='danger' className='m-1'>
      {message}
    </Alert>
  );

  return (
    <Container>
      <Row className='justify-content-md-center g-4 m-1' xs={1} md={2}>
        <Col>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              name: '',
              description: '',
              city: '',
              category: []
            }}
            onSubmit={async values => {
              await sleep(1000);
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
              <Form>
                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label htmlFor='name'>Item name</Form.Label>
                  <Form.Control
                    type='text'
                    id='name'
                    placeholder='Example: "Unused sofa"'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <ErrorMessage name='name' render={renderError} />
                  <p>Hello world!</p>
                </Form.Group>

                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label htmlFor='description'>Item description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    id='description'
                    placeholder='Example: Not used'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <ErrorMessage name='description' render={renderError} />
                </Form.Group>

                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label htmlFor='category'>Which category your item suits the most?</Form.Label>
                  <Field component='select' id='category' name='category' className='form-select' aria-label='Default select example'>
                    <option selected>Please select category</option>
                    <option value='NY'>Furniture</option>
                    <option value='SF'>Misc</option>
                    <option value='CH'>Technology</option>
                    <option value='OTHER'>Other</option>
                  </Field>

                  <ErrorMessage name='category' render={renderError} />
                </Form.Group>

                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label htmlFor='city'>Your city</Form.Label>
                  <Form.Control
                    type='text'
                    rows={3}
                    id='city'
                    placeholder='Example: Vilnius'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  <ErrorMessage name='city' render={renderError} />
                </Form.Group>

                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label>Choose your photos</Form.Label>
                  <Form.Control type='file' multiple />
                </Form.Group>

                <Button type='submit'>Submit</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
export default AddListing;
