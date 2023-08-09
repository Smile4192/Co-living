import { placeholderApi } from '@/api/axios-instance';
import {
  setStatus,
  setViewedContacts,
} from '@/store/modules/applications/applications.slice';
import { AlternateEmailRounded, LocalPhoneRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import Image from 'mui-image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

interface ApplicationRowProps {
  _id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  profilePicture?: string;
  unauth?: boolean;
  userID?: string;
  token?: string;
  colivingID?: number;
  timeSubmitted: number | null;
  tab: 'applications' | 'chats';
}

export default function ApplicationRow({
  userID = '',
  first_name = '',
  last_name = '',
  email = '',
  profilePicture = '',
  timeSubmitted = null,
  // questions= [],
  // status= '',
  // notes = '',
  // nextStep= ''
  token = '',
  colivingID = 0,
  tab,
}: ApplicationRowProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const viewedContacts = useSelector(
    (state) => state.applications.viewedContacts,
  );
  return (
    <Paper
      sx={{
        position: 'relative',
        display: 'flex',
        // flexDirection: { xs: 'column', sm: 'row' },
        // alignItems: { xs: 'flex-start', sm: 'center' },
        alignItems: { xs: 'center' },
        overflow: 'hidden',
      }}
    >
      <ButtonBase
        sx={{
          position: 'relative',
          // width: { xs: '100%', sm: 'auto' },
          width: '100%',
          // maxWidth: '80%',
          justifyContent: 'flex-start',
          flex: 1,
        }}
        onClick={() => navigate('/' + userID)}
      >
        <Box sx={{ width: 52, height: 52 }}>
          <Image src={profilePicture} />
        </Box>

        <Box sx={{ textAlign: 'left', pl: 1 }}>
          <Typography
            variant="subtitle2"
            color="initial"
            sx={{ textDecoration: 'underline', fontSize: '0.8rem' }}
          >
            {`${first_name} ${last_name}`}
          </Typography>
        </Box>
      </ButtonBase>
      <Box
        sx={{
          ml: 'auto',
          pt: 1,
          pr: 1,
          height: '35px',
          whiteSpace: 'nowrap',
        }}
      >
        {/* hide until the chats appear. */}
        {tab !== 'chats' && (
          <Button
            variant="contained"
            color="success"
            size="small"
            aria-label="start-chat"
            onClick={async () => {
              if (!token) {
                // redirect to auth0 and transfer ownership
                console.log('not logged in');
                window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${encodeURIComponent(
                  window.location.origin + '/chats',
                )}&scope=openid%20profile%20email&audience=${encodeURIComponent(
                  'https://api.feliciti.co',
                )}&colivingID=${colivingID}&userID=${userID}&transferOwner=true&startChat=true`;
                return;
              }
              console.log(token);
              const result = await placeholderApi.post(
                `/updateApplication/${colivingID}`,
                {
                  userID: userID,
                  status: 'Chat',
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              console.log(result.data);
              if (result.data.success)
                dispatch(setStatus({ colivingID, userID, status: 'Chat' }));
            }}
            sx={{ fontSize: '0.6rem', lineHeight: 1, minWidth: 'auto' }}
          >
            Start
            <br />
            chat
          </Button>
        )}

        {tab === 'chats' && (
          <Button
            variant="contained"
            color={
              viewedContacts[colivingID] && viewedContacts[colivingID][userID]
                ? 'inherit'
                : 'info'
            }
            size="small"
            aria-label="start-chat"
            onClick={() => {
              dispatch(setViewedContacts({ colivingID, userID }));
              setDialogOpen((prev) => !prev);
            }}
            sx={{ fontSize: '0.6rem', lineHeight: 1, ml: 0.5 }}
            disabled={!token}
          >
            Show
            <br />
            contact
          </Button>
        )}

        <Button
          variant="contained"
          color="inherit"
          size="small"
          aria-label="hide"
          onClick={async () => {
            if (!token) {
              // redirect to auth0 and transfer ownership
              console.log('not logged in');
              window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${encodeURIComponent(
                window.location.origin + '/chats',
              )}&scope=openid%20profile%20email&audience=${encodeURIComponent(
                'https://api.feliciti.co',
              )}&colivingID=${colivingID}&userID=${userID}&transferOwner=true&hide=true`;
              return;
            }
            const result = await placeholderApi.post(
              `/updateApplication/${colivingID}`,
              {
                userID: userID,
                status: 'Hidden',
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            console.log(result.data);
            if (result.data.success)
              dispatch(setStatus({ colivingID, userID, status: 'Hidden' }));
          }}
          sx={{
            fontSize: '0.6rem',
            lineHeight: 1,
            minWidth: 'auto',
            ml: 0.5,
            height: '100%',
          }}
        >
          Hide
        </Button>
      </Box>
      {timeSubmitted && (
        <Box
          sx={{
            lineHeight: 1,
            opacity: 0.7,
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: -2,
            right: 0,
            pr: 1,
          }}
        >
          <Typography variant="caption" color="initial" sx={{ fontSize: 10 }}>
            {formatter.format(new Date(timeSubmitted))}
          </Typography>
        </Box>
      )}
      <SimpleDialog
        open={dialogOpen}
        options={{ email }}
        onClose={() => setDialogOpen(false)}
      />
    </Paper>
  );
}

interface SimpleDialogProps {
  options: {
    tel?: string;
    email?: string;
  };
  open: boolean;
  selectedValue?: string;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { open, options, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string = '') => {
    console.log(value);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Contact details</DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.tel && (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(options.tel)}>
              <ListItemIcon>
                <LocalPhoneRounded />
              </ListItemIcon>
              <ListItemText primary={options.tel} />
            </ListItemButton>
          </ListItem>
        )}
        {options.email && (
          <ListItem disableGutters>
            <ListItemButton
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${options.email}`;
              }}
            >
              <ListItemIcon>
                <AlternateEmailRounded />
              </ListItemIcon>
              <ListItemText primary={options.email} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}
