// We need to not use `location.state` to avoid this.
/* eslint-disable react/prop-types */
import { useLoginEmailMutation } from '@/api/auth.api';
import { placeholderApi } from '@/api/axios-instance';
import CheckboxMultipleField from '@/shared/components/form/checkbox-multiple.component';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Data from './questionnaire-data';
import QuestionsBuilder from './questions-builder.component';

const validationSchema = Yup.object({
  application_requirements: Yup.array(),
});

// @TODO: Use a typed object instead of location.state.
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // 👈️ allows dynamic keys and values
}
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

const baseRequirements = [
  {
    key: 'occupation',
    label: 'Occupation',
    type: 'string',
    placeholder: 'Dance Artist, UX Designer, etc',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    key: 'description',
    label: 'Short Bio',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    key: 'move_in_date',
    label: 'Earliest Move-in Date',
    type: 'checklist',
    initialValue: '',
    options: [
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
    ],
    min: null,
    max: null,
  },
  {
    key: 'lease_period',
    label: 'Lease Period',
    type: 'checklist',
    initialValue: '',
    options: [
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
    ],
    min: null,
    max: null,
  },
  {
    key: 'has_pets',
    label: 'Are you bringing any pets?',
    type: 'select',
    initialValue: '',
    options: [
      {
        label: 'Yes',
      },
      {
        label: 'No',
      },
    ],
    min: null,
    max: null,
  },
  {
    key: 'is_bringing_roommates',
    label: 'Are you bringing any roommates?',
    type: 'select',
    initialValue: '',
    options: [
      {
        label: 'Yes',
      },
      {
        label: 'No',
      },
    ],
    min: null,
    max: null,
  },
];
interface ColivingData {
  coliving_pictures: [];
  accommodation_pictures: [];
  residents_pictures: [];
  social_life_pictures: [];
  amenities_pictures: [];
  neighborhood_pictures: [];
  applicationRequirements: {
    fields: [];
    questions: {
      default: [];
      custom: [];
    };
  };
  //other coliving fields
  [key: string]: string | Array<string> | number | object;
}
export default function CoLivingForm(props: Props) {
  const [loginEmail] = useLoginEmailMutation();
  const navigate = useNavigate();
  console.log(props);
  function createColivingData() {
    const colivingData: ColivingData = { ...props.colivingData };
    colivingData.availability = props.colivingData.availability - 1;
    colivingData.coliving_pictures = props.existingImages.coliving_pictures;
    colivingData.accommodation_pictures =
      props.existingImages.accommodation_pictures;
    colivingData.residents_pictures = props.existingImages.residents_pictures;
    colivingData.social_life_pictures =
      props.existingImages.social_life_pictures;
    colivingData.amenities_pictures = props.existingImages.amenities_pictures;
    colivingData.neighborhood_pictures =
      props.existingImages.neighborhood_pictures;
    colivingData.applicationRequirements = props.oldApplicationRequirements;
    colivingData['_id'] = props.colivingID;
    console.log(colivingData);
    return colivingData;
  }
  function getDefaultQuestions() {
    const arr = [];
    if (props.colivingData && props.oldApplicationRequirements) {
      for (const question of props.oldApplicationRequirements.questions
        .default) {
        arr.push(question.label);
      }
    }
    return arr;
  }

  const [customQuestions, setCustomQuestions] = useState(
    props.oldApplicationRequirements
      ? props.oldApplicationRequirements.questions.custom
      : [],
  );

  return (
    <>
      <Fab
        variant="extended"
        color="default"
        aria-label=""
        sx={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 100,
        }}
        onClick={() =>
          navigate('/profile/co-living/add', {
            state: {
              colivingData: createColivingData(),
              accessToken: props.accessToken,
              uploadedImages: props.uploadedImages,
            },
          })
        }
      >
        Back
      </Fab>
      <Formik
        initialValues={{
          default: getDefaultQuestions(),
        }}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          loginEmail(values).then(() => {
            navigate('/profile');
          })
        }
      >
        {({ values }) => (
          <Form>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 100,
                boxShadow: 10,
              }}
              onClick={async () => {
                const token = props.accessToken;
                const formData = new FormData();
                // Adding all images to the form
                for (
                  let i = 0;
                  i < props.uploadedImages.coliving_pictures?.length;
                  i++
                ) {
                  console.log(props.uploadedImages.coliving_pictures[i]);
                  formData.append(
                    'coliving_pictures',
                    props.uploadedImages.coliving_pictures[i].file,
                  );
                }
                for (
                  let i = 0;
                  i < props.uploadedImages.accommodation_pictures?.length;
                  i++
                ) {
                  formData.append(
                    'accommodation_pictures',
                    props.uploadedImages.accommodation_pictures[i].file,
                  );
                }
                for (
                  let i = 0;
                  i < props.uploadedImages.residents_pictures?.length;
                  i++
                ) {
                  formData.append(
                    'residents_pictures',
                    props.uploadedImages.residents_pictures[i].file,
                  );
                }
                for (
                  let i = 0;
                  i < props.uploadedImages.social_life_pictures?.length;
                  i++
                ) {
                  formData.append(
                    'social_life_pictures',
                    props.uploadedImages.social_life_pictures[i].file,
                  );
                }
                for (
                  let i = 0;
                  i < props.uploadedImages.amenities_pictures?.length;
                  i++
                ) {
                  formData.append(
                    'amenities_pictures',
                    props.uploadedImages.amenities_pictures[i].file,
                  );
                }
                for (
                  let i = 0;
                  i < props.uploadedImages.neighborhood_pictures?.length;
                  i++
                ) {
                  formData.append(
                    'neighborhood_pictures',
                    props.uploadedImages.neighborhood_pictures[i].file,
                  );
                }
                const colivingData = { ...props.colivingData };
                colivingData.availability--;
                if (!colivingData.applicationRequirements)
                  colivingData.applicationRequirements = {
                    fields: baseRequirements,
                    questions: {},
                  };
                const idxList = Data.map((item) => item.label);
                colivingData.applicationRequirements.questions.default = [
                  ...values.default.map(
                    (label) => Data[idxList.indexOf(label)],
                  ),
                ];
                colivingData.applicationRequirements.questions.custom = [
                  ...customQuestions,
                ];
                console.log(colivingData.applicationRequirements);

                colivingData.coliving_pictures =
                  props.existingImages.coliving_pictures;
                colivingData.accommodation_pictures =
                  props.existingImages.accommodation_pictures;
                colivingData.residents_pictures =
                  props.existingImages.residents_pictures;
                colivingData.social_life_pictures =
                  props.existingImages.social_life_pictures;
                colivingData.amenities_pictures =
                  props.existingImages.amenities_pictures;
                colivingData.neighborhood_pictures =
                  props.existingImages.neighborhood_pictures;
                formData.append(
                  'colivingListing',
                  JSON.stringify(colivingData),
                );

                let endpoint = '/createColivingListing';
                if (props.colivingID) {
                  endpoint = '/editColivingListing';
                  if (props.admin) {
                    endpoint += '/admin';
                  }
                  formData.append('colivingID', props.colivingID);
                }
                console.log(colivingData);
                const result = await placeholderApi.post(endpoint, formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                  },
                });
                console.log(result.data);
                if (props.colivingID && props.admin) {
                  navigate('/' + props.colivingID);
                } else {
                  navigate('/profile');
                }
              }}
            >
              Save
              {props.admin && <Typography variant="caption">:admin</Typography>}
            </Button>
            <Stack spacing={2}>
              <CheckboxMultipleField
                // values={values.application_requirements}
                // name="application_requirements"
                values={values.default}
                // label="Choose the questions you want the applicant to answer."
                name="default"
                dense={false}
                options={Data}
              />
            </Stack>
          </Form>
        )}
      </Formik>
      <QuestionsBuilder value={customQuestions} onChange={setCustomQuestions} />
    </>
  );
}
