import Hero from '@/shared/components/layout/hero.component';
import { Badge, Stack, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { useState, useEffect } from 'react';
import ApplicationList from './components/application-list.component';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import ChatRow from './components/chat-row.component';

export default function ChatsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const viewedContacts = useSelector(
    (state) => state.applications.viewedContacts,
  );

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
          if (!searchParams.get('colivingID')) {
            navigate('/sign-in');
          }

          return null;
        }
        setToken(token);
        return token;
      } else {
        if (!searchParams.get('colivingID')) {
          navigate('/sign-in');
        }
        return null;
      }
    } else {
      const token = hashString.split('&')[0].split('=')[1];
      console.log(token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('issueTime', Date.now().toString());
      setToken(token);
      return token;
    }
  }

  useEffect(() => {
    getToken();
    return () => {
      localStorage.setItem('viewedContacts', JSON.stringify(viewedContacts));
    };
  }, []);
  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        aria-label=""
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1,
          bgcolor: '#f0eeed',
          // mx: -2,
          '& .Mui-selected': {
            color: '#f0eeed',
            bgcolor: 'primary.main',
          },
          '& .Mui-selected.MuiTab-root': {
            border: 'none',
          },
          '& .MuiTab-root': {
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}
      >
        <Tab
          label={
            <Badge
              badgeContent={0}
              color="primary"
              variant="dot"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              Application Queue
            </Badge>
          }
          id="0"
        />
        <Tab
          label={
            <Badge
              badgeContent={0}
              color="primary"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              sx={{ p: 0.5 }}
            >
              Chats
            </Badge>
          }
          id="1"
        />
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        <ApplicationList token={token} tab="applications" />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <ApplicationList token={token} tab="chats" />
      </TabPanel>
    </Hero>
  );
}

function TabPanel(props: {
  children: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Stack sx={{ pt: 8 }} spacing={1}>
          {children}
        </Stack>
      )}
    </div>
  );
}
