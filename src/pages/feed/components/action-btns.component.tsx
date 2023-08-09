import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
type ActionBtnsProps = {
  onHide: () => void;
  onFollow: () => void;
  onApply: () => void;
  followToggle: boolean;
  type: 'colivings' | 'residents';
  applied?: boolean;
  saved?: boolean;
};
export default function ActionBtns({
  onHide,
  onFollow,
  onApply,
  followToggle,
  type = 'colivings',
  applied,
}: ActionBtnsProps) {
  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        justifyContent: 'space-around',
        flexDirection: { xs: 'row', sm: 'column' },
        gap: 1,
        // position: sidebar ? 'static' : 'fixed',
        position: 'fixed',
        bottom: { xs: 65, sm: 30 },
        left: 0,
        width: '100%',
        zIndex: 100,
      }}
    >
      <Fab
        aria-label="hide"
        variant="extended"
        sx={
          {
            // color: '#fff',
            // bgcolor:"#8B6260"
          }
        }
        onClick={onHide}
      >
        Next
      </Fab>
      <Fab
        aria-label="follow"
        variant="extended"
        sx={{
          color: '#fff',
          bgcolor: '#32678F',
          '&:hover': {
            bgcolor: '#1d3e57',
          },
        }}
        onClick={onFollow}
      >
        {followToggle ? 'Save' : 'Unsave'}
      </Fab>
      <Fab
        aria-label="apply"
        variant="extended"
        color={applied ? 'success' : 'primary'}
        // sx={{
        //   color: '#fff',
        //   bgcolor:"#2D6847"
        // }}
        onClick={onApply}
      >
        {type === 'colivings' ? (applied ? 'Applied' : 'Apply') : 'Invite'}
      </Fab>
    </Box>
  );
}
