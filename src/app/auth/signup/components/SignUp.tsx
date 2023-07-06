"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

type InputErrors = {
  [key: string]: string;
};
type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export const getErrorMsg = (key: string, errors: InputErrors[]) => {
  if (errors.find((err) => err.hasOwnProperty(key) !== undefined)) {
    const errorObj = errors.find((err) => err.hasOwnProperty(key));
    return errorObj && errorObj[key];
  }
};

export default function SignUp({}: Props) {
  const [validateErrors, setValidateErrors] = useState<InputErrors[]>([]);
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState<boolean>(false);
  const [userRegistered, setRegistered] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params ? (params.get("callbackUrl") as string) : "/";

  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validateData = (): boolean => {
    const err = [];
    if (registerData.name.length < 4) {
      err.push({ name: "Name must be at least 4 characters long" });
    } else if (registerData.name.length > 30) {
      err.push({ name: "Full name should be less than 30 characters" });
    } else if (registerData.password.length < 3) {
      err.push({ password: "Password should be atleast 3 characters long" });
    } else if (registerData.password !== registerData.confirmPassword) {
      err.push({ confirmPassword: "Passwords don't match" });
    }
    setValidateErrors(err);

    if (err.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateData();

    if (!isValid) {
      console.log("Not valid", validateErrors);
    }
    if (isValid) {
      //sign up
      try {
        setLoading(true);
        setRegistered(false);
        setUserAlreadyExist(false);
        const response = await fetch(`/api/user`, {
          method: "POST",
          body: JSON.stringify(registerData),
        });

        const result = await response.json();
        if (result?.message === "User already exists") {
          console.log(result?.message);
          setRegisterData({
            confirmPassword: "",
            name: "",
            email: "",
            password: "",
          });
          setUserAlreadyExist(true);
          setLoading(false);
        } else {
          setLoading(false);
          setRegistered(true);
          setUserAlreadyExist(false);
          setRegisterData({
            confirmPassword: "",
            name: "",
            email: "",
            password: "",
          });
          router.push(`/auth/signin?callbackUrl=${callbackUrl}`)
        }


      } catch (error: any) {
        setSubmitError(error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <form
        onSubmit={handleRegister}
        className="flex flex-col justify-center items-center gap-2 "
      >
        <div>Sign Up</div>

        <div className="flex flex-col gap-1">
          <label className="text-left">Name</label>
          <input
            className=" text-black"
            type="text"
            placeholder="name"
            name="name"
            value={registerData.name}
            onChange={handleInputChange}
            required
          />
          <div className="w-[200px] text-red-500">
            {getErrorMsg("name", validateErrors) as string}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-left">Email</label>
          <input
            className=" text-black"
            type="text"
            placeholder="email"
            name="email"
            value={registerData.email}
            onChange={handleInputChange}
            required
          />
          <div className="w-[200px] text-red-500">
            {getErrorMsg("email", validateErrors) as string}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-left">Password</label>

          <input
            className=" text-black"
            type="password"
            placeholder="password"
            name="password"
            value={registerData.password}
            onChange={handleInputChange}
            required
          />
          <div className="w-[200px] text-red-500">
            {getErrorMsg("password", validateErrors) as string}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-left">Confirm Password</label>
          <input
            className=" text-black"
            type="password"
            placeholder="confirmPassword"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Sign up
        </button>
        {userAlreadyExist && <div> User already exist. Try diferent email</div>}
        {userRegistered && <div> User has been created. You can login now</div>}
      </form>
    </div>
  );
}
