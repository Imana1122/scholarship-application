import React, { useState, useEffect } from "react";
import GuestLayoutComponent from "../../../components/pagelayouts/GuestLayoutComponent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios"; // Import Axios
import { router } from "@inertiajs/react";

export default function VerifyToken(props) {
  const [data, setData] = useState({ verification_token: "" });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [resetProcessing, setResetProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  useEffect(()=>{
    if(props.errors.error ){
        setError(props.errors.error);
    }
    if(props.errors.errorShow ){
        setError(props.errors.errorShow);
    }
  })

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
    setSuccessMessage("");
    setError("");
    setProcessing(true); // Start processing

    axios
      .put("/user/verify-token", {
        phone_number:props.phone_number,
        verification_token: data.verification_token,
      })
      .then(({ data }) => {
        console.log(data)
        if (data.message) {
          setSuccessMessage(data.message);
          router.visit(`/user/reset-password-form/${props.phone_number}`);
        }
      })
      .catch((error) => {
        if(error.response.data.error){
            setError(error.response.data.error)
        }
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => {
        setProcessing(false); // Stop processing
        recentlySuccessfulModal();
      });
  };

  // Resend verification code handler
  const resendCode = () => {
    setError("");
    setSuccessMessage("");
    setSeconds(60);
    setProcessing(false); // Start processing
    setResetProcessing(true);

    axios
      .post("/user/send-token", { phone_number:props.phone_number }).finally(()=>{setResetProcessing(false)})

  };

  return (
    <GuestLayoutComponent title="Phone Verification">
      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your phone number by filling in the
        code we just sent to you? If you didn't receive the code, we will gladly send you another.
      </div>
      <div className="my-5">
        {/* Success Message */}
        {recentlySuccessful && successMessage &&(
          <Alert severity="success" sx={{ display: "flex", alignItems: "center" }}>
              <span className="flex items-center">
                {successMessage}
                <CheckCircleIcon sx={{ ml: 1 }} />
              </span>
          </Alert>
        )}
        {/* Failure Message */}
        {recentlySuccessful && error && (
          <Alert severity="error" sx={{ display: "flex", alignItems: "center" }}>
              <span className="flex items-center">
                {error}
                <ErrorIcon sx={{ ml: 1 }} />
              </span>
          </Alert>
        )}
      </div>
      <form onSubmit={submit}>
        {/* Verification Code Input */}
        <div className="relative">
          <TextField
            fullWidth
            variant="outlined"
            id="verification_token"
            name="verification_token"
            type="number"
            autoComplete="verification_token"
            required
            value={data.verification_token}
            onChange={(e) => setData({ ...data, verification_token: e.target.value })}
            label="Verification Code"
            error={!!errors.verification_token}
            helperText={errors.verification_token || " "}
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
            {resetProcessing ? "Resending" : "Resend"}
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
