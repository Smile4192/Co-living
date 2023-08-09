import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import {
  useDeleteApplicationMutation,
  useGetAllApplicationsQuery,
  useUpdateApplicationMutation,
} from '@/api/applications.api';
import { useEffect, Fragment, useState } from 'react';
import moment from 'moment-timezone';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function ApplicationsTable() {
  //fetching all applications hook
  const { data, isLoading } = useGetAllApplicationsQuery('');
  const [deleteApplication] = useDeleteApplicationMutation();
  const [updateApplication] = useUpdateApplicationMutation();

  const deleteHandler = (row) => {
    if (confirm('Are you gonna delete this application?')) {
      deleteApplication(row).then((result) => {
        if (result?.data?.error) {
          alert(result?.data?.error);
          return;
        }
        location.reload();
      });
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'No',
      editable: false,
      align: 'center',
      width: 50,
      headerAlign: 'center',
      valueGetter: (params) => {
        // console.log(params.api.getRow(params.row._id))
        return params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1;
      },
    },
    {
      field: 'timeSubmitted',
      headerName: 'Applied',
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
      field: 'moveIn',
      headerName: 'Move-in',
      align: 'center',
      width: 170,
      headerAlign: 'center',
      editable: false,
      valueGetter: (params) => {
        //switched dayjs to moment-timezone since dayjs.tz() function not working.
        return moment(params.row.coliving.move_in_date)
          .tz('America/Los_Angeles')
          .format('YYYY-MM-DD');
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'user',
      headerName: 'Resident name',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      renderCell: (params) => (
        <Tooltip
          title={
            <Fragment>
              <Typography color="inherit">
                {params.row.user.first_name + ' ' + params.row.user.last_name}
              </Typography>
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
          <div style={{ fontSize: 15 }}>
            {params.row.user.first_name + ' ' + params.row.user.last_name}
          </div>
        </Tooltip>
      ),
    },
    {
      field: 'coliving',
      headerName: 'Co-living name',
      width: 400,
      editable: false,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div
            style={{ fontSize: 15, cursor: 'pointer' }}
            onClick={() => window.open(`/${params.row.coliving_id}`, '_blank')}
          >
            {params.row.coliving.title + ' ' + params.row.coliving.title}
          </div>
        );
      },
    },

    {
      field: 'applications',
      headerName: 'Applications',
      description: 'Total number of applications received',
      editable: false,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.coliving.applications;
      },
    },
    {
      field: 'views',
      headerName: 'Views',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      valueGetter: (params) => {
        return params.row.coliving.views;
      },
    },

    {
      field: 'rank',
      headerName: 'Rank',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return params.row.coliving.rank;
      },
    },
    {
      field: 'author',
      headerName: 'Author',
      align: 'center',
      headerAlign: 'center',
      editable: false,
      renderCell: (params) => {
        return (
          <Tooltip
            title={
              <Fragment>
                <Typography color="inherit">{params.row.user.email}</Typography>
              </Fragment>
            }
          >
            <div style={{ fontSize: 15 }}>{params.row.user.username}</div>
          </Tooltip>
        );
      },
    },
    {
      field: 'test',
      headerName: 'Next steps',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      sortable: false,
      renderCell: (params) => {
        useEffect(() => {
          setStatus(
            params.row.nextStep === 'Chat' ? 'To review' : params.row.nextStep,
          );
        }, []);
        const [status, setStatus] = useState('To review');
        const handleChange = (event: SelectChangeEvent) => {
          setStatus(event.target.value as string);
          const body = {
            userID: params.row.userID,
            coliving_id: params.row.coliving_id,
            nextStep: event.target.value,
          };
          updateApplication(body).then((result) => console.log(result));
        };
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value={'To review'}>To review</MenuItem>
              <MenuItem value={'Host was contacted'}>
                Host was contacted
              </MenuItem>
              <MenuItem value={'Host is not responding'}>
                Host is not responding
              </MenuItem>
              <MenuItem value={'Host refused to review'}>
                Host refused to review
              </MenuItem>
              <MenuItem value={'No longer vacant'}>No longer vacant</MenuItem>
              <MenuItem value={'Host reviewed'}>Host reviewed</MenuItem>
              <MenuItem value={'Host took ownership'}>
                Host took ownership
              </MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              deleteHandler(params.row);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {}, []);
  return (
    <div style={{ marginTop: 20 }}>
      <Box>
        <DataGrid
          rows={data?.applications ? data.applications : []}
          columns={columns}
          autoHeight={true}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          loading={isLoading}
          pageSizeOptions={[15, 30, 100]}
          disableRowSelectionOnClick
          pagination
        />
      </Box>
    </div>
  );
}
