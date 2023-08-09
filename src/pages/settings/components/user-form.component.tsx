/* eslint-disable react/prop-types */
import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack, Button, Paper, IconButton, Tooltip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningIcon from '@mui/icons-material/Warning';
// import { useNavigate } from 'react-router-dom';
import { placeholderApi } from '@/api/axios-instance';
import Snackbar, {
  SnackbarOptionsProps,
} from '@/shared/components/ui/snackbar.custom.component';

export default function UserForm({
  email,
  first_name,
  last_name,
  phone_number,
  contactDetails,
  emailVerified,
  token,
  // redirect_uri = null,
  userID = null,
}) {
  // const navigate = useNavigate();
  console.log(emailVerified);
  const [isVerified, setIsVerified] = useState(emailVerified);
  const [otp, setOtp] = useState(''); // New state for OTP
  const [showOtpField, setShowOtpField] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptionsProps>({
    open: false,
    message: 'Saved successfully!',
    severity: 'success',
  });

  useEffect(() => {
    setIsVerified(emailVerified);
  }, [emailVerified]);

  async function sendVerificationCode(email: string) {
    try {
      const response = await placeholderApi.post(
        '/verifyEmail',
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      if (response.status === 200) {
        setShowOtpField(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function verifyCode(code: string) {
    try {
      const response = await placeholderApi.get(`/verifyEmail?code=${code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        setIsVerified(true);
      }
      setShowOtpField(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: email || '',
        first_name: first_name || '',
        last_name: last_name || '',
        phone_number: phone_number || '',
        second_email: contactDetails?.second_email
          ? contactDetails.second_email
          : '',
        facebook: contactDetails?.facebook ? contactDetails.facebook : '',
        linkedin: contactDetails?.linkedin ? contactDetails.linkedin : '',
        instagram: contactDetails?.instagram ? contactDetails.instagram : '',
        twitter: contactDetails?.twitter ? contactDetails.twitter : '',
        slack: contactDetails?.slack ? contactDetails.slack : '',
        website: contactDetails?.website ? contactDetails.website : '',
        craigslist: contactDetails?.craigslist ? contactDetails.craigslist : '',
        external_application_form: contactDetails?.external_application_form
          ? contactDetails.external_application_form
          : '',
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <Paper variant="elevation" elevation={1} sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="initial">
                  User data
                </Typography>
              </Stack>

              <TextField
                name="first_name"
                label="First name"
                value={values.first_name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="last_name"
                label="Last name"
                value={values.last_name}
                onChange={handleChange}
                fullWidth
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={(e) => {
                    if (e.target.value !== email) setIsVerified(false);
                    else setIsVerified(true);
                    handleChange(e);
                  }}
                  fullWidth
                />
                {showOtpField && (
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => verifyCode(otp)}>
                      Verify
                    </Button>
                  </Stack>
                )}
                {isVerified ? (
                  <Tooltip title="Verified">
                    <IconButton>
                      <VerifiedUserIcon color="success" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Not verified">
                    <IconButton
                      onClick={() => sendVerificationCode(values.email)}
                    >
                      <WarningIcon color="error" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
              <TextField
                name="phone_number"
                label="Phone number"
                value={values.phone_number}
                onChange={handleChange}
                fullWidth
              />
              <Typography variant="body1" color="initial">
                Contact Details
              </Typography>
              <TextField
                name="second_email"
                label="Secondary Email"
                value={values.second_email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="facebook"
                label="Facebook"
                value={values.facebook}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="linkedin"
                label="Linkedin"
                value={values.linkedin}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="instagram"
                label="Instagram"
                value={values.instagram}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="twitter"
                label="Twitter"
                value={values.twitter}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="slack"
                label="Slack"
                value={values.slack}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="website"
                label="Website"
                value={values.website}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="craigslist"
                label="Craigslist post"
                value={values.craigslist}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="external_application_form"
                label="External application form"
                value={values.external_application_form}
                onChange={handleChange}
                fullWidth
              />
              <Button
                variant="contained"
                color="success"
                onClick={async () => {
                  // send to /editAccount endpoint
                  console.log(values);
                  const userData = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    phone_number: values.phone_number,
                    contactDetails: {
                      second_email: values.second_email,
                      facebook: values.facebook,
                      linkedin: values.linkedin,
                      instagram: values.instagram,
                      twitter: values.twitter,
                      slack: values.slack,
                      website: values.website,
                      craigslist: values.craigslist,
                      external_application_form:
                        values.external_application_form,
                    },
                    emailVerified: isVerified,
                  };
                  const result = await placeholderApi.post(
                    `/editAccount${userID ? '/' + userID : ''}`,
                    userData,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  );
                  console.log(result);
                  if (!('error' in result)) {
                    setSnackbarOptions({
                      open: true,
                      message: 'Saved successfully!',
                      severity: 'success',
                    });
                  } else {
                    setSnackbarOptions({
                      open: true,
                      message: result.error,
                      severity: 'error',
                    });
                  }
                }}
              >
                Save
              </Button>
              <Snackbar
                {...snackbarOptions}
                setClose={() =>
                  setSnackbarOptions((prev) => ({ ...prev, open: false }))
                }
              />
            </Stack>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}
