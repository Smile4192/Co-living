import React from 'react';
import { persistor, store } from '@/store';
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';

ReactDOM.render(
  <Auth0Provider
    domain="feliciti-auth.us.auth0.com"
    clientId="lgHDiWF8qtGaybRILbGRBp9chpz6NxuL"
    authorizationParams={{
      redirect_uri: window.location.origin,
      scope: 'openid profile email offline_access',
    }}
    cacheLocation="localstorage"
    useRefreshTokens={true}
    useRefreshTokensFallback={true}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App nodeEnv={process.env.NODE_ENV} />
      </PersistGate>
    </Provider>
  </Auth0Provider>,
  document.getElementById('root'),
);
