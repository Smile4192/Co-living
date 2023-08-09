import { useLoginEmailMutation } from '@/api/auth.api';
import { placeholderApi } from '@/api/axios-instance';
import CheckboxMultipleField from '@/shared/components/form/checkbox-multiple.component';
import ImageUploaderField from '@/shared/components/form/image-uploader.component';
import SelectField from '@/shared/components/form/select.component';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const validationSchema = Yup.object({
  pictures: Yup.array().min(1, 'Required'),
  age: Yup.number().positive(),
  occupation: Yup.string().required('Required'),
  move_in_date: Yup.array().min(1, 'Required'),
  monthly_budget: Yup.number().positive().required('Required'),
  preferred_pronouns: Yup.string(),
  lease_period: Yup.array().min(1, 'Required'),
  preferred_location: Yup.array(),
  preferred_neighborhoods: Yup.string(),
  other_preferred_location: Yup.string(),
  accommodation_type: Yup.array(),
  social_media: Yup.string(),
  has_pets: Yup.mixed().oneOf(['Yes', 'No']).required('Required'),
  pets_details: Yup.string(),
  is_bringing_roommates: Yup.string().required('Required'),
  bringing_roommates_details: Yup.string(),
  vibes: Yup.string(),
  parking: Yup.string().required('Required'),
  amount: Yup.string(),
  social_vibes: Yup.array(),
  food: Yup.array(),
  identity: Yup.array(),
  gender_preferences: Yup.array(),
  creativity: Yup.array(),
  occupation_types: Yup.array(),
  occupational_areas: Yup.array(),
  outdoor_activities: Yup.array(),
  sports: Yup.array(),
  passions: Yup.array(),
});

// @TODO: Use a typed object instead of location.state.
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  residentProfile: any;
  accessToken: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // 👈️ allows dynamic keys and values
}

