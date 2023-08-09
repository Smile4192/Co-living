import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authApi, { useGetUserProfileQuery } from '@/api/auth.api';
import { placeholderApi } from '@/api/axios-instance';
import { useGetColivingByIdQuery } from '@/api/feed.api';
import config from '@/config';
import Hero from '@/shared/components/layout/hero.component';
import Loading from '@/shared/components/ui/loading.component';
import { Button, Grid, Paper } from '@mui/material';
import ActionBtns from './components/action-btns.component';
import ColivingView from './components/coliving-view.component';
import CommonCard from './components/common-card.component';
import Filter from './components/filters.component';
import { useDispatch } from 'react-redux';

export default function SingleFeedPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!Number(id)) navigate('/');

  const dispatch = useDispatch();
  const [followToggle, setFollowToggle] = React.useState(true);
  const redirectUri = encodeURIComponent(window.location.origin);

  const { data, isLoading } = useGetColivingByIdQuery(id);
  const user = useGetUserProfileQuery();
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
          return null;
        }
        return token;
      } else {
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

  React.useEffect(() => {
    setFollowToggle(
      !(user.data?.following && user.data?.following.includes(Number(id))),
    );
    const hashString = window.location.hash;
    const params = hashString.split('&');
    if (params.length < 5) return;
    const state = params[4].split('=')[1];
    if (state.includes('followed')) {
      // show "followed coliving" modal
      const colivingID = state.substring(8);
      console.log('Followed coliving ' + colivingID);
    } else if (state.includes('applied')) {
      // show "applied to coliving" modal
      const colivingID = state.substring(7);
      console.log('Applied to coliving ' + colivingID);
    }
  }, []);

  const onHide = async () => {
    navigate('/');
  };
  const onFollow = async () => {
    // call /followColiving endpoint
    console.log(followToggle);
    const endpoint = followToggle ? 'follow' : 'unfollow';
    const token = await getToken();
    if (token === null) {
      // user isn't logged in
      window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${redirectUri}&scope=openid%20profile%20email&audience=${encodeURIComponent(
        config.apiUrl,
      )}&colivingID=${id}&state=followed${id}`;
      return;
    }
    const result = await placeholderApi.get(`/${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);
    const curr = followToggle;
    setFollowToggle(!curr);
    //clear cache rtk query
    dispatch(authApi.util.invalidateTags([{ type: 'Auth', id: 'PROFILE' }]));
  };
  const onApply = () => {
    navigate(`/co-living/${id}/questionnaire`);
  };
  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 6, sm: 0 },
        px: 1.4,
      }}
    >
      <span id="top"></span>
      <Paper
        sx={{
          display: { xs: 'none', sm: 'flex' },
          position: { xs: 'fixed', sm: 'sticky' },
          top: 0,
          left: 0,
          zIndex: 10,
          py: 0.6,
          pl: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 0.5,
          width: '66.666667%',
          bgcolor: '#fff',
          // maxWidth: 911,
        }}
      >
        {/* Cooming soon */}
        {/* <Button variant="contained" disabled>
          Back
        </Button> */}
        <Button
          variant="contained"
          onClick={onHide}
          sx={{
            bgcolor: '#000',
            color: '#fff',
            '&:hover': {
              bgcolor: '#232323',
            },
          }}
        >
          Show next listing
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor:
              (user.data?.following &&
                user.data?.following.includes(Number(id))) ||
              !followToggle
                ? '#173a54'
                : '#32678F',
            color: '#fff',
            '&:hover': {
              bgcolor: '#295779',
            },
          }}
          onClick={onFollow}
        >
          {(user.data?.following &&
            user.data?.following.includes(Number(id))) ||
          !followToggle
            ? 'Unsave'
            : 'Save'}
        </Button>
        <Button
          variant="contained"
          onClick={onApply}
          color={
            user.data?.applications &&
            user.data?.applications.includes(Number(id))
              ? 'success'
              : 'primary'
          }
        >
          {user.data?.applications &&
          user.data?.applications.includes(Number(id))
            ? 'Applied'
            : 'Apply'}
        </Button>
      </Paper>
      <Filter />
      {isLoading ? (
        <Loading />
      ) : (
        <Grid
          container
          spacing={1}
          sx={{
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          <Grid item xs={12} sm={8} pb={10}>
            <ColivingView data={data.coliving} type={'colivings'} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CommonCard
              data={data.coliving}
              onHide={onHide}
              onFollow={onFollow}
              onApply={onApply}
              type={'colivings'}
              followToggle={followToggle}
            />
          </Grid>
        </Grid>
      )}
      {/* for Mobile show buttons */}
      <ActionBtns
        onHide={onHide}
        onFollow={onFollow}
        onApply={onApply}
        type={'colivings'}
        followToggle={followToggle}
        applied={
          user.data?.applications &&
          user.data?.applications.includes(Number(id))
        }
        saved={
          user.data?.following && user.data?.following.includes(Number(id))
        }
      />
    </Hero>
  );
}
