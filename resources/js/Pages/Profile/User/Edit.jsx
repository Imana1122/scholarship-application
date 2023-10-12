// Importing required modules

import { AdminLayoutComponent } from "../../../components/pagelayouts/AdminLayoutComponent";
import DeleteUserForm from "../Partials/User/DeleteUserForm";
import { UpdateUserPasswordForm } from "../Partials/User/UpdateUserPasswordForm";
import { UpdateUserProfileInformation } from "../Partials/User/UpdateUserProfileInformationForm";

// The main Edit component
export default function Edit(props) {
    return (
        // Wrap the content in the UserLayoutComponent with a title
        <AdminLayoutComponent title={'Edit your Profile'} currentUser={props.currentUser}>
            <div>
                {/* Update Profile Information Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <
                      UpdateUserProfileInformation  currentUser={props.currentUser}
                    />
                </div>

                {/* Update Password Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateUserPasswordForm className="max-w-xl" />
                </div>

                {/* Delete User Form */}
                {props.currentUser.role_id !== 2 && (
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
                )}
            </div>
        </AdminLayoutComponent>
    );
}
