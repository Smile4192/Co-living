import React from 'react';
import Hero from '@/shared/components/layout/hero.component';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import CoLivingForm from './components/co-living-form.component';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useDeleteColivingByIdMutation } from '@/api/feed.api';

export default function CoLivingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [deleteColivingById, { isLoading, isSuccess }] =
    useDeleteColivingByIdMutation();
  const handleClose = () => {
    setOpen(false);
  };
  console.log(location.state);
  const handleApproval = () => {
    deleteColivingById({ id: location.state.colivingData._id });
    setOpen(false);
  };
  React.useEffect(() => {
    if (isSuccess) {
      if (location.state.admin) {
        navigate('/');
      } else {
        navigate('/profile');
      }
    }
  }, [isLoading]);
  return (
    <Hero
      sx={{
        overflowX: { xs: 'hidden', sm: 'unset' },
      }}
    >
      <Typography variant="h6" color="initial" sx={{ mt: 2, mb: 5 }}>
        {location.state && location.state.colivingData
          ? 'Edit co-living listing'
          : 'Add new co-living listing'}
        {location.state && location.state.admin ? '(Admin mode)' : ''}
        {location.state && location.state.colivingData && (
          <Button
            variant="outlined"
            color="error"
            sx={{ float: 'right' }}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure you want to delete?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleApproval}
              autoFocus
              color="error"
              variant="outlined"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Typography>
      <CoLivingForm {...location.state} />
    </Hero>
  );
}
