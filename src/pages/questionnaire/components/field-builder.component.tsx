import SelectField from '@/shared/components/form/select.component';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

interface FieldBuilderProps {
  dense?: boolean;
  max?: number | null;
  min?: number | null;
  name?: string;
  onChange: ({ value }: { value: string }) => void;
  options: Array<object> | null;
  title?: string;
  type: string;
  value: string | string[]; // Depending on the type, it could be a single string or an array of strings
  placeholder?: string | null;
}

export default function FieldBuilder(props: FieldBuilderProps) {
  // console.log("FB:", options)
  // console.log(props);
  const { type, value, onChange, title, placeholder, options } = props;
  switch (type) {
    case 'textarea':
      return (
        <TextField
          name="name"
          label={placeholder}
          value={value}
          rows={4}
          onChange={(e) => onChange({ value: e.target.value })}
          onBlur={(e) => onChange({ value: e.target.value })}
          multiline
          fullWidth
        />
      );
    case 'string':
      return (
        <TextField
          name="name"
          label={placeholder}
          value={value}
          onChange={(e) => onChange({ value: e.target.value })}
          fullWidth
        />
      );
    case 'number':
      return <TextField name="name" label="name" value={value} type="number" />;
    case 'checklist':
      return (
        <>
          {title && (
            <Typography variant="subtitle2" color="initial">
              {title}
            </Typography>
          )}
          <CheckList {...props} />
        </>
      );
    case 'radiolist':
      return (
        <>
          {title && (
            <Typography variant="subtitle2" color="initial">
              {title}
            </Typography>
          )}
          <RadioList {...props} />
        </>
      );
    case 'select':
      return (
        <>
          {title && (
            <Typography variant="subtitle2" color="initial">
              {title}
            </Typography>
          )}
          <SelectField
            name="select"
            value={value}
            onChange={(e) => onChange({ value: e.target.value })}
            options={options}
            empty={false}
          />
        </>
      );
    case 'slider':
      return (
        <>
          {title && (
            <Typography variant="subtitle2" color="initial">
              {title}
            </Typography>
          )}
          <Slider
            aria-label="slider"
            value={value}
            name={props.name ? props.name : ''}
            onChange={(e) =>
              onChange({ value: e.target.value, name: e.target.name })
            }
            valueLabelDisplay="auto"
            // marks
            step={1}
            min={props.min}
            max={props.max}
          />
        </>
      );
    default:
      return null;
  }
}

function CheckList({
  value,
  options,
  onChange,
  name = '',
  dense = true,
}: FieldBuilderProps) {
  const handleChange = (event) => {
    const v = event.target.value;
    const index = value.indexOf(v);
    if (index === -1) {
      value = [...value, v];
    } else {
      value.splice(index, 1);
    }
    onChange({ value: value, name: event.target.name });
  };
  return (
    <Grid container spacing={0}>
      {options.map((item) => (
        <Grid item xs={dense ? 6 : 12} key={item.label}>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.includes(item.label)}
                name={name ? name : item.label}
                value={item.label}
                onChange={handleChange}
              />
            }
            label={item.label}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function RadioList({
  value,
  options,
  onChange,
  name = '',
  dense = true,
}: FieldBuilderProps) {
  const isJSON = (value) => {
    try {
      JSON.parse(value);
    } catch (err) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    if (isJSON(e.target.value)) {
      onChange({
        value:
          e.target.value === JSON.stringify(value)
            ? ''
            : JSON.parse(e.target.value),
        name,
      });
    } else {
      onChange({
        value: e.target.value === value ? '' : e.target.value,
        name,
      });
    }
  };
  const handleClick = (e) => {
    if (isJSON(e.target.value)) {
      if (e.target.value === JSON.stringify(value))
        onChange({ value: '', name });
    } else {
      if (e.target.value === value) onChange({ value: '', name });
    }
  };
  return (
    <Grid container spacing={0}>
      {options.map((item) => (
        <Grid item xs={dense ? 6 : 12} key={item.label}>
          <FormControlLabel
            control={
              <Radio
                checked={
                  value === item.label ||
                  JSON.stringify(value) === JSON.stringify(item.value)
                }
                name={name ? name : item.label}
                value={item.value ? JSON.stringify(item.value) : item.label}
                onChange={handleChange}
                onClick={handleClick}
              />
            }
            label={item.label}
          />
        </Grid>
      ))}
    </Grid>
  );
}
