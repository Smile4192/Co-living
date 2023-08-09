import Hero from '@/shared/components/layout/hero.component';
import { placeholderApi } from '@/api/axios-instance';
import { Box, Stack } from '@mui/material';
// import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

interface UserRow {
  isUserActive: boolean;
  isUserLoggedIn: boolean;
  timestamp: string | number | Date;
}

const columns: GridColDef<UserRow>[] = [
  {
    field: 'firstName',
    headerName: 'First Name',
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
  },
  {
    field: 'email',
    width: 210,
    headerName: 'Email',
  },
  {
    field: 'isUserActive',
    headerName: 'Active Status',
    width: 210,
    renderCell: (params: GridRenderCellParams<UserRow, unknown>) => {
      const userActiveStatus = params.row.isUserActive ? 'Active' : 'Away';
      return <Typography>{userActiveStatus}</Typography>;
    },
  },
  {
    field: 'isUserLoggedIn',
    headerName: 'Login Status',
    width: 210,
    renderCell: (params: GridRenderCellParams<UserRow, unknown>) => {
      const userLoginStatus = params.row.isUserLoggedIn
        ? 'Logged In'
        : 'Logged Out';
      return <Typography>{userLoginStatus}</Typography>;
    },
  },
  {
    field: 'timestamp',
    headerName: 'Time',
    width: 210,
    renderCell: (params: {
      row: {
        timestamp: string | number | Date;
      };
    }) => {
      const formattedDate = new Date(params.row.timestamp).toLocaleString(
        'en-US',
      );

      return <Typography>{formattedDate}</Typography>;
    },
  },
  {
    field: 'userId',
    width: 210,
    headerName: 'User ID',
  },
];

function getLogs(
  setIsDataLoading: React.Dispatch<React.SetStateAction<boolean>>,
  page: number,
  perPage: number,
  accessToken: string,
  setData: Dispatch<
    SetStateAction<{
      total: number;
      logs: never[];
    }>
  >,
) {
  setIsDataLoading(true);
  placeholderApi
    .get(`/userActivity?page=${page || 1}&perPage=${perPage || 25}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((resp) => {
      setData(resp?.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsDataLoading(false);
    });
}

export default function UsersActivityTablePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = React.useState({});
  const [accessToken, setAccessToken] = React.useState('');

  const [data, setData] = React.useState({ total: 0, logs: [] });
  const [isDataLoading, setIsDataLoading] = React.useState(true);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  async function getToken() {
    const token = localStorage.getItem('accessToken');
    const issueTime = localStorage.getItem('issueTime');
    if (token !== null && issueTime !== null) {
      // implement token expiration detection later
      const expirationNotice = parseInt(issueTime) + 14 * 86400000;
      if (Date.now() > expirationNotice) {
        navigate('/sign-in');
        return null;
      }
      return token;
    } else {
      navigate('/sign-in');
      return null;
    }
  }

  async function getUserData() {
    console.log({ userProfile });
    let token = '';
    try {
      token = (await getToken()) || '';
      setAccessToken(token);
    } catch (err) {
      console.log(err);
    }
    // const profile = await axios.get("http://localhost:8000/getUserProfile", {
    const profile = await placeholderApi.get('/getUserProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(profile);
    if (!('error' in profile.data)) {
      setUserProfile(profile.data);
    } else {
      navigate('/sign-in');
    }
  }

  // function DataGridFooter() {
  //   return (
  //     <Stack direction="row" alignItems={'center'} spacing={2} my={2}>
  //       <Pagination
  //         page={page}
  //         count={Math.ceil((data?.total || 0) / perPage)}
  //         onChange={(e, newPage) => setPage(newPage)}
  //       />
  //
  //       <Typography variant="subtitle2">
  //         {data?.total || 0} total rows
  //       </Typography>
  //     </Stack>
  //   );
  // }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    getLogs(
      setIsDataLoading,
      paginationModel.page,
      paginationModel.pageSize,
      accessToken,
      setData,
    );
  }, [paginationModel, accessToken]);

  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
      }}
    >
      <Typography variant="h4" component="h2" mb={2}>
        Users Activity
      </Typography>
      <Stack spacing={1}>
        <Box sx={{ mt: 10 }}>
          {data ? (
            <DataGrid
              rows={Array.isArray(data?.logs) ? data.logs : []}
              columns={columns}
              pageSizeOptions={[25, 50, 100]}
              rowCount={data?.total || 0}
              paginationMode={'server'}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              loading={isDataLoading}
              disableRowSelectionOnClick
            />
          ) : null}

          {/*<DataGridFooter />*/}
        </Box>
      </Stack>
    </Hero>
  );
}
