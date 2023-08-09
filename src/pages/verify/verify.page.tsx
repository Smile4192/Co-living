import { placeholderApi } from '@/api/axios-instance';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const [verified, setVerified] = React.useState(false);
  const [setError] = React.useState('');
  const navigate = useNavigate();

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
  React.useEffect(() => {
    async function verifyCode() {
      const code = searchParams.get('code');

      let token;
      try {
        token = await getToken();
      } catch (err) {
        window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${encodeURIComponent(
          `${window.location.origin}/verifyEmail?code=` + code,
        )}&scope=openid%20profile%20email`;
        console.log(err);
      }
      console.log(token);
      await placeholderApi
        .get(`/verifyEmail?code=${code}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if ('error' in result.data) {
            setError(result.data.error);
            return;
          }
          setVerified(true);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          return;
        });
    }
    verifyCode();
  }, []);
  return (
    <div>
      <p>{verified ? 'Verified!' : 'Verifying...'}</p>
    </div>
  );
}
