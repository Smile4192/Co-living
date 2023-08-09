import { useGetApplicationsQuery } from '@/api/applications.api';
import { useGetColivingListingsQuery } from '@/api/auth.api';
import Loading from '@/shared/components/ui/loading.component';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactVisibilitySensor from 'react-visibility-sensor';
import ApplicationRow from './application-row.component';
import CopyToClipboardWrapper from '@/shared/components/ui/copy-to-clipboard-wrapper';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import { useDispatch, useSelector } from 'react-redux';
import {
  setApplications,
  setList,
} from '@/store/modules/applications/applications.slice';
interface ILoaded {
  id: number | string;
  title: string;
  isReady: boolean;
  applications: never[];
}
export default function ApplicationList({
  token = '',
  tab,
}: {
  token?: string;
  tab: 'applications' | 'chats';
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loaded = useSelector((state) => state.applications.list);
  const list = React.useMemo(() => {
    return loaded.map((coliving) => {
      if (tab === 'chats') {
        return {
          ...coliving,
          applications: coliving.applications.filter(
            (item) => item.status === 'Chat',
          ),
        };
      }
      return {
        ...coliving,
        applications: coliving.applications.filter(
          (item) => item.status !== 'Chat' && item.status !== 'Hidden',
        ),
      };
    });
  }, [loaded]);
  const fetchColivings = useGetColivingListingsQuery();
  console.log('Loaded: ', loaded, list);
  useEffect(() => {
    if (fetchColivings.status === 'fulfilled' && loaded.length === 0) {
      if (fetchColivings.data.error === 'User unauthorized')
        if (searchParams.get('colivingID')) {
          dispatch(
            setList({
              list: [
                {
                  id: searchParams.get('colivingID') as number | string,
                  title:
                    searchParams.get('colivingTitle') ||
                    'Go to Coliving Profile',
                  isReady: false,
                  applications: [],
                },
              ],
            }),
          );
          return;
        } else if (!searchParams.get('colivingID')) {
          return <>Error</>;
        }
      dispatch(
        setList({
          list: fetchColivings.data.colivings.map((item) => ({
            id: item._id,
            title: item.title,
            isReady: false,
            applications: [],
          })),
        }),
      );
    }
  }, [fetchColivings.isLoading]);

  return (
    <>
      {/* temp hidden */}
      {/* <Sort /> */}
      {fetchColivings.isLoading ? (
        <Loading />
      ) : loaded?.length > 0 ? (
        <>
          {list.map((coliving) => (
            <React.Fragment key={coliving.id}>
              {coliving.applications.length > 0 && (
                <Box>
                  <Box>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={() => navigate(`/${coliving.id}`)}
                      sx={{
                        textDecoration: 'underline',
                        textAlign: 'left',
                      }}
                    >
                      {coliving.title}
                    </Button>
                    <CopyToClipboardWrapper
                      copyText={`${window.location.origin}/chats?colivingID=${coliving.id}`}
                    >
                      <Box
                        sx={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        <ContentPasteRoundedIcon sx={{ fontSize: 12 }} />
                        <Typography variant="caption" color="initial">
                          Share link to this list
                        </Typography>
                      </Box>
                    </CopyToClipboardWrapper>
                  </Box>

                  <Stack spacing={1}>
                    {coliving.applications.map((application, idx) => (
                      <ApplicationRow
                        key={application.userID + idx}
                        {...application}
                        token={token}
                        colivingID={coliving.id}
                        tab={tab}
                      />
                    ))}
                  </Stack>
                  <Divider
                    variant="fullWidth"
                    orientation="horizontal"
                    sx={{ my: 1 }}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
          {loaded.length > 0 && firstNotLoaded(loaded) && (
            <Chunk loaded={loaded} tab={tab} />
          )}
        </>
      ) : (
        <Typography variant="body1" color="initial">
          Empty list
        </Typography>
      )}
    </>
  );
}

const firstNotLoaded = (array) => {
  const result = array.find((obj) => obj.isReady === false);
  return result ? result.id : false;
};
function Chunk({ loaded }: { loaded: ILoaded[] }) {
  const dispatch = useDispatch();
  const [next, setNext] = React.useState({ id: firstNotLoaded(loaded) });
  const [checkVisible, setCheckVisible] = React.useState(true);
  const fetchApplications = useGetApplicationsQuery(next);
  const mappedList = useSelector((state) => state.applications.mappedList);
  // console.log('MAP: ', mappedList);
  const handleVisible = (isVisible: boolean) => {
    if (isVisible) setNext({ id: firstNotLoaded(loaded) });
    setCheckVisible(isVisible);
  };
  useEffect(() => {
    if (
      fetchApplications.status === 'fulfilled' &&
      !mappedList[next.id].isReady
    ) {
      dispatch(
        setApplications({
          id: next.id,
          data: fetchApplications.data.applications,
        }),
      );
    }
    if (
      // fetchApplications.data.applications.length === 0 ||
      checkVisible
    )
      setNext({ id: firstNotLoaded(loaded) });
  }, [
    fetchApplications.isFetching,
    checkVisible,
    fetchApplications.data,
    loaded,
  ]);
  if (fetchApplications.isLoading) return <></>;

  return (
    <ReactVisibilitySensor onChange={handleVisible}>
      <Box sx={{ display: 'flex', justifyContent: 'center', height: 50 }}>
        {checkVisible && (
          <Box sx={{ position: 'relative' }}>
            <CircularProgress
              variant="determinate"
              value={
                (loaded.reduce(
                  (acc, item) => (item.isReady ? acc + 1 : acc),
                  0,
                ) /
                  loaded.length) *
                100
              }
            />
          </Box>
        )}
      </Box>
    </ReactVisibilitySensor>
  );
}
