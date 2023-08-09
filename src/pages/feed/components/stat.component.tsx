import { Box, Typography } from '@mui/material';

export default function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        opacity: 0.5,
      }}
    >
      <Typography
        variant="caption"
        color="initial"
        component="span"
        sx={{
          lineHeight: 1,
        }}
      >
        {label}:
      </Typography>
      <Typography
        variant="outliner"
        color="initial"
        component="span"
        sx={{
          lineHeight: 1,
          ml: 0.5,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
