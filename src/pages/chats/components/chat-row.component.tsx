import SelectField from '@/shared/components/form/select.component';
import { Button, ButtonBase, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';
import React from 'react';

interface ChatRowProps {
  expiresIn: number;
  id: number;
  lastMsg: string;
  lastMsgTime: number;
  name: string;
  nextStep: string;
  pic: string;
}

export default function ChatRow(props: ChatRowProps) {
  const [open, setOpen] = React.useState(false);
  // Do we expect `props` to actually have a `status` property?
  const [status, setStatus] = React.useState();
  return (
    <Paper variant="elevation" elevation={1}>
      <ButtonBase
        onClick={() => setOpen((prev) => !prev)}
        sx={{ width: '100%' }}
      >
        <Grid container alignItems="center" sx={{ p: 1 }}>
          <Grid item xs={2}>
            <Image src="" />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              component="p"
              color="initial"
              textAlign={'left'}
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {props.name}
            </Typography>

            {props.lastMsg && (
              <Typography
                variant="body2"
                component="p"
                color="initial"
                textAlign={'left'}
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {props.lastMsg}
              </Typography>
            )}
          </Grid>
          {/* {!props.lastMsg && ( */}
          <Grid item xs={4}>
            <Typography
              variant="caption"
              component="p"
              color="initial"
              sx={{ opacity: 0.6 }}
            >
              Expires in:
              <Typography variant="h6" component={'span'} ml={1}>
                {props.expiresIn}h
              </Typography>
            </Typography>
            <Typography variant="caption" component="p" color="initial" sx={{}}>
              Next step:
              <Typography variant="h6" component={'span'} ml={1}>
                {props.nextStep}
              </Typography>
            </Typography>
          </Grid>
          {/* )} */}
        </Grid>
      </ButtonBase>
      {open && (
        <Grid container sx={{ p: 1 }} alignItems="stretch" spacing={1}>
          <Grid item xs={8}>
            <Typography variant="body2" color="initial" textAlign="left">
              Personal notes (not visible to the user):
            </Typography>
            <TextField
              id=""
              label=""
              onChange={() => {}}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="initial" textAlign="left">
              Status:
            </Typography>
            <SelectField
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              //   onChange={(e) => {}}
              size="small"
              options={[
                {
                  label: 'To review',
                },
                {
                  label: 'To decide',
                },
                {
                  label: 'Pass',
                },
                {
                  label: 'Add a status',
                },
              ]}
            />
            <Typography variant="body2" color="initial" textAlign="left">
              Internal rating: 8
            </Typography>
          </Grid>
          <Grid item xs={3} mt={1}>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              fullWidth
              sx={{
                minHeight: '100%',
              }}
            >
              Move up
            </Button>
          </Grid>
          <Grid item xs={3} mt={1}>
            <Button variant="contained" color="inherit" size="small" fullWidth>
              Move down
            </Button>
          </Grid>
          <Grid item xs={3} mt={1}>
            <Button variant="contained" color="success" size="small" fullWidth>
              Start chat
            </Button>
          </Grid>
          <Grid item xs={3} mt={1}>
            <Button
              variant="contained"
              color="error"
              size="small"
              fullWidth
              sx={{
                minHeight: '100%',
              }}
            >
              Hide
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
