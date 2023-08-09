import React from 'react';
import { Box, Slider, Typography } from '@mui/material';

export default function SliderField({
  label = '',
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number | number[] | object;
  onChange: (e: object) => void;
  min: number;
  max: number;
}) {
  const marks = React.useMemo(() => {
    const result = [];
    for (let i = min; i <= max; i++) {
      result.push({ value: i, label: '' + i });
    }
    return result;
  }, [min, max]);

  return (
    <Box>
      {label && <Typography>{label}</Typography>}

      <Slider
        // getAriaLabel={() => 'Temperature range'}
        value={[value.min, value.max]}
        onChange={onChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        min={min}
        max={max}
        marks={marks}
      />
    </Box>
  );
}
