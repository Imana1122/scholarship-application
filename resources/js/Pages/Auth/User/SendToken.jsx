import React from "react";
import { useForm } from "@inertiajs/react";
import GuestLayoutComponent from "../../../components/pagelayouts/GuestLayoutComponent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function SendToken() {
  const { data, setData, post, processing, errors } = useForm({
    phone_number: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post("/user/send-token", data)
  };

  return (
    <GuestLayoutComponent title="Forgot Password">
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your phone number, and we will verify your phone number
        and give you a password reset field that will allow you to choose a new one.
      </div>

      <form onSubmit={submit}>
        {/* Phone Number */}
        <div>
          <TextField
            fullWidth
            variant="outlined"
            id="phone_number"
            name="phone_number"
            type="number"
            autoComplete="phone_number"
            required
            value={data.phone_number}
            onChange={(e) => setData("phone_number", e.target.value)}
            label="Phone Number"
            error={!!errors.phone_number}
            helperText={errors.phone_number || " "}
          />
        </div>
        {/* Phone Number */}

        <div className="flex items-center justify-end mt-4">
          <Button
            variant="contained"
            color="primary"
            disabled={processing}
            type="submit"
          >
            {processing ? "Verifying" : "Verify"}
          </Button>
        </div>
      </form>
    </GuestLayoutComponent>
  );
}
