"use client";
import { resetPassword } from "@/lib/fetch/fetch";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  token: string;
};
type InputErrors = {
  [key: string]: string;
};

type RedisterData = {
  password: string;
  confirmPassword: string;
};

export const getErrorMsg = (key: string, errors: InputErrors[]) => {
  if (errors.find((err) => err.hasOwnProperty(key) !== undefined)) {
    const errorObj = errors.find((err) => err.hasOwnProperty(key));
    return errorObj && errorObj[key];
  }
};

export default function ResetPassword({ token }: Props) {
  const [registerData, setRegisterData] = useState<RedisterData>({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [validateErrors, setValidateErrors] = useState<InputErrors[]>([]);
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };
  const handleResetPassword = async (event:React.FormEvent) => {
event.preventDefault()
const result = await resetPassword(token,registerData.password,registerData.confirmPassword)
router.push("/")
    
  };

  return (
    <div>
      <div>You can reset your password </div>
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col justify-center items-center gap-2 "
      >
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
          Change
        </button>
      </form>
    </div>
  );
}
