import React, { useState, useEffect } from "react";
import GuestLayoutComponent from "../../../components/pagelayouts/GuestLayoutComponent";
import { BiArrowBack } from "react-icons/bi";
import PrimaryButton from "../../../components/PrimaryButton";
import { Link, router, useForm } from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

function Login() {
  const { data, setData, post, errors, processing } = useForm({
    school_phone: "",
    password: "",
    remember_me: false, // Initialize remember_me as false
  });

  const handleChange = (e) => {

    const { name, value, checked } = e.target;
    setData(name, name === "remember_me" ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/school/login", data)
  };

  return (
    <GuestLayoutComponent title={"Sign in to your account"}>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number */}
          <TextField
            id="school_phone"
            name="school_phone"
            type="tel"
            autoComplete="tel"
            autoFocus
            required
            fullWidth
            variant="outlined"
            label="Phone Number"
            value={data.school_phone}
            onChange={handleChange}
            error={!!errors.school_phone}
            helperText={errors.school_phone || ""}
          />

          {/* Password */}
          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            label="Password"
            value={data.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password || ""}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <Checkbox
              id="remember_me"
              name="remember_me"
              color="primary"
              checked={data.remember_me}
              onChange={handleChange}
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
              Remember Me
            </label>
          </div>

          <div className="text-sm flex justify-end">
            <Link
              href="/school/send-token-form"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center">
              <PrimaryButton disabled={processing}>
                {processing ? "Signing in" : "Sign in"}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </GuestLayoutComponent>
  );
}

export default Login;
