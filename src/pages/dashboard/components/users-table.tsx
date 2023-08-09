import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Data from './user-test-data';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, Fragment, useState } from 'react';
import moment from 'moment-timezone';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const columns: GridColDef<
  {
    _id: string;
    type: string;
    user: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: number;
      residentProfile: {
        social_media: string;
      },
    },
    timeSubmitted: Date;
    status: string;
    coliving: {
      applications: number;
      title: string;
      move_in_date: Date;
      totalTime: number;
    },
    resident: {
      profile: string;
      comments: string;
    },
    // lastName: string;
    // firstName: string;
    // age: number;
  }
  // | {
  //     _id: number;
  //     lastName: string;
  //     firstName: string;
  //     age: null;
  //   }
  // | {
  //     _id: number;
  //     lastName: string;
  //     firstName: null;
  //     age: number;
  //   }
>[] = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'type',
      headerName: 'Type',
      editable: false,
      align: 'center',
      width: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        // console.log(params.api.getRow(params.row._id))
        return params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1;
      },
  },
  {
    field: 'name',
      headerName: 'Name',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      renderCell: (params) => {
        const [open, setOpen] = useState(false);

        const handleTooltipClose = () => {
          setOpen(false);
        };

        const handleTooltipOpen = () => {
          setOpen(true);
        };
        return (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <Fragment>
                  <div>
                    <div style={{ fontSize: 12 }}>
                      Email: {params.row.user.email}
                    </div>
                    <div
                      style={{ fontSize: 12 }}
                      hidden={!params.row.user.phone_number}
                    >
                      Phone Number : {params.row.user.phone_number}
                    </div>
                    <div
                      style={{ fontSize: 12 }}
                      hidden={!params.row.user.residentProfile?.social_media}
                    >
                      Social Media: {params.row.user.residentProfile?.social_media}
                    </div>
                  </div>
                </Fragment>
              }
            >
              <div style={{ fontSize: 15, cursor: "pointer" }} onClick={handleTooltipOpen}>
                {params.row.user.first_name + ' ' + params.row.user.last_name}
              </div>
            </Tooltip>
          </ClickAwayListener>
        );
      },
  },
  {
    field: 'timeSubmitted',
      headerName: 'Joined',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      width: 170,
      valueGetter: (params) => {
        //switched dayjs to moment-timezone since dayjs.tz() function not working.
        return moment(params.row.timeSubmitted)
          .tz('America/Los_Angeles')
          .format('YYYY-MM-DD hh:mm:ss');
      },
  },
  {
    field: 'lastSeen',
      headerName: 'Last seen',
      align: 'center',
      width: 170,
      headerAlign: 'center',
      editable: false,
      valueGetter: (params) => {
        //switched dayjs to moment-timezone since dayjs.tz() function not working.
        return moment(params.row.coliving.move_in_date)
          .tz('America/Los_Angeles')
          .format('YYYY-MM-DD hh:mm:ss');
      },
  },
  {
    field: 'totalLogins',
    headerName: 'Number of logins',
    description: 'Total number of logins',
    editable: false,
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => {
      return params.row.coliving.applications;
    },
  },
  {
    field: 'totalTime',
    headerName: 'Total time, min',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    valueGetter: (params) => {
      return params.row.coliving.totalTime;
    },
  },
  {
    field: 'coliving',
    headerName: 'Co-living name',
    width: 300,
    editable: false,
    align: 'left',
    headerAlign: 'center',
    valueGetter: (params) => {
      return params.row.coliving.title;
    },
  },
  {
    field: 'residentProfile',
    headerName: 'Resident Profile',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    valueGetter: (params) => {
      return params.row.resident.profile;
    },
  },
  {
    field: 'comments',
    headerName: 'Comments',
    align: 'center',
    headerAlign: 'center',
    width: 250,
    editable: false,
    valueGetter: (params) => {
      return params.row.resident.comments;
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    sortable: false,
    renderCell: (params) => {
      const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      return (
        <>
          <Button
            variant="contained"
            // onClick={() => {
            //   deleteApplication(params.row).then((result) =>
            //     console.log(result),
            //   );
            // }}
            onClick={handleClickOpen}
          >
            Delete
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"app2.feliciti.co says"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you gonna delete this user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>Ok</Button>
              <Button onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    },
  },
  {
    field: 'test',
    headerName: 'Next steps',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    editable: false,
    sortable: false,
    renderCell: () => {
      const [status, setStatus] = useState('');
      const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
      };
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={'Active'}>Active</MenuItem>
            <MenuItem value={'To follow up'}>
              To follow up
            </MenuItem>
            <MenuItem value={'To get feedback'}>
              To get feedback
            </MenuItem>
            <MenuItem value={'Not responding'}>
              Not responding
            </MenuItem>
            <MenuItem value={'In active'}>In active</MenuItem>
            {/* <MenuItem value={'Host reviewed'}>Host reviewed</MenuItem>
            <MenuItem value={'Host took ownership'}>
              Host took ownership
            </MenuItem> */}
          </Select>
        </FormControl>
      );
    },
  },
];

export default function UsersTable() {
  return (
    <Box>
      <DataGrid
        rows={Data}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
