import authApi, { useGetUserProfileQuery } from '@/api/auth.api';
import { placeholderApi } from '@/api/axios-instance';
import Hero from '@/shared/components/layout/hero.component';
import Loading from '@/shared/components/ui/loading.component';
import { Button, Fab, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ActionBtns from './components/action-btns.component';
import ColivingView from './components/coliving-view.component';
import CommonCard from './components/common-card.component';
import Filter from './components/filters.component';
import useFeedController from '@/shared/customHooks/feed/useFeedController.hook';
import ProtectedContent from '@/shared/components/ui/protected-content.component';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { selectUser } from '@/store/modules/auth/auth.slice';
import { reLoadItem } from '@/store/modules/feed/feed.slice';
import CongratulationAlert from './components/congratulation-alert';

export default function FeedPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [followToggle, setFollowToggle] = useState(true);
  const redirectUri = encodeURIComponent(window.location.origin);
  const { currentFeed, nextId } = useFeedController({ id });

  const type = useSelector((state) => state.feed.type);

  const user = useGetUserProfileQuery();

  const onHide = async () => {
    // call /hideColiving endpoint
    let endpoint = '/hide/coliving';
    if (searchParams.get('residents')) endpoint = '/hide/resident';
    const result = await placeholderApi.get(`${endpoint}/${currentFeed._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);
    navigate('/' + nextId);
    document
      .getElementById('top')
      .scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  const onFollow = async () => {
    // call /followColiving endpoint
    const endpoint = followToggle ? 'follow' : 'unfollow';
    if (token === null) {
      // user isn't logged in
      window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${redirectUri}&scope=openid%20profile%20email&audience=${encodeURIComponent(
        'https://api.feliciti.co',
      )}&colivingID=${currentFeed._id}&state=followed${currentFeed._id}`;
      return;
    }
    const result = await placeholderApi.get(`/${endpoint}/${currentFeed._id}`, {
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
    if (
      user.data?.applications &&
      user.data?.applications.includes(currentFeed?._id)
    )
      return;
    navigate(`/co-living/${currentFeed._id}/questionnaire`);
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
      <CongratulationAlert />
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
          width: '58.333333%',
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
                user.data?.following.includes(currentFeed?._id)) ||
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
            user.data?.following.includes(currentFeed?._id)) ||
          !followToggle
            ? 'Unsave'
            : 'Save'}
        </Button>
        <Button
          variant="contained"
          onClick={onApply}
          color={
            user.data?.applications &&
            user.data?.applications.includes(currentFeed?._id)
              ? 'success'
              : 'primary'
          }
        >
          {user.data?.applications &&
          user.data?.applications.includes(currentFeed?._id)
            ? 'Applied'
            : 'Apply'}
        </Button>
      </Paper>
      <Filter />
      {!currentFeed ? (
        <Loading />
      ) : (
        <Grid
          container
          spacing={1}
          sx={{
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          <Grid item xs={12} sm={7} pb={10}>
            <ColivingView data={currentFeed} type={type} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <CommonCard
              data={currentFeed}
              onHide={onHide}
              onFollow={onFollow}
              onApply={onApply}
              type={type}
              followToggle={followToggle}
            />
            <ProtectedContent>
              <Fab
                color="secondary"
                aria-label="edit"
                sx={{
                  position: { xs: 'fixed', sm: 'sticky' },
                  top: '50%',
                  right: 0,
                }}
                onClick={() => {
                  dispatch(reLoadItem({ id }));
                  navigate('/profile/co-living/add', {
                    state: {
                      colivingData: currentFeed,
                      accessToken: token,
                      admin: true,
                    },
                  });
                }}
              >
                <EditRoundedIcon />
              </Fab>
            </ProtectedContent>
          </Grid>
        </Grid>
      )}
      {/* for Mobile show buttons */}
      <ActionBtns
        onHide={onHide}
        onFollow={onFollow}
        onApply={onApply}
        type={type}
        followToggle={followToggle}
        applied={
          user.data?.applications &&
          user.data?.applications.includes(currentFeed?._id)
        }
      />
    </Hero>
  );
}
