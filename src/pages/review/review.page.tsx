import SelectField from '@/shared/components/form/select.component';
import Hero from '@/shared/components/layout/hero.component';
import { Box, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

const currentYear = new Date().getFullYear();
const yearDate = [...Array(100)].map((a, index) => {
  return { label: `${currentYear - index}` };
});
const validationSchema = Yup.object({
  relationship: Yup.string().required('Required'),
  when_met: Yup.string().required('Required'),
  where_met: Yup.string().required('Required'),
  review: Yup.string().required('Required'),
});

export default function ReviewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box my={2}>
        <Typography variant="subtitle1">
          Please provide a reference for:
        </Typography>
        <Typography variant="subtitle2">{searchParams.get('title')}</Typography>
      </Box>
      <Formik
        initialValues={{
          relationship: '',
          when_met: '',
          where_met: '',
          review: '',
          rating: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          navigate('/');
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
            <SelectField
              sx={{ my: 1 }}
              label="Relationship status*"
              name="relationship"
              value={values.relationship}
              onChange={handleChange}
              errors={errors}
              options={[
                {
                  label: 'Mates',
                },
                {
                  label: 'Friends',
                },
                {
                  label: 'Relatives',
                },
              ]}
            />
            <SelectField
              sx={{ my: 1 }}
              label="When have you met?*"
              name="when_met"
              value={values.when_met}
              onChange={handleChange}
              options={yearDate}
              errors={errors}
            />
            <TextField
              sx={{ my: 1 }}
              label="Where have you met?*"
              name="where_met"
              size="large"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.where_met}
              error={errors.where_met && touched.where_met}
              helperText={
                errors.where_met && touched.where_met ? errors.where_met : null
              }
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              sx={{ my: 1 }}
              label="Review"
              name="review"
              size="large"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.review}
              error={errors.review && touched.review}
              helperText={
                errors.review && touched.review ? errors.review : null
              }
              fullWidth
              multiline
              rows={4}
            />
            <Typography
              component="legend"
              variant="caption"
              ml={2}
              sx={{ opacity: 0.6 }}
            >
              Rating
            </Typography>
            <Rating
              name="rating"
              value={parseInt(values.rating)}
              defaultValue={0}
              max={10}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button
              sx={{ my: 1, width: 1 }}
              variant="contained"
              size="large"
              onClick={handleSubmit}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Hero>
  );
}
