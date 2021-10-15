import React from 'react';
import { Field, useFormik, Formik, ErrorMessage } from 'formik';
import { Alert, Button, Form, Container, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseURL = `${serverUrl}/api/item`;

const AddListing = () => {
  const [post, setPost] = React.useState(null);

  const { getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    axios.get(`${baseURL}`).then(response => {
      setPost(response.data);
    });
  }, []);

  const createPost = async () => {
    const token = await getAccessTokenSilently();
    axios
      .post(
        baseURL,
        {
          name: 'test',
          description: 'test',
          city: 'test',
          category: 2
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        setPost(response.data);
      });
    // console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
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
      <Button onClick={createPost}>Test POST</Button>
      <Row className='justify-content-md-center g-4 m-1' xs={1} md={2}>
        <Col>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              name: '',
              description: '',
              city: '',
              category: ''
            }}
            onSubmit={async (e, values, { setSubmitting }) => {
              e.preventDefault();
              handleSubmit();
              // await new Promise(r => setTimeout(r, 500));
              // setSubmitting(false);
              // await sleep(500);
              // alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
              <Form>
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

                <Form.Label htmlFor='category'>Which category your item suits the most?</Form.Label>
                <Field component='select' id='category' name='category' className='form-select' aria-label='Default select example'>
                  <option selected>Please select category</option>
                  <option value='1'>Furniture</option>
                  <option value='2'>Misc</option>
                  <option value='3'>Technology</option>
                  <option value='4'>Other</option>
                </Field>

                <ErrorMessage name='category' render={renderError} />

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

                <Form.Label>Choose your photos</Form.Label>
                <Form.Control type='file' multiple />

                <Button type='submit' className='m-2' disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
export default AddListing;
