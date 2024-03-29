"use client";

import React, { FormEvent, useContext, useEffect, useState } from "react";
import SectionHeader from "../menu/SectionHeader";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../contexts/CartContextProvider";
import { toast } from "react-toastify";
import AddressInputs from "./AddressInputs";
import { Button } from "../ui/button";

type Props = {
  profile: Partial<ProfileType>;
};

const CartContent = ({ profile }: Props) => {
  const { cartProducts, removeOneProductOutOfCart } = useContext(
    CartContext
  ) as CartContextType;

  const [addressInfo, setAddressInfo] = useState<Partial<UserType>>({
    phone: profile.phone,
    streetAddress: profile.streetAddress,
    city: profile.city,
    postcode: profile.postcode,
    country: profile.country,
  });
  console.log("CartContent profile", profile);
  console.log("CartContent addressInfo", addressInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("cancelled=1")) {
        //  if a toast with the specified id ('one-toast' in this case) is already active, calling toast.error with the same id will update the existing toast rather than creating a new one.
        toast.error("Payment failed.😢", { toastId: "one-toast" });
      }
    }
  }, []);

  const getSubPrice = (product: any) => {
    let selectedPrice = product.basePrice;
    if (product.size) {
      selectedPrice =
        Math.floor(selectedPrice) + Math.floor(product.size.price);
    }
    if (product.extras.length > 0) {
      for (const extra of product.extras) {
        selectedPrice += Math.floor(extra.price);
      }
    }
    return selectedPrice;
  };

  let subTotalPrice: number = 0;

  const proceedToCheckout = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // address and shopping cart
    const checkoutPromise = fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        address: addressInfo,
        cartProducts,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((link) => {
        // redirect to stripe payment default page, here you can't use useRouter, because it links to a third-party.
        window.location = link;
      });

    const response = toast.promise(checkoutPromise, {
      pending: "Preparing your order...",
      success: "Redirecting to payment",
      error: "Something went wrong, try again later.",
    });

    console.log("proceedToCheckout response", response);
  };

  const deliveryFee = cartProducts.length > 0 ? 5 : 0;

  if (cartProducts.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeader mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty😌</p>
      </section>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="text-center ">
        <SectionHeader mainHeader="Cart" />
      </div>
      <div className="grid sm:grid-cols-2 gap-24 mt-8">
        <div className="">
          {cartProducts.length === 0 && (
            <div className="">No products in your shopping cart.</div>
          )}
          {cartProducts.length > 0 &&
            cartProducts.map((product, index) => {
              subTotalPrice += Math.floor(getSubPrice(product));
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b py-2 mb-4 "
                >
                  <div className="w-24">
                    <Image
                      width={240}
                      height={240}
                      src={product.image}
                      alt=""
                    />
                  </div>
                  <div className="grow">
                    <div className="font-semibold">{product.name}</div>
                    {product.size && (
                      <div className="text-xs text-gray-500">
                        Size: <span>{product.size.name}</span>
                      </div>
                    )}
                    {product.extras?.length > 0 && (
                      <div className="flex">
                        <div className="">
                          {product.extras.map((extra: any, index: number) => (
                            <div key={index} className="text-xs text-gray-500">
                              extra {extra.name} ${extra.price}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold">
                    ${product.subPrice || getSubPrice(product)}
                  </div>
                  <div className="ml-2">
                    <Button
                      className="p-2 bg-inherit text-gray-600 border border-gray-300 hover:border-primary hover:text-primary hover:bg-white"
                      type="button"
                      onClick={() => removeOneProductOutOfCart(index)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          <div className="flex justify-end py-4  ">
            <div className="ml-auto pr-16 flex flex-col gap-y-2 text-lg">
              <div className="flex justify-between gap-8">
                <span className="text-gray-500">Subtotal: </span>
                <span className=" font-semibold text-2xl">
                  ${subTotalPrice}
                </span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-gray-500">Delivery: </span>
                <span className="font-semibold text-2xl">${deliveryFee}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-gray-500">Total: </span>
                <span className="font-semibold text-2xl">
                  ${Math.floor(subTotalPrice) + deliveryFee}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 px-4 pt-8 pb-10 rounded-lg">
          <h2 className="font-semibold text-primary text-xl ml-2 mb-2">
            Checkout
          </h2>
          <form onSubmit={(ev) => proceedToCheckout(ev)}>
            <AddressInputs
              userState={addressInfo}
              setUserState={setAddressInfo}
            />
            <Button
              type="submit"
              className="w-full border border-primary hover:bg-inherit hover:text-primary mt-8"
            >
              Pay ${Math.floor(subTotalPrice) + deliveryFee}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
