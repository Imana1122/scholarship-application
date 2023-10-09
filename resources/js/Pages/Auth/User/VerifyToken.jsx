import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import GuestLayoutComponent from "../../../components/pagelayouts/GuestLayoutComponent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function VerifyToken({ phone_number }) {
  const { data, setData, post, processing, errors } = useForm({
    verification_code: "",
  });

  const [messageResend, setMessageResend] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  // Timer setup and countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  // Function to show the success message temporarily
  const recentlySuccessfulModal = () => {
    setRecentlySuccessful(true);

    setTimeout(() => {
      setRecentlySuccessful(false);
    }, 2000); // Set the time (in milliseconds) to show the success message
  };

  // Form submit handler
  const submit = (e) => {
    e.preventDefault();
    setMessageResend("");
    setError("");

    post("/verify-code", {
      phone_number,
      verification_code: data.verification_code,
    }).then(({ data }) => {
      if (data.error) {
        setError(data.error);
        recentlySuccessfulModal();
      } else if (data.message) {
        setMessageResend(data.message);
        recentlySuccessfulModal();
        Inertia.route('reset-password')
      }
    });
  };

  // Resend verification code handler
  const resendCode = () => {
    setError("");
    setMessageResend("");
    setSeconds(120);

    post("/verify-phone", { phone_number }).then(({ data }) => {
      if (data.errorShow) {
        setError(data.errorShow);
        recentlySuccessfulModal();
      } else if (data.message) {
        setMessageResend(data.message);
        recentlySuccessfulModal();
      }
    });
  };

  return (
    <GuestLayoutComponent title="Phone Verification">
      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your phone number by filling in the
        code we just sent to you? If you didn't receive the code, we will gladly send you another.
      </div>
      <div className="my-5">
        {/* Success Message */}
        {recentlySuccessful && (
          <Alert severity="success" sx={{ display: "flex", alignItems: "center" }}>
            {messageResend && (
              <span className="flex items-center">
                {messageResend}
                <CheckCircleIcon sx={{ ml: 1 }} />
              </span>
            )}
          </Alert>
        )}
        {/** Failure Message */}
        {recentlySuccessful && (
          <Alert severity="error" sx={{ display: "flex", alignItems: "center" }}>
            {error && (
              <span className="flex items-center">
                {error}
                <ErrorIcon sx={{ ml: 1 }} />
              </span>
            )}
          </Alert>
        )}
      </div>
      <form onSubmit={submit}>
        {/* Verification Code Input */}
        <div className="relative">
          <TextField
            fullWidth
            variant="outlined"
            id="verification_code"
            name="verification_code"
            type="number"
            autoComplete="verification_code"
            required
            value={data.verification_code}
            onChange={(e) => setData("verification_code", e.target.value)}
            label="Verification Code"
            error={!!errors.verification_code}
            helperText={errors.verification_code || " "}
          />
        </div>
        <div className="flex justify-end items-end">
          {/* Resend Code */}
          <p
            className={`text-sm font-serif cursor-pointer ${
              processing ? "font-thin" : ""
            }`}
            onClick={resendCode}
          >
            {processing ? "Resending" : "Resend"}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            disabled={processing}
            type="submit"
          >
            {processing ? "Sending Code" : "Send Code"}
          </Button>
          <div className="text-red-700">
            {seconds >= 0 && <p>{seconds}</p>}
          </div>
        </div>
      </form>
    </GuestLayoutComponent>
  );
}
