import AuthSocial from '@/shared/components/form/auth-social';
import Hero from '@/shared/components/layout/hero.component';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import SignInForm from './components/sign-in-form.component';

export default function SignInPage() {
  const [searchParams] = useSearchParams();
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
      {searchParams.get('redirect') && (
        <Box my={2} textAlign="left" sx={{ alignSelf: 'start' }}>
          <Typography variant="subtitle1">
            Please provide a reference for:
          </Typography>
          <Typography variant="subtitle2">
            {searchParams.get('title')}
          </Typography>
        </Box>
      )}

      <Typography
        variant="h3"
        component="h1"
        sx={{ color: 'primary.main', mt: 5 }}
      >
        Sign in
      </Typography>
      <Box sx={{ mt: 2, maxWidth: { sm: '350px' } }}>
        <AuthSocial />
        <Divider sx={{ mt: 2 }}>OR</Divider>
      </Box>
      <Box sx={{ my: 2, maxWidth: { sm: '350px' } }}>
        <SignInForm />
      </Box>
      <Typography variant="body1">
        Don&apos;t have an account?{' '}
        <Link to="/sign-up" component={RouterLink}>
          Sign up
        </Link>
      </Typography>
    </Hero>
  );
}
