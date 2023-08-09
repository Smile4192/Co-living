// We need to not use `location.state` to avoid this.
/* eslint-disable react/prop-types */
import ImageUploaderField from '@/shared/components/form/image-uploader.component';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import CheckboxMultipleField from '@/shared/components/form/checkbox-multiple.component';
import SelectField from '@/shared/components/form/select.component';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import SliderField from '@/shared/components/form/slider-field.component';

const validationSchema = Yup.object({
  title: Yup.string().max(32, 'Maximum 32 characters').required('Required'),
  // eslint-disable-next-line quotes
  coliving_pictures: Yup.array().min(1, "Can't be empty").required('Required'),
  availability: Yup.string().required('Required'),
  move_in_date: Yup.date().required('Required'),
  application_viewing_frequency: Yup.string().required('Required'),
  lease_period: Yup.object().required('Required'),
  rent: Yup.number().positive().required('Required'),
  accommodation_type: Yup.array().min(1, 'Required').required('Required'),
  // max_people_accommodation: Yup.number().positive().required('Required'),
  roommate: Yup.mixed().oneOf(['yes', 'no']).required('Required'),
  accommodation_description: Yup.string().nullable(),
  accommodation_pictures: Yup.array().nullable(),
  city: Yup.array().min(1, 'Required'),
  neighbourhood: Yup.string().nullable(),
  address: Yup.string().nullable(),
  number_residents: Yup.number().nullable(),
  vibes_and_residents: Yup.string().required('Required'),
  residents_pictures: Yup.array().nullable(),
  common_interests: Yup.string().nullable(),
  social_life_pictures: Yup.array().nullable(),
  estimated_monthly_utility_costs: Yup.number().min(0).required('Required'),
  monthly_house_dues: Yup.number().min(0).nullable(),
  security_deposit: Yup.number().min(0).nullable(),
  utilities_costs_description: Yup.string().nullable(),
  amenities: Yup.string().nullable(),
  amenities_pictures: Yup.array().nullable(),
  communal_duties: Yup.string().nullable(),
  pet_policy: Yup.string().required('Required'),
  more_about_pets: Yup.string().nullable(),
  logistics_and_neighborhood: Yup.string().nullable(),
  neighborhood_pictures: Yup.array().nullable(),
  parking: Yup.string().nullable(),
  parking_situation_details: Yup.string(),
  governance: Yup.string().nullable(),
  philosophy: Yup.string().nullable(),
  others_applications_requirements: Yup.string().nullable(),
  social_vibes: Yup.array().nullable(),
  food: Yup.array().nullable(),
  identity: Yup.array().nullable(),
  gender_preferences: Yup.array().nullable(),
  creativity: Yup.array().nullable(),
  occupation_types: Yup.array().nullable(),
  occupational_areas: Yup.array().nullable(),
  outdoor_activities: Yup.array().nullable(),
  sports: Yup.array().nullable(),
  passions: Yup.array().nullable(),
  feedback: Yup.string().nullable(),
  repost_source: Yup.string()
    .url()
    .nullable()
    .label('Original source of the post if reposted'),
});

// @TODO: Use a typed object instead of location.state.
interface Props {
  admin?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // 👈️ allows dynamic keys and values
}

