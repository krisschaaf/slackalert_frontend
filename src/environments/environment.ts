const apiUri = 'http://localhost:8080/';

export const environment = {
  production: false,
  backendBasePath: apiUri,
  auth: {
    domain: "dev-4nh7halvbtq2krkc.eu.auth0.com",
    clientId: "917BSCnnvNCx5we7QIPUAKgvPYVxtQVs",
    audience: "https://spring-api.com",
    redirectUri: "http://localhost:4200/config",
    errorPath: "/error",
  },
  httpInterceptor: {
    allowedList: [`${apiUri}*`],
  },
};

