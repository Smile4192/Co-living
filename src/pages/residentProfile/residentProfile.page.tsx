import { placeholderApi } from '@/api/axios-instance';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResidentProfilePage() {
  const navigate = useNavigate();
  const params = useParams();

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
    async function getApplication() {
      let token;
      try {
        token = await getToken();
      } catch (err) {
        console.log(err);
      }
      const userID = params.userID;
      const colivingID = params.colivingID;
      const link = colivingID
        ? `/getResidentProfile/${userID}/${colivingID}`
        : `/getResidentProfile/${userID}`;
      placeholderApi
        .get(link, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getApplication();
  }, []);
  return <p>Application page</p>;
}
