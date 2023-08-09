import { placeholderApi } from '@/api/axios-instance';
import jwt from 'jwt-decode';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const textAreaStyle = {
  marginTop: 20,
  width: 300,
  height: 50,
  borderRadius: 10,
  borderWidth: 1,
  fontSize: '16px',
  padding: 10,
};

export default function AuthPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [source, setSource] = useState('');
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');
  async function handleSubmit() {
    if (
      firstName === '' ||
      lastName === '' ||
      phoneNumber === '' ||
      source === ''
    ) {
      setErrorMessage('Please fill out all fields above.');
      return;
    }
    const token = searchParams.get('session_token');
    const state = searchParams.get('state');
    console.log(token);
    const userData: object = jwt(token || '');
    const userID = userData.sub;
    const data = {
      id: userID,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      source: source,
    };
    console.log(data);
    const result = await placeholderApi.post('/continueAuth', data);
    console.log(result.data);
    location.href = `https://feliciti-auth.us.auth0.com/continue?state=${state}`;
  }
  return (
    <div style={{ width: 300, margin: 'auto' }}>
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
        Almost Done! Just a few quick questions.
      </p>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          style={textAreaStyle}
          value={firstName}
          placeholder="First name"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text"
          style={textAreaStyle}
          value={lastName}
          placeholder="Last name"
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type="text"
          style={textAreaStyle}
          value={phoneNumber}
          placeholder="Phone number"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <input
          type="text"
          style={textAreaStyle}
          value={source}
          placeholder="Where did you hear about us?"
          onChange={(event) => setSource(event.target.value)}
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
