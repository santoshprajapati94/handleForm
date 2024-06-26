import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
 const validationSchema = Yup.object({
    name :Yup.string()
    .max(20,'Must be 20 characters or less')
    .required('Required'),
    email:Yup.string()
    .email('Invalid email address')
    .required('Required'),
    password:Yup.string()
    .min(8,'Must be 8 characters')
    .required('Required')
 })
const formvalidation = () => {
  return (
    <Formik
    initialValues={{name:'',email:'',password:''}}
    validationSchema={validationSchema}
    onSubmit={(value,{setSubmitting})=>{
        setTimeout(()=>{
            console.log(JSON.stringify(value ,null ,2))
            setSubmitting(false)
        },400);
    }}   
    >
    {({isSubmitting})=>(
        <Form>
            <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
    )}
    </Formik>
  );
};

export default formvalidation;