export default function ResidentForm(props: Props) {
  const [loginEmail] = useLoginEmailMutation();
  const navigate = useNavigate();
  const [existingImageList, setExistingImageList] = React.useState(
    props.residentProfile.pictures || [],
  );
  const [uploadedImages, setUploadedImages] = React.useState([]);
  const commonQuestions = {
    'What are you excited about the most in your life right now?': '',
    // eslint-disable-next-line quotes
    "What's your co-living vibe? How would your housemates describe you?": '',
  };
  console.log(props.residentProfile);
  return (
    <>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          pictures: props.residentProfile.pictures || [],
          age: props.residentProfile.age || '',
          occupation: props.residentProfile.occupation || '',
          move_in_date: props.residentProfile.move_in_date || [],
          monthly_budget: props.residentProfile.monthly_budget || '',
          preferred_pronouns: props.residentProfile.preferred_pronouns || '',
          lease_period: props.residentProfile.lease_period || [],
          preferred_location: props.residentProfile.preferred_location || [],
          preferred_neighborhoods:
            props.residentProfile.preferred_location || '',
          other_preferred_location:
            props.residentProfile.other_preferred_location || '',
          accommodation_type: props.residentProfile.accommodation_type || [],
          social_media: props.residentProfile.social_media || '',
          has_pets: props.residentProfile.has_pets || '',
          pets_details: props.residentProfile.pets_details || '',
          is_bringing_roommates:
            props.residentProfile.is_bringing_roommates || '',
          bringing_roommates_details:
            props.residentProfile.bringing_roommates_details || '',
          vibes: props.residentProfile.vibes || '',
          parking: props.residentProfile.parking || '',
          amount: props.residentProfile.amount || '',
          social_vibes: props.residentProfile.social_vibes || [],
          food: props.residentProfile.food || [],
          identity: props.residentProfile.identity || [],
          gender_preferences: props.residentProfile.gender_preferences || [],
          creativity: props.residentProfile.creativity || [],
          occupation_types: props.residentProfile.occupation_types || [],
          occupational_areas: props.residentProfile.occupational_areas || [],
          outdoor_activities: props.residentProfile.outdoor_activities || [],
          sports: props.residentProfile.sports || [],
          passions: props.residentProfile.passions || [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          loginEmail(values).then(() => {
            navigate('/profile');
          });
        }}
      >
        {({
          values,
          errors,
          // touched,
          handleChange,
          handleBlur,
          // handleSubmit,
          validateForm,
          // setFieldValue,
        }) => (
          <Form>
            <Stack spacing={2} pb={'65px'}>
              <ImageUploaderField
                title="My pictures*:"
                name="residentPictures"
                existingImages={existingImageList}
                setExistingImages={setExistingImageList}
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                formError={errors.pictures}
              />
              <TextField
                // sx={{ my: 1 }}
                label="Age"
                name="age"
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
                error={!!errors.age}
                helperText={errors.age ? errors.age : null}
                fullWidth
                type="number"
              />
              <TextField
                label="Occupation*"
                name="occupation"
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.occupation}
                error={!!errors.occupation}
                helperText={errors.occupation ? errors.occupation : null}
                fullWidth
              />
              <CheckboxMultipleField
                label="Earliest move-in date*"
                name="move_in_date"
                values={values.move_in_date}
                errors={errors}
                options={[
                  {
                    label: 'ASAP',
                  },
                  {
                    label: monthNames[(new Date().getMonth() + 1) % 12],
                  },
                  {
                    label: monthNames[(new Date().getMonth() + 2) % 12],
                  },
                  {
                    label: monthNames[(new Date().getMonth() + 3) % 12],
                  },
                  {
                    label: monthNames[(new Date().getMonth() + 4) % 12],
                  },
                ]}
              />

              <TextField
                name="monthly_budget"
                label="Monthly budget*"
                value={values.monthly_budget}
                onChange={handleChange}
                error={!!errors.monthly_budget}
                helperText={
                  errors.monthly_budget ? errors.monthly_budget : null
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
              />
              <TextField
                label="Preferred pronouns"
                name="preferred_pronouns"
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.preferred_pronouns}
                error={!!errors.preferred_pronouns}
                helperText={
                  errors.preferred_pronouns ? errors.preferred_pronouns : null
                }
                fullWidth
              />

              <CheckboxMultipleField
                label="Lease period*"
                name="lease_period"
                values={values.lease_period}
                errors={errors}
                options={[
                  {
                    label: '1 month',
                  },
                  {
                    label: '2 months',
                  },
                  {
                    label: '3 months',
                  },
                  {
                    label: '5 months',
                  },
                  {
                    label: '7 months',
                  },
                  {
                    label: '9 months',
                  },
                  {
                    label: '11 months',
                  },
                  {
                    label: '12+ months',
                  },
                ]}
              />

              <CheckboxMultipleField
                label="What is your preferred location"
                name="preferred_location"
                values={values.preferred_location}
                errors={errors}
                options={[
                  {
                    label: 'San Francisco',
                    value: 'San Francisco',
                  },
                  {
                    label: 'Oakland',
                    value: 'Oakland',
                  },
                  {
                    label: 'Berkeley',
                    value: 'Berkeley',
                  },
                  {
                    label: 'Daly City',
                    value: 'Daly City',
                  },
                  {
                    label: 'Alameda',
                    value: 'Alameda',
                  },
                  {
                    label: 'East Bay',
                    value: 'East Bay',
                  },
                  {
                    label: 'South Bay',
                    value: 'South Bay',
                  },
                  {
                    label: 'Peninsula',
                    value: 'Peninsula',
                  },
                ]}
              />
              <TextField
                name="preferred_neighborhoods"
                label="Preferred neighborhoods"
                value={values.preferred_neighborhoods}
                error={!!errors.preferred_neighborhoods}
                helperText={
                  errors.preferred_neighborhoods
                    ? errors.preferred_neighborhoods
                    : null
                }
                onChange={handleChange}
              />
              <CheckboxMultipleField
                label="Accommodation type"
                name="accommodation_type"
                values={values.accommodation_type}
                errors={errors}
                options={[
                  {
                    label: 'Private room',
                    value: 'private_room',
                  },
                  {
                    label: 'Furnished',
                    value: 'furnished',
                  },
                  {
                    label: 'Unfurnished',
                    value: 'unfurnished',
                  },
                  {
                    label: 'Private bathroom',
                    value: 'private_bathroom',
                  },
                  {
                    label: 'Shared room',
                    value: 'shared_room',
                  },
                  {
                    label: 'Pods',
                    value: 'pods',
                  },
                  {
                    label: 'Private studio',
                    value: 'private_studio',
                  },
                  {
                    label: 'Private entrance',
                    value: 'private_entrance',
                  },
                  {
                    label: 'Private house',
                    value: 'private_house',
                  },
                  {
                    label: 'Private apartment',
                    value: 'private_apartment',
                  },
                  {
                    label: 'Ask if furnished',
                    value: 'Ask if furnished',
                  },
                ]}
              />
              <SelectField
                label="Any pets?* If yes, please give us some details, e.g. species, weight"
                name="has_pets"
                value={values.has_pets}
                onChange={handleChange}
                errors={errors}
                options={[
                  {
                    label: 'Yes',
                  },
                  {
                    label: 'No',
                  },
                ]}
              />
              {values.has_pets === 'Yes' && (
                <TextField
                  name="pets_details"
                  label=" If yes, please give us some details, e.g. species, weight"
                  value={values.pets_details}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              )}
              <SelectField
                label="Are you bringing roommates?* If yes, tell us more about your story"
                name="is_bringing_roommates"
                value={values.is_bringing_roommates}
                errors={errors}
                onChange={handleChange}
                options={[
                  {
                    label: 'Yes',
                  },
                  {
                    label: 'No',
                  },
                ]}
              />
              {values.is_bringing_roommates === 'Yes' && (
                <TextField
                  name="bringing_roommates_details"
                  label="If yes, tell us more about your story"
                  value={values.bringing_roommates_details}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              )}
              <SelectField
                label="What are your parking expectations?*"
                name="parking"
                value={values.parking}
                onChange={handleChange}
                errors={errors}
                options={[
                  {
                    label: 'Street parking is ok',
                  },
                  {
                    label: 'On-premise parking needed',
                  },
                ]}
              />

              <Typography variant="subtitle2" color="initial">
                What sort of housemates are you looking to meet?
              </Typography>

              <CheckboxMultipleField
                label="Social vibes"
                name="social_vibes"
                values={values.social_vibes}
                options={[
                  {
                    label: 'Easygoing',
                  },
                  {
                    label: 'Hanging out ',
                  },
                  {
                    label: 'Board games',
                  },
                  {
                    label: 'Emotional support',
                  },
                  {
                    label: 'Love & Admiration',
                  },
                  {
                    label: 'Community events',
                  },
                  {
                    label: 'Movies',
                  },
                  {
                    label: 'Music',
                  },
                  {
                    label: 'Video games',
                  },
                ]}
              />

              <CheckboxMultipleField
                label="Food"
                name="food"
                values={values.food}
                options={[
                  {
                    label: 'Vegetarian',
                  },
                  {
                    label: 'Vegan',
                  },
                  {
                    label: 'Barbecue',
                  },
                  {
                    label: 'Coffee/tea together',
                  },
                  {
                    label: 'Meals together',
                  },
                  {
                    label: 'Cooking together',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Identity"
                name="identity"
                values={values.identity}
                options={[
                  {
                    label: 'LGBTQIA+',
                    value: 'LGBTQIA+',
                  },
                  {
                    label: 'Queer',
                  },
                  {
                    label: 'Gay',
                  },
                  {
                    label: 'QTPOC',
                  },
                  {
                    label: 'BIPOC',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Gender preferences"
                name="gender_preferences"
                values={values.gender_preferences}
                options={[
                  {
                    label: 'Women only',
                  },
                  {
                    label: 'Same identity',
                  },
                  {
                    label: 'Gender balance',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Creativity"
                name="creativity"
                values={values.creativity}
                options={[
                  {
                    label: 'Artists',
                  },
                  {
                    label: 'Creatives',
                  },
                  {
                    label: 'Musicians',
                  },
                  {
                    label: 'Designers',
                  },
                  {
                    label: 'Painting',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Occupation types"
                name="occupation_types"
                values={values.occupation_types}
                options={[
                  {
                    label: 'Students',
                  },
                  {
                    label: 'Coaches/Practitioners',
                  },
                  {
                    label: 'Freelancers',
                  },
                  {
                    label: 'Entrepreneurs',
                  },
                  {
                    label: 'Founders',
                  },
                  {
                    label: 'Thinkers/Inventors',
                  },
                  {
                    label: 'Do-ers/Builders',
                  },
                  {
                    label: 'Scientists/Professors',
                  },
                  {
                    label: 'Professionals/Specialists',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Occupational areas"
                name="occupational_areas"
                values={values.occupational_areas}
                options={[
                  {
                    label: 'Tech/Engineering',
                  },
                  {
                    label: 'Robotics',
                  },
                  {
                    label: 'Energy',
                  },
                  {
                    label: 'Healthcare',
                  },
                  {
                    label: 'Biotech',
                  },
                  {
                    label: 'Privacy',
                  },
                  {
                    label: 'Web3/AI',
                  },
                  {
                    label: 'Law',
                  },
                  {
                    label: 'Environment',
                  },
                  {
                    label: 'Media',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Outdoor activities"
                name="outdoor_activities"
                values={values.outdoor_activities}
                options={[
                  {
                    label: 'Camping',
                  },
                  {
                    label: 'Hiking',
                  },
                  {
                    label: 'Picnics',
                  },
                  {
                    label: 'Dancing',
                  },
                  {
                    label: 'Go to Bars/Clubs',
                  },
                  {
                    label: 'Motorsport',
                  },
                  {
                    label: 'Adventures/Group tours',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Sports"
                name="sports"
                values={values.sports}
                options={[
                  {
                    label: 'Running',
                    value: 'Running',
                  },
                  {
                    label: 'Cycling',
                    value: 'Cycling',
                  },
                  {
                    label: 'Climbing',
                    value: 'Climbing',
                  },
                  {
                    label: 'Surfing',
                    value: 'Surfing',
                  },
                  {
                    label: 'Yoga',
                    value: 'Yoga',
                  },
                  {
                    label: 'Skating',
                    value: 'Skating',
                  },
                  {
                    label: 'Swimming',
                    value: 'Swimming',
                  },
                  {
                    label: 'Beach volleyball',
                    value: 'Beach volleyball',
                  },
                  {
                    label: 'Soccer',
                    value: 'Soccer',
                  },
                  {
                    label: 'Golf',
                    value: 'Golf',
                  },
                ]}
              />
              <CheckboxMultipleField
                label="Passions"
                name="passions"
                values={values.passions}
                options={[
                  {
                    label: 'Gardening/Plants',
                    value: 'Gardening/Plants',
                  },
                  {
                    label: 'Personal development',
                    value: 'Personal development',
                  },
                  {
                    label: 'Reading',
                    value: 'Reading',
                  },
                  {
                    label: 'Writing',
                    value: 'Writing',
                  },
                  {
                    label: 'Historic',
                    value: 'Historic',
                  },
                  {
                    label: 'Meditation/Mindfulness',
                    value: 'Meditation/Mindfulness',
                  },
                  {
                    label: 'Spiritual practices',
                    value: 'Spiritual practices',
                  },
                  {
                    label: 'Nonprofit projects',
                    value: 'Nonprofit projects',
                  },
                  {
                    label: 'Collaborative cultures',
                    value: 'Collaborative cultures',
                  },
                  {
                    label: 'Community leaders',
                    value: 'Community leaders',
                  },
                  {
                    label: 'Sex positive',
                    value: 'Sex positive',
                  },
                  {
                    label: 'Startups',
                    value: 'Startups',
                  },
                  {
                    label: 'Commonwealth',
                    value: 'Commonwealth',
                  },
                  {
                    label: 'Poker',
                    value: 'Poker',
                  },
                  {
                    label: 'Kink',
                    value: 'Kink',
                  },
                ]}
              />
              {/* <TextField
                name="*"
                label="Tell us a bit about your life*
                (300 characters):"
                value={''}
                onChange={handleChange}
                rows={4}
                multiline
              />

              <Typography variant="subtitle1" color="initial">
                Commonly required questions:
              </Typography>
              {Object.keys(commonQuestions).map((key: string) => (
                <TextField
                  name="*"
                  label={key}
                  value={commonQuestions[key]}
                  onChange={(event) => {
                    const newAnswers = { ...commonQuestions };
                    newAnswers[key] = event.target.value;
                    setCommonQuestions(newAnswers);
                  }}
                  rows={4}
                  multiline
                />
              ))} */}
            </Stack>
            <Box>
              <Fab
                variant="extended"
                color="default"
                aria-label=""
                sx={{
                  position: 'fixed',
                  bottom: '65px',
                  left: '20px',
                  zIndex: 100,
                }}
                onClick={() => navigate('/profile')}
              >
                Back
              </Fab>
              <Fab
                variant="extended"
                color="primary"
                sx={{
                  position: 'fixed',
                  bottom: '65px',
                  right: '20px',
                  zIndex: 100,
                }}
                onClick={() => {
                  if (
                    uploadedImages.length > 0 ||
                    existingImageList.length > 0
                  ) {
                    values.pictures = ['validated'];
                  } else values.pictures = [];
                  validateForm().then((err) => {
                    if (Object.keys(err).length !== 0) {
                      console.log(err);
                      document
                        .getElementsByName(Object.keys(err)[0])[0]
                        .scrollIntoView({
                          block: 'center',
                          behavior: 'smooth',
                        });
                      return;
                    }
                    (async function () {
                      console.log(values);
                      const token = props.accessToken;
                      console.log('token' + token);
                      const formData = new FormData();
                      for (let i = 0; i < uploadedImages.length; i++) {
                        formData.append('image', uploadedImages[i].file);
                      }
                      values.pictures = existingImageList;
                      const profileData = { ...values };
                      profileData.commonQuestions = commonQuestions;
                      formData.append(
                        'residentProfile',
                        JSON.stringify(profileData),
                      );
                      console.log(formData);
                      const result = await placeholderApi.post(
                        '/createResidentProfile',
                        formData,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                          },
                        },
                      );
                      console.log(result.data);
                      navigate('/profile');
                    })();
                  });
                }}
              >
                Save
              </Fab>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
