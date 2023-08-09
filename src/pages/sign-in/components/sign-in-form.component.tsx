import { useLoginEmailMutation } from '@/api/auth.api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string()
    .min(6, 'Your password must be at least 6 characters long')
    .required('Required'),
});

export default function SignInForm() {
  const [loginEmail] = useLoginEmailMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) =>
        loginEmail(values).then(() => {
          if (searchParams.get('redirect') === 'review') {
            // @TODO: Refactor this code so there isn't an empty block.
          } else {
            navigate('/profile');
          }
        })
      }
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
          <Button
            sx={{ my: 1, width: 1 }}
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
}
