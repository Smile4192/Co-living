// require('dotenv').config();
import { useRegisterMutation } from '@/api/auth.api';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import TermsPolicy from './terms-policy.component';

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').required('Required'),
  phone: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  password: Yup.string()
    .min(6, 'Your password must be at least 6 characters long')
    .required('Required'),
  password_confirmation: Yup.string()
    .min(6, 'Your password must be at least 6 characters long')
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  user_source: Yup.string(),
  accept_conditions: Yup.bool().oneOf(
    [true],
    'You must agree to the terms and conditions',
  ),
});

export default function SignUpForm() {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  async function handleSignup(submission) {
    console.log('sign up form submitted');
    console.log(submission);
    await axios
      .post('https://feliciti-auth.us.auth0.com/dbconnections/signup', {
        client_id: 'NeCsidB5rIUPDXg74vpKSpd9KLW8a817',
        connection: 'Username-Password-Authentication',
        email: submission.email,
        password: submission.password,
        given_name: submission.first_name,
        family_name: submission.last_name,
        name: submission.first_name + ' ' + submission.last_name,
        user_metadata: {
          phoneNumber: submission.phone,
        },
      })
      .then((result) => {
        console.log(result.data);
        navigate('/profile');
      });
  }
  return (
    <Formik
      initialValues={{
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
        accept_conditions: false,
        user_source: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        register({ ...values, status: 'resident' }).then(() =>
          handleSignup(values),
        );
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form>
          <TextField
            sx={{ my: 1 }}
            label="Email"
            name="email"
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email ? errors.email : null}
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            label="Phone"
            name="phone"
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            error={errors.phone && touched.phone}
            helperText={errors.phone && touched.phone ? errors.phone : null}
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            label="First Name"
            name="first_name"
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.first_name}
            error={errors.first_name && touched.first_name}
            helperText={
              errors.first_name && touched.first_name ? errors.first_name : null
            }
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            label="Last Name"
            name="last_name"
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.last_name}
            error={errors.last_name && touched.last_name}
            helperText={
              errors.last_name && touched.last_name ? errors.last_name : null
            }
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            label="Password"
            name="password"
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password && touched.password}
            helperText={
              errors.password && touched.password ? errors.password : null
            }
            type="password"
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            label="Confirm your password"
            name="password_confirmation"
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password_confirmation}
            error={
              errors.password_confirmation && touched.password_confirmation
            }
            helperText={
              errors.password_confirmation && touched.password_confirmation
                ? errors.password_confirmation
                : null
            }
            type="password"
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            label="Where did you hear about us?"
            name="user_source"
            size="large"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user_source}
            error={errors.user_source && touched.user_source}
            helperText={
              errors.user_source && touched.user_source
                ? errors.user_source
                : 'Optional. Provide a link or full name of the person who referred you'
            }
            fullWidth
          />
          <FormGroup sx={{ my: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.accept_conditions}
                  onChange={handleChange}
                  name="accept_conditions"
                />
              }
              label={<TermsPolicy />}
            />
            {errors.accept_conditions && touched.accept_conditions ? (
              <FormHelperText
                error={errors.accept_conditions && touched.accept_conditions}
              >
                {errors.accept_conditions}
              </FormHelperText>
            ) : null}
          </FormGroup>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ width: 1 }}
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
