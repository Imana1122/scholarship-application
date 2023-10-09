// Importing required modules
import UpdateSchoolPasswordForm from "../Partials/School/UpdateSchoolPasswordForm";
import DeleteSchoolForm from "../Partials/School/DeleteSchoolForm";
import { SchoolLayoutComponent } from "../../../components/pagelayouts/SchoolLayoutComponent";
import { UpdateSchoolProfileInformation } from "../Partials/School/UpdateSchoolProfileInformation";

// The main Edit component
export default function Edit(props) {
    return (
        // Wrap the content in the UserLayoutComponent with a title
        <SchoolLayoutComponent title={'Edit your Profile'} currentUser={props.currentUser}>
            <div>
                {/* Update Profile Information Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateSchoolProfileInformation
                        currentUser={props.currentUser}
                    />
                </div>

                {/* Update Password Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateSchoolPasswordForm className="max-w-xl" />
                </div>

                {/* Delete User Form */}
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteSchoolForm className="max-w-xl" />
                </div>
            </div>
        </SchoolLayoutComponent>
    );
}