export default function CoLivingForm(props: Props) {
  const navigate = useNavigate();

  const [existingImages, setExistingImages] = React.useState({
    coliving_pictures: props.colivingData
      ? props.colivingData.coliving_pictures
      : [],
    accommodation_pictures: props.colivingData
      ? props.colivingData.accommodation_pictures
      : [],
    social_life_pictures: props.colivingData
      ? props.colivingData.social_life_pictures
      : [],
    amenities_pictures: props.colivingData
      ? props.colivingData.amenities_pictures
      : [],
    neighborhood_pictures: props.colivingData
      ? props.colivingData.neighborhood_pictures
      : [],
    residents_pictures: props.colivingData
      ? props.colivingData.residents_pictures
      : [],
  });

  const [uploadedImages, setUploadedImages] = React.useState({
    coliving_pictures: props.uploadedImages
      ? props.uploadedImages.coliving_pictures
      : [],
    accommodation_pictures: props.uploadedImages
      ? props.uploadedImages.accommodation_pictures
      : [],
    social_life_pictures: props.uploadedImages
      ? props.uploadedImages.social_life_pictures
      : [],
    amenities_pictures: props.uploadedImages
      ? props.uploadedImages.amenities_pictures
      : [],
    neighborhood_pictures: props.uploadedImages
      ? props.uploadedImages.neighborhood_pictures
      : [],
    residents_pictures: props.uploadedImages
      ? props.uploadedImages.residents_pictures
      : [],
  });

  function getInitialValue(key: string): string | string[] | number | null {
    if (props.colivingData) {
      //error correction from migrated data
      if (
        ['application_viewing_frequency', 'pet_policy'].includes(key) &&
        Array.isArray(props.colivingData[key])
      )
        return props.colivingData[key][0];
      if (key === 'availability') return props.colivingData[key] + 1;
      return props.colivingData[key];
    }
    return '';
  }
  function changeExistingImages(category: string, newImages: object) {
    const newExistingImages = { ...existingImages };
    newExistingImages[category] = newImages;
    setExistingImages(newExistingImages);
  }
  function changeUploadedImages(category: string, newImages: object) {
    const newUploadedImages = { ...uploadedImages };
    newUploadedImages[category] = newImages;
    setUploadedImages(newUploadedImages);
  }
  return (
    <>
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
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          title: getInitialValue('title'),
          coliving_pictures: getInitialValue('coliving_pictures') || [],
          availability: getInitialValue('availability') || 'Immediate',
          move_in_date: getInitialValue('move_in_date'),
          application_viewing_frequency: getInitialValue(
            'application_viewing_frequency',
          ),
          lease_period: getInitialValue('lease_period') || { min: 1, max: 2 },
          rent: getInitialValue('rent'),
          accommodation_type: getInitialValue('accommodation_type') || [],
          // max_people_accommodation: getInitialValue('max_people_accommodation'),
          roommate: getInitialValue('roommate'),
          accommodation_description: getInitialValue(
            'accommodation_description',
          ),
          accommodation_pictures:
            getInitialValue('accommodation_pictures') || [],
          city: getInitialValue('city') || [],
          neighbourhood: getInitialValue('neighbourhood'),
          address: getInitialValue('address'),
          number_residents: getInitialValue('number_residents'),
          vibes_and_residents: getInitialValue('vibes_and_residents'),
          residents_pictures: getInitialValue('residents_pictures') || [],
          common_interests: getInitialValue('common_interests'),
          social_life_pictures: getInitialValue('social_life_pictures') || [],
          estimated_monthly_utility_costs: getInitialValue(
            'estimated_monthly_utility_costs',
          ),
          monthly_house_dues: getInitialValue('monthly_house_dues'),
          security_deposit: getInitialValue('security_deposit'),
          utilities_costs_description: getInitialValue(
            'utilities_costs_description',
          ),
          amenities: getInitialValue('amenities'),
          amenities_pictures: getInitialValue('amenities_pictures') || [],
          communal_duties: getInitialValue('communal_duties'),
          pet_policy: getInitialValue('pet_policy'),
          more_about_pets: getInitialValue('more_about_pets'),
          logistics_and_neighborhood: getInitialValue(
            'logistics_and_neighborhood',
          ),
          neighborhood_pictures: getInitialValue('neighborhood_pictures') || [],
          parking: getInitialValue('parking'),
          parking_situation_details: getInitialValue(
            'parking_situation_details',
          ),
          governance: getInitialValue('governance'),
          philosophy: getInitialValue('philosophy'),
          others_applications_requirements: getInitialValue(
            'others_applications_requirements',
          ),
          social_vibes: getInitialValue('social_vibes') || [],
          food: getInitialValue('food') || [],
          identity: getInitialValue('identity') || [],
          gender_preferences: getInitialValue('gender_preferences') || [],
          creativity: getInitialValue('creativity') || [],
          occupation_types: getInitialValue('occupation_types') || [],
          occupational_areas: getInitialValue('occupational_areas') || [],
          outdoor_activities: getInitialValue('outdoor_activities') || [],
          sports: getInitialValue('sports') || [],
          passions: getInitialValue('passions') || [],
          feedback: getInitialValue('feedback'),
          repost_source: getInitialValue('feedback'),
        }}
        validationSchema={validationSchema}
        // onSubmit={(values, { validate }) => validate(values)}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          validateForm,
          setFieldValue,
        }) => (
          <Form>
            <Fab
              variant="extended"
              color="default"
              sx={{
                position: 'fixed',
                bottom: '65px',
                right: '20px',
                zIndex: 100,
              }}
              onClick={async () => {
                validateForm().then((err) => {
                  console.log(err);
                  if (Object.keys(err).length !== 0) {
                    document
                      .getElementsByName(Object.keys(err)[0])[0]
                      .scrollIntoView({ block: 'center', behavior: 'smooth' });
                    return;
                  }

                  let oldApplicationRequirements = {
                    fields: [],
                    questions: {
                      default: [],
                      custom: [],
                    },
                  };
                  if (
                    props.colivingData &&
                    props.colivingData.applicationRequirements
                  ) {
                    oldApplicationRequirements =
                      props.colivingData.applicationRequirements;
                  }
                  navigate('/profile/co-living/application-requirements', {
                    state: {
                      admin: props.admin,
                      colivingData: values,
                      existingImages: existingImages,
                      uploadedImages: uploadedImages,
                      accessToken: props.accessToken,
                      oldApplicationRequirements: oldApplicationRequirements,
                      colivingID: props.colivingData
                        ? props.colivingData['_id']
                        : null,
                    },
                  });
                });
              }}
            >
              Next: application requirements
            </Fab>
            <Stack spacing={2} pb={'65px'}>
              <TextField
                // sx={{ my: 1 }}
                label="Headline*"
                name="title"
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={!!errors.title}
                helperText={errors.title ? errors.title : null}
                fullWidth
              />
              <ImageUploaderField
                title="Co-living pictures*:"
                name="coliving_pictures"
                existingImages={existingImages.coliving_pictures}
                setExistingImages={changeExistingImages}
                uploadedImages={uploadedImages.coliving_pictures}
                setUploadedImages={changeUploadedImages}
                formError={errors.coliving_pictures}
              />
              <DemoContainer components={['DatePicker']}>
                {/* this span anchor for scroll */}
                <span name="move_in_date"></span>
                <DatePicker
                  label="Earliest move-in date*"
                  value={dayjs(values.move_in_date)}
                  onChange={(val) => {
                    setFieldValue('move_in_date', val.$d);
                  }}
                  disablePast
                  fullWidth
                />
                {errors.move_in_date && (
                  <Typography
                    variant="caption"
                    component="p"
                    color="error"
                    sx={{ mt: '3px !important', ml: '14px !important' }}
                  >
                    {errors.move_in_date}
                  </Typography>
                )}
              </DemoContainer>
              <SelectField
                label="Availability*"
                name="availability"
                value={values.availability}
                onChange={handleChange}
                errors={errors}
                // error={errors.application_viewing_frequency && touched.application_viewing_frequency}
                // helperText={errors.application_viewing_frequency && touched.application_viewing_frequency ? errors.application_viewing_frequency : null}

                options={[
                  {
                    label: 'Immediate',
                    value: 4,
                  },
                  {
                    label: 'Open',
                    value: 3,
                  },
                  {
                    label: 'Waitlist',
                    value: 2,
                  },
                  {
                    label: 'Shut down',
                    value: 1,
                  },
                ]}
              />
              <SliderField
                label="Lease period* (months)"
                // name="lease_period"
                value={values.lease_period}
                onChange={(e) => {
                  setFieldValue('lease_period', {
                    min: e.target.value[0],
                    max: e.target.value[1],
                  });
                }}
                min={1}
                max={12}
              />

              <SelectField
                label="How often do you review applications?*"
                name="application_viewing_frequency"
                value={values.application_viewing_frequency}
                onChange={handleChange}
                errors={errors}
                // error={errors.application_viewing_frequency && touched.application_viewing_frequency}
                // helperText={errors.application_viewing_frequency && touched.application_viewing_frequency ? errors.application_viewing_frequency : null}

                options={[
                  {
                    label: 'Daily',
                  },
                  {
                    label: 'Weekly',
                  },
                  {
                    label: 'Close to move-in date',
                  },
                ]}
              />
              <TextField
                name="rent"
                label="Rent (excluding utilities)*"
                value={values.rent}
                onChange={handleChange}
                error={!!errors.rent}
                helperText={errors.rent ? errors.rent : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <CheckboxMultipleField
                label="Accommodation type*"
                name="accommodation_type"
                values={values.accommodation_type}
                errors={errors}
                // error={errors.accommodation_type && touched.accommodation_type}
                // helperText={errors.accommodation_type && touched.accommodation_type ? errors.accommodation_type : null}

                options={[
                  {
                    label: 'Private room',
                  },
                  {
                    label: 'Furnished',
                  },
                  {
                    label: 'Unfurnished',
                  },
                  {
                    label: 'Private bathroom',
                  },
                  {
                    label: 'Shared room',
                  },
                  {
                    label: 'Pods',
                  },
                  {
                    label: 'Private studio',
                  },
                  {
                    label: 'Private entrance',
                  },
                  {
                    label: 'Private house',
                  },
                  {
                    label: 'Private apartment',
                  },
                ]}
              />
              {/* <TextField
                name="max_people_accommodation"
                label="What’s the maximum number of people that can live inside this accommodation?*"
                value={values.max_people_accommodation}
                onChange={handleChange}
                error={!!errors.max_people_accommodation}
                helperText={
                  !!errors.max_people_accommodation
                    ? errors.max_people_accommodation
                    : null
                }
              /> */}
              <SelectField
                name="roommate"
                label="Is it single or double occupancy?*"
                value={values.roommate}
                onChange={handleChange}
                errors={errors}
                options={[
                  {
                    value: 'no',
                    label: 'Single',
                  },
                  {
                    value: 'yes',
                    label: 'Double',
                  },
                ]}
              />
              <ImageUploaderField
                title="Accommodation pictures:"
                name="accommodation_pictures"
                existingImages={existingImages.accommodation_pictures}
                setExistingImages={changeExistingImages}
                uploadedImages={uploadedImages.accommodation_pictures}
                setUploadedImages={changeUploadedImages}
              />
              <CheckboxMultipleField
                label="Location*"
                name="city"
                values={values.city}
                errors={errors}
                // error={errors.accommodation_type && touched.accommodation_type}
                // helperText={errors.accommodation_type && touched.accommodation_type ? errors.accommodation_type : null}

                options={[
                  {
                    label: 'San Francisco',
                  },
                  {
                    label: 'Oakland',
                  },
                  {
                    label: 'Berkeley',
                  },
                  {
                    label: 'Daly City',
                  },
                  {
                    label: 'Alameda',
                  },
                  {
                    label: 'East Bay',
                  },
                  {
                    label: 'South Bay',
                  },
                  {
                    label: 'Peninsula',
                  },
                  {
                    label: 'North Bay',
                  },
                ]}
              />
              {values.city.length > 0 && (
                <TextField
                  name="neighbourhood"
                  label="Neighbourhood"
                  value={values.neighbourhood}
                  onChange={handleChange}
                />
              )}
              <TextField
                name="address"
                label="Full address (not public) "
                value={values.address}
                onChange={handleChange}
              />
              <TextField
                name="number_residents"
                label="Number of residents including residents you are looking for"
                value={values.number_residents}
                onChange={handleChange}
              />
              <TextField
                name="vibes_and_residents"
                label="Vibes and residents* (2000 characters)"
                value={values.vibes_and_residents}
                onChange={handleChange}
                error={!!errors.vibes_and_residents}
                helperText={
                  errors.vibes_and_residents ? errors.vibes_and_residents : null
                }
                rows={4}
                multiline
              />
              <ImageUploaderField
                title="Residents pictures:"
                name="residents_pictures"
                existingImages={existingImages.residents_pictures}
                setExistingImages={changeExistingImages}
                uploadedImages={uploadedImages.residents_pictures}
                setUploadedImages={changeUploadedImages}
              />
              <TextField
                name="common_interests"
                label="Common interests* (2000 characters)"
                value={values.common_interests}
                onChange={handleChange}
                rows={4}
                multiline
                error={!!errors.common_interests}
                helperText={
                  errors.common_interests ? errors.common_interests : null
                }
              />
              <ImageUploaderField
                title="Showcase your social life:"
                name="social_life_pictures"
                existingImages={existingImages.social_life_pictures}
                setExistingImages={changeExistingImages}
                uploadedImages={uploadedImages.social_life_pictures}
                setUploadedImages={changeUploadedImages}
              />
              <TextField
                name="estimated_monthly_utility_costs"
                label="Estimated monthly utility costs*"
                value={values.estimated_monthly_utility_costs}
                onChange={handleChange}
                type="number"
                error={!!errors.estimated_monthly_utility_costs}
                helperText={
                  errors.estimated_monthly_utility_costs
                    ? errors.estimated_monthly_utility_costs
                    : null
                }
              />
              <TextField
                name="monthly_house_dues"
                label="Monthly house dues (if applicable)"
                value={values.monthly_house_dues}
                onChange={handleChange}
                error={!!errors.monthly_house_dues}
                helperText={
                  errors.monthly_house_dues ? errors.monthly_house_dues : null
                }
                type="number"
              />
              <TextField
                name="security_deposit"
                label="Security deposit if any"
                value={values.security_deposit}
                onChange={handleChange}
                error={!!errors.security_deposit}
                helperText={
                  errors.security_deposit ? errors.security_deposit : null
                }
                type="number"
              />
              <TextField
                name="utilities_costs_description"
                label="Utilities and other costs description*"
                value={values.utilities_costs_description}
                onChange={handleChange}
                rows={4}
                multiline
                error={!!errors.utilities_costs_description}
                helperText={
                  errors.utilities_costs_description
                    ? errors.utilities_costs_description
                    : null
                }
              />
              <TextField
                name="amenities"
                label="Amenities (2000 characters)"
                value={values.amenities}
                onChange={handleChange}
                rows={4}
                multiline
                error={!!errors.amenities}
                helperText={errors.amenities ? errors.amenities : null}
              />
              <ImageUploaderField
                title="Amenities pictures:"
                name="amenities_pictures"
                existingImages={existingImages.amenities_pictures}
                setExistingImages={changeExistingImages}
                uploadedImages={uploadedImages.amenities_pictures}
                setUploadedImages={changeUploadedImages}
              />
              <TextField
                name="communal_duties"
                label="Communal duties
                House meetings
                House responsibilities"
                value={values.communal_duties}
                onChange={handleChange}
                rows={4}
                multiline
                error={!!errors.communal_duties}
                helperText={
                  errors.communal_duties ? errors.communal_duties : null
                }
              />
              <SelectField
                name="pet_policy"
                label="Pet policy*"
                value={values.pet_policy}
                onChange={handleChange}
                errors={errors}
                options={[
                  {
                    // value: 'daily',
                    label: 'New pets are welcome',
                  },
                  {
                    // value: 'weekly',
                    label: 'Has pets, but does not accept more',
                  },
                  {
                    // value: 'close',
                    label: 'No pets allowed',
                  },
                ]}
              />
              <TextField
                name="more_about_pets"
                label="More about pets"
                value={values.more_about_pets}
                onChange={handleChange}
                rows={4}
                multiline
                error={!!errors.more_about_pets}
                helperText={
                  errors.more_about_pets ? errors.more_about_pets : null
                }
              />
              <TextField
                name="logistics_and_neighborhood"
                label="Details about logistics and neighborhood"
                value={values.logistics_and_neighborhood}
                onChange={handleChange}
                error={!!errors.logistics_and_neighborhood}
                helperText={
                  errors.logistics_and_neighborhood
                    ? errors.logistics_and_neighborhood
                    : null
                }
                rows={4}
                multiline
              />
              <ImageUploaderField
                title="Show us your neighborhood:"
                name="neighborhood_pictures"
                existingImages={existingImages.neighborhood_pictures}
                setExistingImages={changeExistingImages}
                uploadedImages={uploadedImages.neighborhood_pictures}
                setUploadedImages={changeUploadedImages}
              />
              <SelectField
                label="Parking"
                name="parking"
                value={values.parking}
                onChange={handleChange}
                errors={errors}
                options={[
                  {
                    label: 'Driveway parking',
                  },
                  {
                    label: 'Garage parking',
                  },
                  {
                    label: 'Street parking only',
                  },
                ]}
              />
              <TextField
                name="parking_situation_details"
                label="Parking situation details"
                value={values.parking_situation_details}
                onChange={handleChange}
                error={!!errors.parking_situation_details}
                helperText={
                  errors.parking_situation_details
                    ? errors.parking_situation_details
                    : null
                }
              />
              <TextField
                name="governance"
                label="Governance"
                value={values.governance}
                onChange={handleChange}
                error={!!errors.governance}
                helperText={errors.governance ? errors.governance : null}
                multiline
                rows={4}
              />
              <TextField
                name="philosophy"
                label="Philosophy"
                value={values.philosophy}
                onChange={handleChange}
                error={!!errors.philosophy}
                helperText={errors.philosophy ? errors.philosophy : null}
                multiline
                rows={4}
              />
              <TextField
                name="others_applications_requirements"
                label="Applications requirements, e.g. credit score"
                value={values.others_applications_requirements}
                onChange={handleChange}
                error={!!errors.others_applications_requirements}
                helperText={
                  errors.others_applications_requirements
                    ? errors.others_applications_requirements
                    : null
                }
                multiline
                rows={4}
              />

              {/* TODO decide whether the accommodation_description field needs to be temporarily named differently externally */}
              <TextField
                name="accommodation_description"
                label="Other details"
                value={values.accommodation_description}
                onChange={handleChange}
                rows={4}
                multiline
              />
              <TextField
                name="repost_source"
                label="Original source of the post if reposted"
                value={values.repost_source}
                onChange={handleChange}
                error={!!errors.repost_source}
                helperText={errors.repost_source ? errors.repost_source : null}
              />
              <Typography variant="subtitle2" color="initial">
                What is your place like?
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
                    value: 'nonprofit_projects',
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
              {/* temporarily */}
              {/* <TextField
                name="we_forget_anything"
                label="Did we forget anything?"
                value={values.feedback}
                onChange={handleChange}
                rows={4}
                helperText={
                  'Write us a private note so we can add a section or a tag or anything else you think is important to the form!'
                }
                multiline
              /> */}
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
