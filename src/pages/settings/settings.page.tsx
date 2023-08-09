import { placeholderApi } from '@/api/axios-instance';
import Hero from '@/shared/components/layout/hero.component';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './components/user-form.component';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [userProfile, setUserProfile] = React.useState({});
  const [accessToken, setAccessToken] = React.useState('');
  async function getToken() {
    const token = localStorage.getItem('accessToken');
    const issueTime = localStorage.getItem('issueTime');
    if (token !== null && issueTime !== null) {
      // implement token expiration detection later
      const expirationNotice = parseInt(issueTime) + 14 * 86400000;
      if (Date.now() > expirationNotice) {
        navigate('/sign-in');
        return null;
      }
      return token;
    } else {
      navigate('/sign-in');
      return null;
    }
  }
  async function getUserData() {
    let token;
    try {
      token = await getToken();
      setAccessToken(token);
    } catch (err) {
      console.log(err);
    }
    // const profile = await axios.get("http://localhost:8000/getUserProfile", {
    const profile = await placeholderApi.get('/getUserProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(profile);
    if (!('error' in profile.data)) {
      setUserProfile(profile.data);
    } else {
      navigate('/sign-in');
    }
  }
  React.useEffect(() => {
    getUserData();
  }, []);
  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
      }}
    >
      <Typography variant="h4" component="h2" mb={2}>
        Settings
      </Typography>
      <Stack spacing={1}>
        <UserForm
          email={userProfile.email}
          first_name={userProfile.first_name}
          last_name={userProfile.last_name}
          phone_number={userProfile.phone_number}
          contactDetails={userProfile.contactDetails}
          emailVerified={userProfile.emailVerified}
          token={accessToken}
        />
        <Box sx={{ mt: 10 }}>
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('issueTime');
              logout({ logoutParams: { returnTo: window.location.origin } });
            }}
          >
            Sign out
          </Button>
        </Box>
      </Stack>
    </Hero>
  );
}
