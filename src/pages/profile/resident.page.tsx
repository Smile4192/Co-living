import Hero from '@/shared/components/layout/hero.component';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import ResidentForm from './components/resident-form.component copy';

export default function ResidentPage() {
  const location = useLocation();
  return (
    <Hero
      sx={{
        overflowX: { xs: 'hidden', sm: 'unset' },
      }}
    >
      <Typography variant="h6" color="initial" sx={{ mt: 2, mb: 5 }}>
        {Object.keys(location.state.residentProfile).length === 0
          ? 'Create Resident Profile'
          : 'Edit Resident Profile'}
      </Typography>
      <ResidentForm {...location.state} />
    </Hero>
  );
}
