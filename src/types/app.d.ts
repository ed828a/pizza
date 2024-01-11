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

type CategoryType = {
  name: string;
};

type AddonType = {
  id?: string;
  name: string;
  price: string;
};

type MenuItemType = {
  id?: string | null;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string;
  sizes: AddonType[];
  extraIngredients: AddonType[];
  bestSeller: boolean;
};
