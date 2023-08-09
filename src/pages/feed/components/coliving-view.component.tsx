import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'mui-image';
import Carousel from 'react-material-ui-carousel';
import InfoRow from './info-row.component';
import Stat from './stat.component';
import SlickWrapper from '@/shared/components/ui/slick-wrapper/slick-wrapper.comonent';
import ProtectedContent from '@/shared/components/ui/protected-content.component';
import { useNavigate } from 'react-router-dom';

type ColivingViewProps = {
  data: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
  type: 'colivings' | 'residents';
};
export default function ColivingView({
  // @TODO: Add precise type for `data`.
  data,
  type = 'colivings',
}: ColivingViewProps) {
  const navigate = useNavigate();
  function getLeasePeriod() {
    if (!data.lease_period) return [];
    else
      return [data.lease_period.min + '-' + data.lease_period.max + ' months'];
  }
  return (
    <>
      {/* // <Grid container>
        // <Grid item xs={12} sm={10}> */}
      <Card variant="elevation" sx={{ mt: { xs: 0, sm: 2 }, borderRadius: 4 }}>
        <CardContent sx={{ '&:last-child': { pb: 'unset' }, p: 0 }}>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            {type === 'colivings' && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  p: 1,
                  zIndex: 9,
                  display: 'flex',
                  alignItems: 'flex-end',
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0.02) 100%)',
                  width: '100%',
                }}
              >
                <Avatar
                  variant="circular"
                  src={data?.ownerPicture}
                  alt="photo"
                  sx={{
                    width: '48px',
                    height: '48px',
                    float: 'left',
                    mr: 1,
                  }}
                />
                <ProtectedContent
                  fallback={
                    <Typography
                      variant="subtitle2"
                      component={'span'}
                      sx={{ color: '#fff' }}
                    >
                      {data?.ownerName}
                    </Typography>
                  }
                >
                  <Typography
                    variant="subtitle2"
                    component={'span'}
                    sx={{
                      color: '#fff',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                    onClick={() =>
                      navigate(`/admin/user-profile/${data?.ownerID}/edit`, {
                        state: { redirect_uri: `/${data?._id}` },
                      })
                    }
                  >
                    {data?.ownerName}
                  </Typography>
                </ProtectedContent>
              </Box>
            )}

            {Array.isArray(data?.coliving_pictures) &&
              data?.coliving_pictures?.length !== 0 && (
                <SlickWrapper>
                  {data?.coliving_pictures?.map((image) => (
                    <Box
                      key={image}
                      sx={{
                        aspectRatio: '4/3',
                      }}
                    >
                      <Image src={image} />
                    </Box>
                  ))}
                </SlickWrapper>
              )}
            {Array.isArray(data?.pictures) && data?.pictures?.length !== 0 && (
              <SlickWrapper>
                {data?.pictures?.map((image) => (
                  <Box key={image} sx={{ aspectRatio: '4/3' }}>
                    <Image src={image} />
                  </Box>
                ))}
              </SlickWrapper>
            )}
          </Box>
        </CardContent>
      </Card>
      <Card variant="elevation" sx={{ mt: { xs: 2, sm: 2 }, borderRadius: 4 }}>
        <CardContent>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{ my: -1 }}
          >
            <Stat label="Views" value={data?.views || 0} />
            {type === 'colivings' && data?.followers !== 0 && (
              <Stat label="Followers" value={data?.followers || 0} />
            )}
            <Stat
              label={
                type === 'colivings'
                  ? 'Application queue'
                  : 'Applications submitted'
              }
              value={data?.applications || 0}
            />
          </Stack>
          <Grid container spacing={0} mb={0}>
            <Grid item xs={12}>
              <InfoRow title="Lease period" content={getLeasePeriod()} tags />
            </Grid>
            {/* <Grid item xs={12}>
              <InfoRow
                title="Number of residents"
                content={
                  data?.number_residents
                    ? [`${data?.number_residents} people`]
                    : []
                }
                tags
              />
            </Grid> */}

            {data?.accommodation_pictures?.length !== 0 && (
              <Grid item xs={12}>
                <Carousel
                  autoPlay={false}
                  indicatorContainerProps={{
                    style: {
                      marginTop: '0',
                    },
                  }}
                >
                  {data?.accommodation_pictures?.map((image, index) => (
                    <Box key={index} sx={{ aspectRatio: '4/3' }}>
                      <Image src={image} />
                    </Box>
                  ))}
                </Carousel>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Card variant="elevation" sx={{ mt: { xs: 2, sm: 2 }, borderRadius: 4 }}>
        <CardContent>
          <Grid
            container
            sx={{
              '&>.MuiGrid-item:first-child>hr': {
                display: 'none',
              },
            }}
          >
            {data?.vibes_and_residents && (
              <Grid item xs={12}>
                <InfoRow
                  title="Vibes and residents"
                  content={data?.vibes_and_residents}
                />
              </Grid>
            )}

            {data?.common_interests && (
              <Grid item xs={12}>
                <InfoRow
                  title="Common interests"
                  content={data?.common_interests}
                />
              </Grid>
            )}

            {data?.amenities && (
              <Grid item xs={12}>
                <InfoRow title="Amenities" content={data?.amenities} />
              </Grid>
            )}

            {data?.amenities_pictures &&
              data?.amenities_pictures.length !== 0 && (
                <Grid item xs={12}>
                  <Carousel
                    autoPlay={false}
                    indicatorContainerProps={{
                      style: {
                        marginTop: '0',
                      },
                    }}
                  >
                    {data?.amenities_pictures?.map((image, index) => (
                      <Box key={index} sx={{ aspectRatio: '4/3' }}>
                        <Image src={image} />
                      </Box>
                    ))}
                  </Carousel>
                </Grid>
              )}
            {data?.utilities_costs_description && (
              <Grid item xs={12}>
                <InfoRow
                  title="Utilities and other costs"
                  content={data?.utilities_costs_description}
                />
              </Grid>
            )}

            {data?.more_about_pets && (
              <Grid item xs={12}>
                <InfoRow title="Pet policy" content={data?.pet_policy} />
              </Grid>
            )}

            {data?.more_about_pets && (
              <Grid item xs={12}>
                <InfoRow
                  title="More about pets"
                  content={data?.more_about_pets}
                />
              </Grid>
            )}

            {type === 'colivings' && data?.social_media && (
              <Grid item xs={12}>
                <InfoRow title="Social media" content={data?.social_media} />
              </Grid>
            )}
            {data?.occupation && (
              <Grid item xs={12}>
                <InfoRow title="Occupation" content={data?.occupation} />
              </Grid>
            )}
            {data?.philosophy && (
              <Grid item xs={12}>
                <InfoRow title="Philosophy" content={data?.philosophy} />
              </Grid>
            )}
            {data?.governance && (
              <Grid item xs={12}>
                <InfoRow title="Governance" content={data?.governance} />
              </Grid>
            )}
            {/*
        <Grid item xs={12}>
          <InfoRow
            title="Resident requirements"
            content={`All walks of life are welcome to apply. We particularly welcome Solo Moms by Choice (SMCs).`}
          />
        </Grid>
        <Grid item xs={12}>
          <InfoRow
            title="Detailed description"
            content={`Chrysalis is a budding intergenerational community house in Berkeley dedicated to lifelong learning, mutual support, and exploring how to live life to the fullest together.’`}
          />
        </Grid> */}
            {data?.accommodation_description && (
              <Grid item xs={12}>
                <InfoRow
                  title=" Other details"
                  content={data?.accommodation_description}
                />
              </Grid>
            )}
            {type === 'colivings' && (
              <Grid item xs={12}>
                <InfoRow
                  title="Accommodation type"
                  content={data?.accommodation_type}
                  tags
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      {data?.commonQuestions &&
        Object.keys(data?.commonQuestions).length > 0 && (
          <>
            {Object.entries(data?.commonQuestions).map(([key, value]) => {
              return (
                <Card
                  variant="elevation"
                  key={key}
                  sx={{ my: 2, borderRadius: 4 }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      color="initial"
                      component={'p'}
                    >
                      {key}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" color="initial" component={'p'}>
                      {Array.isArray(value) ? value.join() : value}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}
      {type === 'residents' && (
        <Paper
          variant="elevation"
          elevation={1}
          sx={{ p: 2, borderRadius: 4, '& hr': { display: 'none' } }}
        >
          <InfoRow
            title="Accommodation type"
            content={data?.accommodation_type}
            tags
          />
        </Paper>
      )}

      <Card variant="elevation" sx={{ mt: { xs: 2, sm: 2 }, borderRadius: 4 }}>
        <CardContent>
          <Grid
            container
            sx={{
              '&>.MuiGrid-item:first-child>hr': {
                display: 'none',
              },
            }}
          >
            {data?.social_vibes && data?.social_vibes.length !== 0 && (
              <Grid item xs={12}>
                <InfoRow
                  title="Social vibes"
                  content={data?.social_vibes}
                  tags
                />
              </Grid>
            )}
            {data?.food && data?.food.length !== 0 && (
              <Grid item xs={12}>
                <InfoRow title="Food" content={data?.food} tags />
              </Grid>
            )}
            {data?.identity && data?.identity.length !== 0 && (
              <Grid item xs={12}>
                <InfoRow title="Identity" content={data?.identity} tags />
              </Grid>
            )}
            {data?.gender_preferences &&
              data?.gender_preferences.length !== 0 && (
                <Grid item xs={12}>
                  <InfoRow
                    title="Gender preferences"
                    content={data?.gender_preferences}
                    tags
                  />
                </Grid>
              )}
            {data?.creativity && data?.creativity.length !== 0 && (
              <Grid item xs={12}>
                <InfoRow title="Creativity" content={data?.creativity} tags />
              </Grid>
            )}
            {data?.occupation_types && data?.occupation_types.length !== 0 && (
              <Grid item xs={12}>
                <InfoRow
                  title="Occupation types"
                  content={data?.occupation_types}
                  tags
                />
              </Grid>
            )}
            {data?.occupational_areas &&
              data?.occupational_areas.length !== 0 && (
                <Grid item xs={12}>
                  <InfoRow
                    title="Occupational areas"
                    content={data?.occupational_areas}
                    tags
                  />
                </Grid>
              )}
            {data?.outdoor_activities &&
              data?.outdoor_activities.length !== 0 && (
                <Grid item xs={12}>
                  <InfoRow
                    title="Outdoor activities"
                    content={data?.outdoor_activities}
                    tags
                  />
                </Grid>
              )}
            {data?.sports && data?.sports.length !== 0 && (
              <Grid item xs={12}>
                <InfoRow title="Sports" content={data?.sports} tags />
              </Grid>
            )}
            {data?.passions && data?.passions.length !== 0 && (
              <Grid item xs={12}>
                <InfoRow title="Passions" content={data?.passions} tags />
              </Grid>
            )}
          </Grid>

          {/* </Grid>
        <Grid item xs={12} sm={2} sx={{
          position: 'sticky',
          bottom: 80,
          zIndex: 100,
          pl:1,
        }}>
          <ActionBtns onHide={() => setIndexFeed((prev) => prev + 1)} /> */}
          {/* <Box></Box> */}
          {/* </Grid>
      </Grid> */}
        </CardContent>
      </Card>
    </>
  );
}
