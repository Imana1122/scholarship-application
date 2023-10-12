import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "../../../../components/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react";

export default function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({ password: "" }); // Initialize errors state

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Make a DELETE request using axios
      const response = await axios.delete("/user/delete-profile", {
        data: { password },
      });

      if (response.status === 200) {
        toast.success("Account deleted successfully");
        // You can perform any other actions upon successful deletion
        setConfirmingUserDeletion(false); // Close the modal or redirect the user
        router.visit('/auth/login-choose-user');
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        // Handle validation errors
        setErrors(err.response.data.errors);
      } else {
        console.error("Failed to delete account", err);
      }
    } finally {
      setProcessing(false);
    }
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <Typography variant="h6" className="text-gray-900">
          Delete Account
        </Typography>
        <Typography variant="body2" className="mt-1 text-gray-600">
          Once your account is deleted, all of its resources and data will be permanently deleted. Before
          deleting your account, please download any data or information that you wish to retain.
        </Typography>
      </header>

      {/* Button to initiate the account deletion process */}
      <Button
        variant="contained"
        color="secondary"
        onClick={confirmUserDeletion}
        disabled={processing}
      >
        Delete Account
      </Button>

      {/* Modal for confirming the user deletion */}
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <Typography variant="h6" className="text-gray-900">
            Are you sure you want to delete your account?
          </Typography>
          <Typography variant="body2" className="mt-1 text-gray-600">
            Once your account is deleted, all of its resources and data will be permanently deleted. Please
            enter your password to confirm you would like to permanently delete your account.
          </Typography>

          {/* Password Input */}
          <div className="relative mt-4">
            <TextField
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              label="Current Password"
              required
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password} // Apply error styling based on errors.password
              helperText={errors.password} // Display the error message
            />
          </div>
          {/* Password Input */}

          {/* Buttons to confirm or cancel the account deletion */}
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outlined"
              onClick={closeModal}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              className="ml-3"
              disabled={processing}
              type="submit"
            >
              {processing ? "Deleting" : "Delete Account"}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
