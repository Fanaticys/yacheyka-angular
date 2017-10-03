interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'soxU56hDrg1ZS6ZqLybMsvId42RYM2Je',
  domain: 'fanaticys.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback',
  // callbackURL: 'https://yacheyka-fanaticys.c9users.io/callback',
  apiUrl: "test-api"
};
