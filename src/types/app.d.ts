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

type CartContextType = {
  cartProducts: any[];
  setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
  addToCart: (
    product: any,
    subPrice: number,
    size?: AddonType | null,
    extras?: AddonType[]
  ) => void;
  removeOneProductOutOfCart: (indexToRemove: number) => void;
  clearCart: () => void;
};

type CartProductType = {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string;
  bestSeller: boolean;
  product: any;
  subPrice: number;
  size: SizeType | null;
  extras: SizeType[] | null;
};

type UserType = {
  _id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
  admin: boolean;
};

type PartialUser = Partial<UserType>;

type OrderType = {
  userEmail: string;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
  cartProducts: CartProductType[];
  paid: boolean;
};

type PartialOrder = Partial<OrderType>;
