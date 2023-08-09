import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormikContext } from 'formik';

type Errors = {
  name?: string;
} & Record<string, unknown>;

interface CheckboxOption {
  label: string;
  value?: string; // Optional value property if needed
}

interface CheckboxMultipleFieldProps {
  dense?: boolean;
  errors?: Errors;
  label?: string;
  name: string;
  options: CheckboxOption[];
  values: string[]; // Assuming 'values' is an array of strings
}

export default function CheckboxMultipleField({
  name,
  label = '',
  values,
  options,
  errors = {},
  dense = true,
}: CheckboxMultipleFieldProps) {
  const formikContext = useFormikContext();
  const handleChange = (v) => {
    const index = values.indexOf(v);
    if (index === -1) {
      values.push(v);
    } else {
      values.splice(index, 1);
    }
    console.log(values);
    formikContext.setFieldValue(name, values);
  };
  return (
    <Box>
      <Typography
        variant="subtitle1"
        color={errors[name] ? 'error' : 'initial'}
      >
        {label}
      </Typography>
      {errors[name] && (
        <Typography
          variant="caption"
          color="error"
          component="span"
          ml={'14px'}
        >
          {errors[name]}
        </Typography>
      )}
      <Grid container spacing={dense ? 0 : 2}>
        {options.map((o) => (
          <Grid item xs={dense ? 6 : 12} key={o.label}>
            <FormControlLabel
              label={o.label}
              control={
                <Checkbox
                  name={name}
                  // value={o.value}
                  // checked={values.includes(o.value)}
                  // onChange={() => handleChange(o.value)}
                  value={o.label}
                  checked={values.includes(o.label)}
                  onChange={() => handleChange(o.label)}
                  color="primary"
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
