import React from "react";
import { useForm } from "@inertiajs/react";
import GuestLayoutComponent from "../../../components/pagelayouts/GuestLayoutComponent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function SendToken() {
  const { data, setData, post, processing, errors } = useForm({
    school_phone: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post("/password-reset/school/send-token", data);
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
            id="school_phone"
            name="school_phone"
            type="number"
            autoComplete="school_phone"
            required
            value={data.school_phone}
            onChange={(e) => setData("school_phone", e.target.value)}
            label="Phone Number"
            error={!!errors.school_phone}
            helperText={errors.school_phone || " "}
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
