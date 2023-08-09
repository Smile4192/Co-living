import SelectField from '@/shared/components/form/select.component';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SegmentRoundedIcon from '@mui/icons-material/SegmentRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';
import {
  Autocomplete,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// @TODO: Define what these types should actually be.
interface QuestionsBuilderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: React.Dispatch<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export default function QuestionsBuilder(props: QuestionsBuilderProps) {
  const { value, onChange } = props;
  console.log(value);

  const addCustomQuestions = (created) => {
    switch (created.type) {
      case 'checklist' || 'radiolist':
        // created.options = created.options.map((option) => ({ label: option }));
        created = { ...created, initialValue: [] };
        break;
      case 'slider':
        created = { ...created, initialValue: 0 };
        break;
      default:
        created = { ...created, initialValue: '' };
    }
    onChange([...value, created]);
  };
  const removeCustomQuestions = (idx) => {
    const temp = [...value];
    temp.splice(idx, 1);
    onChange(temp);
  };

  const validationSchema = Yup.object({
    label: Yup.string().required('Required'),
    type: Yup.mixed()
      .oneOf(['textarea', 'checklist', 'radiolist', 'slider'])
      .required('Required'),
    options: Yup.array().min(2, 'Minimum 2 optinon').nullable(),
    min: Yup.number().nullable(),
    max: Yup.number().nullable(),
  });

  return (
    <>
      <List dense>
        {value.map((item, idx) => (
          <ListItem
            key={item.label}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  removeCustomQuestions(idx);
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <CheckRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={item.label} secondary={item.type} />
          </ListItem>
        ))}
      </List>
      <Formik
        enableReinitialize
        initialValues={{
          label: '',
          type: 'textarea',
          options: null,
          min: null,
          max: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          addCustomQuestions(values);
          console.log(values);
          resetForm();
        }}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
          <Form>
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="initial">
                Did we miss anythings? Add custom questions:
              </Typography>
              <TextField
                name="label"
                label="Question text"
                value={values.label}
                onChange={handleChange}
                error={errors.label && true}
                helperText={errors.label ? errors.label : null}
                fullWidth
              />
              <SelectField
                label="Select the type"
                name="type"
                value={values.type}
                defaultValue="textarea"
                options={[
                  {
                    label: 'Paragraph',
                    value: 'textarea',
                    icon: <SegmentRoundedIcon />,
                  },
                  {
                    label: 'Checkboxes',
                    value: 'checklist',
                    icon: <TaskAltRoundedIcon />,
                  },
                  {
                    label: 'One choice',
                    value: 'radiolist',
                    icon: <RadioButtonCheckedRoundedIcon />,
                  },
                  {
                    label: 'Slider',
                    value: 'slider',
                    icon: <LinearScaleRoundedIcon />,
                  },
                ]}
                errors={errors}
                onChange={(e) => {
                  if (
                    e.target.value === 'checklist' ||
                    e.target.value === 'radiolist'
                  ) {
                    setFieldValue('options', []);
                    setFieldValue('min', null);
                    setFieldValue('max', null);
                  } else if (e.target.value === 'slider') {
                    setFieldValue('min', 0);
                    setFieldValue('max', 0);
                    setFieldValue('options', null);
                  } else {
                    setFieldValue('options', null);
                  }
                  handleChange(e);
                }}
              />
              {(values.type === 'checklist' || values.type === 'radiolist') && (
                <>
                  <Autocomplete
                    value={values.options}
                    multiple
                    id="tags-filled"
                    options={values.options.map((option) => option.label)}
                    // defaultValue={}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip
                          key={option.label}
                          variant="outlined"
                          label={option.label}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Possible answer options"
                        placeholder="add"
                        error={!!errors.options}
                        helperText={errors.options ? errors.options : null}
                      />
                    )}
                    onChange={(event, newValue) => {
                      setFieldValue(
                        'options',
                        newValue.map((item) => {
                          if (typeof item === 'string') return { label: item };
                          return item;
                        }),
                      );
                    }}
                  />
                </>
              )}

              {values.type === 'slider' && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <TextField
                    type="number"
                    name="min"
                    label="Minimum"
                    value={values.min}
                    onChange={handleChange}
                    error={errors.min && true}
                    helperText={errors.min ? errors.min : null}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    type="number"
                    name="max"
                    label="Maximum"
                    value={values.max}
                    onChange={handleChange}
                    error={errors.max && true}
                    helperText={errors.max ? errors.max : null}
                    fullWidth
                    size="small"
                  />
                </Stack>
              )}
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add questions
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
