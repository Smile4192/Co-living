import {
  Box,
  // ButtonBase,
  Card,
  // CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

type CommonCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any }; //TODO
  onHide: () => void;
  onFollow: () => void;
  onApply: () => void;
  followToggle: boolean;
  type: 'colivings' | 'residents';
};
export default function CommonCard({
  data,
  // onHide,
  // onFollow,
  // onApply,
  // followToggle,
  type = 'colivings',
}: CommonCardProps) {
  return (
    <Card
      variant="elevation"
      sx={{
        position: 'sticky',
        top: 61,
        mt: { xs: 1, sm: 0 },
        borderRadius: 4,
      }}
    >
      <CardContent
        sx={{
          p: 2,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Typography
              variant="h6"
              color="initial"
              component={'h6'}
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {type === 'colivings' ? data?.title : data?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {data?.city &&
              data?.city.map((item: string) => (
                <Chip
                  key={item}
                  variant="filled"
                  sizes="small"
                  colors="default"
                  label={item}
                  sx={{ my: 0.3, mx: 0.3 }}
                />
              ))}
            {data?.preferred_location &&
              data?.preferred_location.map((item: string) => (
                <Chip
                  key={item}
                  variant="filled"
                  sizes="small"
                  colors="default"
                  label={item}
                  sx={{ my: 0.3, mx: 0.3 }}
                />
              ))}
            {data?.neighborhood && (
              <Chip
                variant="filled"
                sizes="small"
                colors="default"
                label={data?.neighborhood}
                sx={{ my: 0.3, mx: 0.3 }}
              />
            )}
            {data?.number_residents && (
              <Chip
                variant="filled"
                sizes="small"
                colors="default"
                label={`${data?.number_residents} people`}
                sx={{ my: 0.3, mx: 0.3 }}
              />
            )}
            {data?.age && (
              <Chip
                variant="filled"
                sizes="small"
                colors="default"
                label={`Age: ${data?.age}`}
                sx={{ my: 0.3, mx: 0.3 }}
              />
            )}
            {data?.preferred_pronouns && (
              <Chip
                variant="filled"
                sizes="small"
                colors="default"
                label={data?.preferred_pronouns}
                sx={{ my: 0.3, mx: 0.3 }}
              />
            )}
          </Grid>
          {/* TEMP HIDDEN */}
          {/* <Grid item xs={12}>
            {data?.city && (
              <InfoRow
                content={
                  data?.neighborhood
                    ? [...(data?.city ?? []), data?.neighborhood]
                    : data?.city
                }
                tags
              />
            )}
            {data?.preferred_location && (
              <InfoRow
                content={
                  data?.neighborhood
                    ? [...(data?.preferred_location ?? []), data?.neighborhood]
                    : data?.preferred_location
                }
                tags
              />
            )}
            {!data?.city && !data?.preferred_location && (
              <InfoItem>
                <Typography variant="body1">{data?.address}</Typography>
              </InfoItem>
            )}
          </Grid> */}
          <Grid item xs={4}>
            <InfoItem>
              <Typography variant="caption" component={'p'}>
                {data?.rent ? 'Rent' : 'Monthly budget'}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                component={'span'}
                sx={{
                  fontSize: 22,
                  opacity: 1,
                  lineHeight: 1,
                }}
              >
                {USDollar.format(data?.rent || data?.monthly_budget || 0)}
              </Typography>
              {/* <Typography variant="caption">per month</Typography> */}
            </InfoItem>
          </Grid>
          <Grid item xs={4}>
            <InfoItem>
              <Typography variant="caption" component={'p'}>
                Move-in date
              </Typography>
              {dayjs(data?.move_in_date).format('DD/MM/YYYY')}
            </InfoItem>
          </Grid>
          <Grid item xs={4}>
            <InfoItem>
              <Typography variant="caption" component={'p'}>
                {type === 'colivings' ? 'Acceptances rate' : 'Match rate'}
              </Typography>
              Very Low
            </InfoItem>
          </Grid>
        </Grid>
      </CardContent>
      {/* disabled for lack of necessity at the moment, in case you need it, so comment */}
      {/* <CardActions
        sx={{
          display: { xs: 'none', sm: 'flex' },
          p: 0,
          '&>:not(:first-of-type)': {
            ml: 0,
          },
        }}
      >
        <ButtonBase
          sx={{
            width: '100%',
            aspectRatio: 1,
            bgcolor: 'text.disabled',
            color: '#fff',
          }}
          onClick={onHide}
        >
          <Typography variant="overline" fontSize={16}>
            Next
          </Typography>
        </ButtonBase>
        <ButtonBase
          sx={{
            width: '100%',
            aspectRatio: 1,
            bgcolor: '#32678F',
            color: '#fff',
            '&:hover': {
              bgcolor: '#295779',
            },
          }}
          onClick={onFollow}
        >
          <Typography variant="overline" fontSize={followToggle ? 15 : 11}>
            {followToggle ? 'Follow' : 'Unfollow'}
          </Typography>
        </ButtonBase>
        <ButtonBase
          sx={{
            width: '100%',
            aspectRatio: 1,
            bgcolor: 'primary.main',
            color: '#fff',
          }}
          onClick={onApply}
        >
          <Typography variant="overline" fontSize={16}>
            {type === 'colivings' ? 'Apply' : 'Invite'}
          </Typography>
        </ButtonBase>
      </CardActions> */}
    </Card>
  );
}

function InfoItem({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        color: 'rgba(0,0,0,0.5)',
        // opacity: 0.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        lineHeight: 1,
        // alignItems: 'space-between',
        // gap: 1,
      }}
    >
      {children}
    </Box>
  );
}
