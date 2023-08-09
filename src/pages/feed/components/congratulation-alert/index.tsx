import React from 'react';
import { Box, Paper, Zoom, Typography } from '@mui/material';
import './check-mark-animation.css';
import { useSearchParams } from 'react-router-dom';

export default function CongratulationAlert() {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = React.useState(searchParams.get('applied'));
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  if (!open) return <></>;
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 1051,
        bgcolor: 'rgba(0,0,0,0.5)',
        p: 2,
      }}
      onClick={handleClick}
    >
      <Zoom in={open}>
        <Paper
          elevation={1}
          sx={{
            textAlign: 'center',
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" color="initial">
            Congratulations!
          </Typography>
          <Box>
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </Box>
          <Typography variant="body2" color="initial">
            We've saved your responses for future applications.
            <br />
            Explore other listings now!
          </Typography>
        </Paper>
      </Zoom>
    </Box>
  );
}
