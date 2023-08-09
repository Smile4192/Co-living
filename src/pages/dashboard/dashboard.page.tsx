import Typography from '@mui/material/Typography';
import ApplicationsTable from './components/applications-table';

export default function DashboardPage() {
  return (
    <div style={{ padding: 20 }}>
      <Typography
        variant="h4"
        component="h2"
        color="initial"
        style={{ padding: 3 }}
      >
        Applications List
      </Typography>
      <ApplicationsTable />
    </div>
  );
}
