import SortRoundedIcon from '@mui/icons-material/SortRounded';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Popover from '@mui/material/Popover';
import { useState } from 'react';

const sortOptions = ['Rating', 'Recent', 'Unread', 'Expiry', 'Status'];

export default function Sort() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sort, setSort] = useState('Status');
  return (
    <Box textAlign={'right'}>
      <Typography variant="caption" component={'span'}>
        Sort by:
      </Typography>

      <Typography variant="button" component={'span'} ml={1}>
        {sort}
      </Typography>
      <IconButton
        aria-label="sort"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <SortRoundedIcon />
      </IconButton>
      <Popover
        id={'simple-popover'}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          {sortOptions.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton onClick={() => setSort(item)}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
}
