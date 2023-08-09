import { placeholderApi } from '@/api/axios-instance';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const textAreaStyle = {
  marginTop: 20,
  width: 300,
  height: 50,
  borderRadius: 10,
  borderWidth: 1,
  fontSize: '16px',
  padding: 10,
};

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function getToken() {
    const hashString = window.location.hash;
    console.log(hashString);
    if (hashString === '') {
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
    } else {
      const token = hashString.split('&')[0].split('=')[1];
      console.log(token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('issueTime', Date.now().toString());
      return token;
    }
  }

  async function handleSubmit() {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (password.toLowerCase() === password) {
      setErrorMessage(
        'Password must contain at least one uppercase character.',
      );
      return;
    }
    if (password.toUpperCase() === password) {
      setErrorMessage(
        'Password must contain at least one lowercase character.',
      );
      return;
    }
    if (!/\d/.test(password)) {
      setErrorMessage('Password must contain at least one number.');
      return;
    }
    const token = await getToken();
    if (token === null) {
      navigate('/sign-in');
      return;
    }
    const result = await placeholderApi.post(
      '/changePassword',
      { newPassword: password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (result.data.success === true) {
      navigate('/profile');
      return;
    } else {
      setErrorMessage(result.data.message);
      return;
    }
  }

  return (
    <div style={{ margin: 'auto', width: 300 }}>
      <p
        style={{
          width: 300,
          textAlign: 'center',
          marginTop: 60,
          marginBottom: -10,
          fontSize: '30px',
          fontWeight: 'bold',
        }}
      >
        Please reset your password.
      </p>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="password"
          style={textAreaStyle}
          value={password}
          placeholder="Enter a new password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          style={textAreaStyle}
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <p
          style={{
            width: 300,
            textAlign: 'left',
            color: 'red',
            fontSize: '20px',
            marginBottom: -10,
            marginTop: 7,
            display: errorMessage.length === 0 ? 'none' : 'block',
          }}
        >
          {errorMessage}
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            background: '#c94f36',
            height: 60,
            borderRadius: 10,
            width: 300,
            marginTop: 20,
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
