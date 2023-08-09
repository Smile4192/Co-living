import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Router from './router';
import useIsUserActive from '@/shared/customHooks/tracker/useIsUserActive.hook';

export interface NodeEnvType {
  nodeEnv?: string;
}

function App({ nodeEnv }: NodeEnvType) {
  console.log('`src/app.tsx` received nodeEnv', nodeEnv);
  const type = useSelector((state: any) => state.theme.type);
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: type,
            background: {
              default: '#f0eeed',
            },
            primary: {
              main: '#ae544f',
            },
            success: {
              main: '#008239',
            },
            info: {
              main: '#0075CD',
            },
            // error: {
            //   main: '#AE544F',
            // },
          },
          components: {
            MuiButton: {
              styleOverrides: {
                root: {
                  borderRadius: '2rem',
                },
              },
            },
            MuiButtonGroup: {
              styleOverrides: {
                root: {
                  borderRadius: '2rem',
                },
              },
            },
          },
        }),
      ),
    [type],
  );

  useIsUserActive({
    isUserActive: true,
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router nodeEnv={nodeEnv} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
