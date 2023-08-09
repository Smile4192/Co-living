import { Button, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Form, Formik } from 'formik';

export default function ChangePassword() {
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        password: '',
        password_confirmation: '',
      }}
      onSubmit={() => {}}
    >
      {(values, handleChange) => (
        <Form>
          <Paper variant="elevation" elevation={1} sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="initial">
                  New password
                </Typography>
                <Button variant="contained" color="success">
                  Save
                </Button>
              </Stack>
              <TextField
                name="oldPassword"
                label="Old password"
                value={values.oldPassword}
                onChange={handleChange}
                type="password"
              />
              <TextField
                name="password"
                label="New password"
                value={values.password}
                onChange={handleChange}
                type="password"
              />
              <TextField
                name="password_confirmation"
                label="Confirm new password"
                value={values.password_confirmation}
                onChange={handleChange}
                type="password"
              />
            </Stack>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}
