import React from 'react';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Navbar from '@/shared/components/layout/navbar.component';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';

export default function Hero({ children, navbar, sx }) {
  return (
    <Container
      sx={[
        {
          w: 1,
          // overflowX: {xs: 'hidden', sm: 'unset'}, //for sticky sidebar
          paddingBottom: { xs: 'calc(56px + 15px)', sm: '0' },
          // paddingTop: { xs: '0', sm: 'calc(64px + 20px)' },
          minHeight: navbar
            ? { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' }
            : 1,
          maxWidth: '1100px !important',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 8,
          right: -30,
          bgcolor: '#ed6c02',
          color: '#fff',
          transform: 'rotate(45deg)',
          width: 100,
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography variant="subtitle2">Beta</Typography>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={0} sm={2}>
          <Navbar />
        </Grid>
        <Grid item xs={12} sm={10}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

Hero.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
  children: PropTypes.node,
  navbar: PropTypes.bool,
};

Hero.defaultProps = {
  children: null,
  sx: [],
  navbar: false,
};
