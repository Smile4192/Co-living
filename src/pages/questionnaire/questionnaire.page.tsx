import Hero from '@/shared/components/layout/hero.component';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FieldBuilder from './components/field-builder.component';

import { placeholderApi } from '@/api/axios-instance';
import jwtEncode from 'jwt-encode';
import authApi from '@/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/store/modules/auth/auth.slice';

const stepsTemplate = [
  {
    key: '',
    label: 'Loading questionnaire. . .',
    type: 'textarea',
    options: null,
    min: null,
    max: null,
    initialValue: '',
  },
];

export default function QuestionnairePage() {
  const { id } = useParams();
  const { token } = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [steps, setSteps] = useState(stepsTemplate);
  const [currentStep, setCurrentStep] = useState(0);
  const jwtSecret =
    'c314be28383c94f7ad9bdc3f9607288a17e92db67627fb8a9d1aaddf90385ec4';

  const redirectUri = encodeURIComponent(window.location.origin);

  const [answers, setAnswers] = useState(
    steps.map((item) => ({
      key: item.key,
      label: item.label,
      value: item.initialValue,
    })),
  );
  const handleChange = ({ value }: { value: string }) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: {
        key: steps[currentStep].key,
        label: steps[currentStep].label,
        value,
      },
    }));
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      const token = await getToken();
      if (token === null) {
        // User is not signed in
        const jwt = jwtEncode(answers, jwtSecret);
        window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${redirectUri}&scope=openid%20profile%20email&audience=${encodeURIComponent(
          'https://api.feliciti.co',
        )}&application=${jwt}&colivingID=${id}&state=applied${id}&screen_hint=signup`;
        return;
      }
      const result = await placeholderApi.post(
        `/submitApplication/${id}`,
        answers,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(result.data);
      //clear cache rtk query
      dispatch(authApi.util.invalidateTags([{ type: 'Auth', id: 'PROFILE' }]));
      navigate(`/${id}?applied=true`);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  async function getToken() {
    const token = localStorage.getItem('accessToken');
    const issueTime = localStorage.getItem('issueTime');
    if (token !== null && issueTime !== null) {
      // implement token expiration detection later
      const expirationNotice = parseInt(issueTime) + 14 * 86400000;
      if (Date.now() > expirationNotice) {
        return null;
      }
      return token;
    } else {
      return null;
    }
  }
  useEffect(() => {
    async function getApplication() {
      const token = await getToken();
      console.log(id);
      const result = await placeholderApi.get(`/startApplication/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      if (!('error' in result.data)) {
        setSteps(result.data.application);
        const newAnswers = result.data.application.map((item) => ({
          key: item.key,
          label: item.label,
          value: item.initialValue,
        }));
        setAnswers(newAnswers);
      }
    }
    getApplication();
  }, []);

  return (
    <Hero
      navbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card variant="outlined">
        <CardHeader
          title={steps[currentStep].label}
          subheader={`${currentStep + 1}/${steps.length}`}
        />
        <CardContent>
          <FieldBuilder
            type={steps[currentStep].type}
            value={answers[currentStep].value}
            options={steps[currentStep].options}
            onChange={handleChange}
            min={steps[currentStep].min}
            max={steps[currentStep].max}
            placeholder={steps[currentStep].placeholder}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleNext}
            disabled={
              !answers[currentStep].value || !answers[currentStep].value.length
            }
            sx={{ whiteSpace: 'nowrap' }}
          >
            {currentStep === steps.length - 1
              ? token
                ? 'Submit'
                : 'To submit your application, please sign up'
              : 'Answer'}
          </Button>
        </CardActions>
      </Card>
      {/* <div>{JSON.stringify(answers)}</div> */}
    </Hero>
  );
}
