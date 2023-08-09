import { useGetUserProfileQuery } from '@/api/auth.api';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { Badge, Box, Paper, Stack, SvgIcon, Tab, Tabs } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../ui/avatar.component';
import Filter from '@/pages/feed/components/filters.component';

function LogoIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11.3687 7.27534C9.95185 5.79628 7.59604 5.77097 6.14776 7.21925L2.61132e-05 13.367V13.367C1.47877 14.8123 3.84519 14.7988 5.30734 13.3367L5.77478 12.8692C7.43832 11.2057 10.1354 11.2057 11.799 12.8692L12.2293 13.2995C13.6552 14.7254 15.967 14.7254 17.3929 13.2995V13.2995L11.3687 7.27534V7.27534Z" />
      <path d="M11.4438 6.97516C11.4438 6.97516 12.3296 6.12068 12.9785 5.47179C13.953 4.49724 15.5331 4.49724 16.5077 5.47179L18.8725 7.83664C20.2784 9.24256 22.5579 9.24256 23.9638 7.83664L23.9999 7.80048L17.2018 1.04622C15.7946 -0.351943 13.5215 -0.348264 12.1188 1.05444L6.26868 6.90457C7.67138 5.50187 10.0366 5.577 11.4438 6.97516Z" />
    </SvgIcon>
  );
}

interface NavLinkProps {
  active: boolean;
  icon: React.ReactNode;
  label: string | React.ReactElement;
  onClick: () => void;
}

function NavLink(props: NavLinkProps) {
  return (
    <Stack
      component={'a'}
      spacing={1}
      direction={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      sx={{
        cursor: 'pointer',
        color: props.active ? 'primary.main' : 'initial',
      }}
      onClick={props.onClick}
    >
      {props.icon}
      <Typography variant="button">{props.label}</Typography>
    </Stack>
  );
}

function LinkTab(props: { href: string }) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        navigate(props.href);
      }}
      {...props}
    />
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const fetchUser = useGetUserProfileQuery();
  const [tab, setTab] = React.useState('feed');
  const userProfile = useGetUserProfileQuery();
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  React.useEffect(() => {
    //  console.log(location.pathname)
    if (location.pathname.includes('follows')) {
      setTab('follows');
    } else if (location.pathname.includes('chats')) {
      setTab('chats');
    } else if (location.pathname.includes('profile')) {
      setTab('profile');
    } else {
      setTab('feed');
    }
  }, []);
  return (
    <>
      <Stack
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'sticky',
          // top: 84,
          top: 0,
        }}
        spacing={1}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          <LogoIcon
            sx={{ color: 'primary.main', fontSize: 80, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        </Box>
        <NavLink
          label={
            'Feed'
            //TODO while we fix the residents
            // tab === 'feed' && !searchParams.get('residents') ? (
            //   'Switch to residents'
            // ) : (
            //   <Typography variant="button">
            //     Switch to co&#8209;livings
            //   </Typography>
            // )
          }
          icon={<LogoIcon />}
          active={tab === 'feed'}
          onClick={() => {
            //TODO while we fix the residents
            // if (tab === 'feed' && !searchParams.get('residents')) {
            //   navigate('/?residents=true');
            //   return;
            // }
            navigate('/');
          }}
        />
        <NavLink
          label={`Saved ${
            userProfile.data?.following
              ? `(${userProfile.data?.following.length ?? 0})`
              : ''
          }`}
          icon={<StarBorderRoundedIcon />}
          active={tab === 'follows'}
          onClick={() => navigate('/follows')}
        />
        <NavLink
          label="Inbox"
          icon={<ChatBubbleOutlineRoundedIcon />}
          active={tab === 'chats'}
          onClick={() => navigate('/chats')}
        />
        <NavLink
          label="Profile"
          icon={<PersonOutlineRoundedIcon />}
          active={tab === 'profile'}
          onClick={() => navigate('/profile')}
        />
        {tab === 'feed' && <Filter sidebar />}
      </Stack>
      <Paper
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          // top: { xs: 'auto', sm: 0 },
          left: 0,
          right: 0,
          zIndex: 10,
          height: { xs: '56px', sm: '64px' },
        }}
        elevation={3}
      >
        <BottomNavigation
          // showLabels
          value={location.pathname}
          onChange={(event, newValue) => {
            // TODO until we fix the residents
            // if (
            //   location.pathname === '/' &&
            //   newValue === '/' &&
            //   !searchParams.get('residents')
            // ) {
            //   navigate('/?residents=true');
            //   return;
            // }
            navigate(newValue);
          }}
          sx={{
            height: { xs: '56px', sm: '64px' },
            display: { xs: 'visible', sm: 'none' },
          }}
        >
          {/*TODO until we fix the residents */}
          <BottomNavigationAction
            label={'Feed'}
            value={'/'}
            icon={<LogoIcon sx={{ mb: -1 }} />}
          />
          {/* <BottomNavigationAction
            label={
              searchParams.get('residents') ? (
                <Typography variant="caption" sx={{ lineHeight: 0.7 }}>
                  Switch to co-livings
                </Typography>
              ) : (
                <Typography variant="caption" sx={{ lineHeight: 0.7 }}>
                  Switch to residents
                </Typography>
              )
            }
            value={'/'}
            icon={<LogoIcon sx={{ mb: -1 }} />}
          /> */}
          <BottomNavigationAction
            label="Saved"
            value={'/follows'}
            icon={
              <Badge
                color="primary"
                variant="standard"
                badgeContent={
                  userProfile.data?.following
                    ? userProfile.data?.following.length
                    : 0
                }
              >
                <StarBorderRoundedIcon />
              </Badge>
            }
          />
          <BottomNavigationAction
            label="Inbox"
            value={'/chats'}
            icon={
              <Badge
                color="primary"
                variant="dot"
                //DEMO
                invisible={location.pathname === '/chats'}
              >
                <ChatBubbleOutlineRoundedIcon />
              </Badge>
            }
          />
          <BottomNavigationAction
            label="Profile"
            //temporary change for testing
            value={'/profile'}
            icon={
              <Avatar
                image={fetchUser.data?.profilePicture}
                sx={{ height: 32, width: 32 }}
              />
            }
          />
        </BottomNavigation>

        <LogoIcon
          sx={{
            float: 'left',
            m: 1,
            height: '100%',
            width: 'auto',
            color: 'primary.main',
          }}
          onClick={() => {
            setTab('feed');
            navigate('/');
          }}
        />

        <Tabs
          value={tab}
          onChange={handleChange}
          sx={{
            height: '100%',
            display: { xs: 'none', sm: 'flex' },
            '& .MuiTabs-flexContainer': { justifyContent: 'flex-end' },
          }}
        >
          <LinkTab label="Feed" href="/" value="feed" />
          <LinkTab label="Follows" href="/follows" value="follows" />
          <LinkTab label="Inbox" href="/chats" value="chats" />
          <LinkTab
            label={user?.first_name ? user.first_name : 'Profile'}
            href="/profile"
            value="profile"
            icon={<Avatar image={''} sx={{ ml: 1 }} />}
            iconPosition="end"
          />
        </Tabs>
      </Paper>
    </>
  );
}
