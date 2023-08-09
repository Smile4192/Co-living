import AuthSocial from '@/shared/components/form/auth-social';
import Hero from '@/shared/components/layout/hero.component';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import SignUpForm from './components/sign-up-form.component';

export default function SignUpPage() {
  return (
    <Hero
      navbar
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: 'primary.main', mt: 5 }}
      >
        Sign up
      </Typography>
      <Box sx={{ mt: 2, maxWidth: { sm: '350px' } }}>
        <AuthSocial />
        <Divider sx={{ mt: 2 }}>OR</Divider>
      </Box>
      <Box sx={{ my: 2, maxWidth: { sm: '350px' } }}>
        <SignUpForm />
      </Box>
      <Typography variant="body1">
        Already have an account?{' '}
        <Link to="/sign-in" component={RouterLink}>
          Sign in
        </Link>
      </Typography>
    </Hero>
  );
}
