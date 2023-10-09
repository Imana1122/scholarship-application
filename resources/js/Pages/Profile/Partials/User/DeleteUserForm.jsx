import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "../../../../components/Modal";

export const DeleteUserForm = ({className=''})=> {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        post("/user/delete-profile", data);
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
                            required
                            fullWidth
                            variant="outlined"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
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
                            {processing ? 'Deleting' : 'Delete Account'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
