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

type ProfileType = {
  name: string;
  email: string;
  image: string;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
  role: string;
};
