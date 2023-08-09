import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Stack } from '@mui/material';
import Fab from '@mui/material/Fab';

export default function AuthSocial() {
  return (
    <Stack direction="row" spacing={2}>
      <a href="https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&connection=google-oauth2&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F">
        <Fab color="inherit" aria-label="add">
          <img
            style={{ height: '50%' }}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </Fab>
      </a>
      <a href="https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&connection=twitter&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F">
        <Fab
          color="inherit"
          sx={{
            color: '#fff',
            bgcolor: '#00acee',
            '&:hover': { bgcolor: '#008abe' },
          }}
        >
          <TwitterIcon />
        </Fab>
      </a>
      <a href="https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&connection=facebook&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F">
        <Fab
          color="inherit"
          sx={{
            color: '#fff',
            bgcolor: '#3b5998',
            '&:hover': { bgcolor: '#2f477a' },
          }}
        >
          <FacebookIcon />
        </Fab>
      </a>
    </Stack>
  );
}
