// app/address/page.js

"use client";

import MainLayout from "../layouts/MainLayout";
import TextInput from "../components/TextInput";
import { useEffect, useState } from "react";
import { useUser } from "../context/user";
import useIsLoading from "../hooks/useIsLoading";
import useCreateAddress from "../hooks/useCreateAddress";
import useUserAddress from "../hooks/useUserAddress";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ClientOnly from "@/components/ClientOnly";
import { createClient } from "@/utils/supabase/client";

export default function AddressPage() {
  // Changed from Home to AddressPage
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUser();

  // Add loading state for initial user check
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [addressId, setAddressId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [error, setError] = useState({});

  // Enhanced error handling
  const showError = (type) => {
    return error?.type === type ? error.message : "";
  };

  // Add client-side user verification
  useEffect(() => {
    const verifyUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setIsLoadingUser(false);
    };
    verifyUser();
  }, [supabase, router]);

  const getAddress = async () => {
    if (!user?.id) {
      useIsLoading(false);
      return;
    }

    try {
      const response = await useUserAddress();
      if (response) {
        setTheCurrentAddress(response);
      }
    } finally {
      useIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoadingUser && user?.id) {
      useIsLoading(true);
      getAddress();
    }
  }, [user, isLoadingUser]);

  const setTheCurrentAddress = (result) => {
    setAddressId(result.id);
    setName(result.name);
    setAddress(result.address);
    setZipcode(result.zipcode);
    setCity(result.city);
    setCountry(result.country);
  };

  const validate = () => {
    const errors = [];
    if (!name) errors.push({ type: "name", message: "A name is required" });
    if (!address)
      errors.push({ type: "address", message: "An address is required" });
    if (!zipcode)
      errors.push({ type: "zipcode", message: "A zipcode is required" });
    if (!city) errors.push({ type: "city", message: "A city is required" });
    if (!country)
      errors.push({ type: "country", message: "A country is required" });

    if (errors.length > 0) {
      setError(errors[0]);
      return true;
    }
    return false;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (validate()) return;

    try {
      setIsUpdatingAddress(true);

      const response = await useCreateAddress({
        addressId,
        name,
        address,
        zipcode,
        city,
        country,
      });

      setTheCurrentAddress(response);
      toast.success("Address updated!", { autoClose: 3000 });
      router.push("/checkout");
    } catch (error) {
      toast.error(error.message || "Failed to update address");
    } finally {
      setIsUpdatingAddress(false);
    }
  };

  if (isLoadingUser) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div id="AddressPage" className="mt-4 max-w-[600px] mx-auto px-2">
        <div className="mx-auto bg-white rounded-lg p-3">
          <h1 className="text-xl font-bold mb-2">Address Details</h1>

          <form onSubmit={submit}>
            {/* Keep your existing form fields */}
            {/* Add error boundaries around each input */}
            <ClientOnly>
              <div className="mb-4">
                <TextInput
                  className="w-full"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  error={showError("name")}
                />
              </div>
            </ClientOnly>

            {/* Repeat for other fields */}

            <button
              type="submit"
              disabled={isUpdatingAddress}
              className={`mt-6 w-full text-white text-lg font-semibold p-3 rounded ${
                isUpdatingAddress ? "bg-blue-800" : "bg-blue-600"
              }`}
            >
              {isUpdatingAddress ? (
                <div className="flex items-center justify-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Please wait...
                </div>
              ) : (
                "Update Address"
              )}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
