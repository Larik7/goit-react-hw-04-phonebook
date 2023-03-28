import PropTypes from 'prop-types';
import { Formik, Field} from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { FormField, Form, ErrorMessage, SubmitBtn, } from './ContactForm.styled';

const ContactShema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short!')
    .max(16, 'Name is too long!')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number is too short!')
    .max(20, 'Number is too long!')
    .required('Number is required'),
});


export const ContactForm = ({onSubmit}) => {
    return (
    <Formik
      initialValues={{
        name: '',
        number: ''
      }}
      validationSchema={ContactShema}
      onSubmit = {(values, actions) => {
        onSubmit({...values, id: nanoid()});
        actions.resetForm();
    }}
    >
      <Form>
        <FormField>
            Name
            <Field name="name"/>
            <ErrorMessage name="name" component="span"/>
        </FormField>
        <FormField>
            Number
            <Field name="number" type="tel"/>
            <ErrorMessage name="number" component="span"/>
        </FormField>
            <SubmitBtn type="submit" onSubmit={onSubmit}>
                <span>Add contact</span>
            </SubmitBtn>
      </Form>
    </Formik>
    )
}

ContactForm.propTypes = {
    onAddContact: PropTypes.func
}