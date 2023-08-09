import { placeholderApi } from '@/api/axios-instance';
import Hero from '@/shared/components/layout/hero.component';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const loadingData = [{ id: '1', pic: '', title: 'Loading Listings. . . ' }];

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [listings, setListings] = React.useState(loadingData);
  async function getToken() {
    const token = localStorage.getItem('accessToken');
    const issueTime = localStorage.getItem('issueTime');
    if (token !== null && issueTime !== null) {
      // implement token expiration detection later
      const expirationNotice = parseInt(issueTime) + 14 * 86400000;
      if (Date.now() > expirationNotice) {
        return null;
      }
      return token;
    } else {
      return null;
    }
  }
  async function getFavorites() {
    const token = await getToken();
    if (token === null) {
      navigate('/sign-in');
      return;
    }
    console.log(token);
    const result = await placeholderApi.post(
      '/getFeed/colivings/following',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(result);
    setListings(result.data.colivings);
  }
  React.useEffect(() => {
    getFavorites();
  }, []);
  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 1,
      }}
    >
      <Grid container>
        <Grid item xs={10}>
          {' '}
          <Typography
            variant="subtitle2"
            component="h2"
            // textAlign="center"
          >
            Followed listings:
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton aria-label="filter">
            <SortRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>

      {listings.map((item) => (
        <Paper variant="elevation" key={item.id} sx={{ my: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Image src={item.pic} />
            </Grid>
            <Grid item xs={10} p={1}>
              <Typography variant="h6" component="p">
                {item.title}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Hero>
  );
}
