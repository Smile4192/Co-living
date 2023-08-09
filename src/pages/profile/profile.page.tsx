import { placeholderApi } from '@/api/axios-instance';
import Hero from '@/shared/components/layout/hero.component';
import Avatar from '@/shared/components/ui/avatar.component';
import { selectUser } from '@/store/modules/auth/auth.slice';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Button, Card, CardHeader, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MiniProfileItem from './components/mini-profile-item';

export default function ProfilePage() {
  const navigate = useNavigate();
  const userData = useSelector(selectUser);
  const [userProfile, setUserProfile] = useState({});
  const [userColivings, setUserColivings] = useState([]);
  const [residentPic, setResidentPic] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  async function getToken() {
    const hashString = window.location.hash;
    console.log(hashString);
    if (hashString === '') {
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
    } else {
      const token = hashString.split('&')[0].split('=')[1];
      console.log(token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('issueTime', Date.now().toString());
      return token;
    }
  }
  async function getUserData() {
    let token;
    try {
      token = await getToken();
    } catch (err) {
      console.log(err);
    }
    console.log(token);
    setAccessToken(token);
    // const profile = await axios.get("http://localhost:8000/getUserProfile", {
    const profile = await placeholderApi.get('/getUserProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(profile);
    if (!('error' in profile.data)) {
      setUserProfile(profile.data);
      if (
        'residentProfile' in profile.data &&
        'pictures' in profile.data.residentProfile
      ) {
        if (profile.data.residentProfile.pictures.length > 0)
          setResidentPic(profile.data.residentProfile.pictures[0]);
      }
    } else {
      navigate('/sign-in');
    }
    await placeholderApi
      .get('/getColivingListings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        if (!('error' in result.data)) {
          setUserColivings([...result.data.colivings]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {userData.token ? <></> : <></>}
      <Typography variant="h6" component="h2" sx={{ mt: 5 }}>
        Welcome to Feliciti!
      </Typography>
      <Card variant="outlined">
        <CardHeader
          avatar={<Avatar image={userProfile.profilePicture} />}
          action={
            <IconButton
              aria-label=""
              onClick={() => {
                navigate('/profile/settings');
              }}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          }
          title={userProfile.first_name || ''}
          subheader="Account management"
        />
      </Card>
      <Typography variant="h6" component="h2" sx={{ mt: 5 }}>
        Your Resident profile
        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={() =>
            navigate('/profile/resident/add', {
              state: {
                residentProfile: {},
                accessToken: accessToken,
              },
            })
          }
          sx={{
            display: 'residentProfile' in userProfile ? 'none' : 'block',
            float: 'right',
          }}
        >
          Create
        </Button>
      </Typography>

      <Box sx={{ my: 2 }}>
        {'residentProfile' in userProfile ? (
          <MiniProfileItem
            item={{
              id: userProfile.residentProfile._id ?? '',
              title:
                'residentProfile' in userProfile
                  ? userProfile.first_name + ' ' + userProfile.last_name
                  : '',
              // @TODO: Add a type for residentPic.
              image: residentPic !== null ? residentPic : '',
            }}
            onClick={() =>
              navigate('/profile/resident/add', {
                state: {
                  residentProfile: userProfile.residentProfile,
                  accessToken: accessToken,
                },
              })
            }
          />
        ) : (
          <Typography variant="caption" color="initial">
            Empty
          </Typography>
        )}
      </Box>
      <Typography variant="h6" component="h2" sx={{ mt: 5 }}>
        Your Co-living Listings
        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={() =>
            navigate('/profile/co-living/add', {
              state: { accessToken: accessToken },
            })
          }
          sx={{
            float: 'right',
          }}
        >
          Create
        </Button>
      </Typography>
      <Stack spacing={1} sx={{ my: 2 }}>
        {userColivings.length > 0 ? (
          <>
            {userColivings.map((coliving: object, key: number) => {
              return (
                <MiniProfileItem
                  key={key}
                  item={{
                    id: coliving._id,
                    title: coliving.title,
                    image: coliving?.coliving_pictures[0],
                  }}
                  onClick={() => {
                    navigate('/profile/co-living/add', {
                      state: {
                        colivingData: coliving,
                        accessToken: accessToken,
                      },
                    });
                  }}
                />
              );
            })}
          </>
        ) : (
          <Typography variant="caption" color="initial">
            Empty
          </Typography>
        )}
      </Stack>
    </Hero>
  );
}
