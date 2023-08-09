import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserForm from '../settings/components/user-form.component';
import Hero from '@/shared/components/layout/hero.component';
import { useGetUserProfileAdminQuery } from '@/api/admin.api';
import Loading from '@/shared/components/ui/loading.component';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/modules/auth/auth.slice';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function UserProfileAdminPage() {
  const { userID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector(selectUser);
  const { data, isLoading } = useGetUserProfileAdminQuery(userID);
  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
      }}
    >
      {!isLoading ? (
        <>
          <Typography variant="h6" color="initial" sx={{ mb: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ mr: 1 }}
              onClick={() => navigate(location.state?.redirect_uri ?? '/')}
            >
              Back
            </Button>
            Edit user profile
          </Typography>
          <UserForm
            first_name={data?.first_name}
            last_name={data?.last_name}
            email={data?.email}
            phone_number={data?.phone_number}
            contactDetails={data?.contactDetails}
            emailVerified={!!data?.verified}
            token={token}
            redirect_uri={location.state?.redirect_uri ?? '/'}
            userID={userID}
          />
        </>
      ) : (
        <Loading />
      )}
    </Hero>
  );
}
