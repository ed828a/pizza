type InputUser = {
  name?: string;
  email?: string;
  password?: string;
};

type CredentialState = {
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  message: string;
  data?: undefined;
  isError: boolean;
};
