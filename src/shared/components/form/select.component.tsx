import { ListItemIcon, MenuItem, TextField } from '@mui/material';
import React from 'react';

interface Option {
  label: string;
  value?: string | number;
  icon?: React.ReactChild;
}

interface SelectFieldProps {
  defaultValue?: string;
  errors?: { [key: string]: string };
  label?: string;
  name?: string;
  value: string; // Replace 'string' with the appropriate type for the 'value' property
  onChange: (
    event: React.ChangeEvent<{ name: string; value: unknown }>,
  ) => void;
  options: Option[];
  size?: 'small' | 'medium';
  sx?: {
    my?: number;
  };
  empty: boolean;
}

export default function SelectField({
  label = '',
  name = '',
  value,
  options,
  onChange,
  sx = {},
  errors = {},
  size = 'medium',
  defaultValue = '',
  empty = true,
}: SelectFieldProps) {
  return (
    <TextField
      name={name}
      label={label}
      select
      value={value}
      onChange={onChange}
      // onBlur={handleBlur}
      error={!!errors[name]}
      helperText={errors[name] ? errors[name] : null}
      fullWidth
      sx={{
        ...sx,
        '& .MuiSelect-select': {
          display: 'inline-flex',
        },
      }}
      size={size}
      defaultValue={defaultValue}
    >
      {empty && (
        <MenuItem value="">
          <em>Clear</em>
        </MenuItem>
      )}

      {options.map((option) => (
        <MenuItem key={option.label} value={option.value ?? option.label}>
          {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
