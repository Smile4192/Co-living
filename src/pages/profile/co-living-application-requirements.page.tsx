import Hero from '@/shared/components/layout/hero.component';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import CoLivingApplicationRequirementsForm from './components/co-living-application-requirements-form.component';

export default function CoLivingApplicationRequirementsPage() {
  const location = useLocation();
  return (
    <Hero sx={{ py: 10 }}>
      <Typography variant="h6" component="p">
        Choose the questions you want the applicant to answer.
      </Typography>
      <CoLivingApplicationRequirementsForm {...location.state} />
    </Hero>
  );
}
