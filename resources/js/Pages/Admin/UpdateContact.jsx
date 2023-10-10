import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { AdminLayoutComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import { Button } from "@mui/material";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function UpdateContact (props) {
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

// State variable to store contact information
  const [contact, setContact] = useState({
    phone: 0,
    email: "",
    location: "",
    facebook_link: "",
    twitter_link: "",
    youtube_link: "",
    instagram_link: "",
    github_link: "",
    tiktok_link: "",
    allow_send_message: 0,
  });

  useEffect(() => {
    setContact(props.contact);
  }, [props.contact]);



  // Function to handle form submission
  const onSubmit = (ev) => {
    ev.preventDefault();

    const requestUrl =  "/update-contact";
    const requestMethod = "PUT"
    setProcessing(true)

    axios
      .request({
        url: requestUrl,
        method: requestMethod,
        data: contact,
      })
      .then(({data}) => {
        toast.success(data.message);
        router.visit('/contact/update-form')
      })
      .catch((error) => {
        // Handle the error
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  const handleChange = (field, value) => {
    // Update the form data state
    setContact((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleAllowSendMessage = () => {
    // Toggle the value of allow_send_message
    setContact((prev) => ({
      ...prev,
      allow_send_message: !prev.allow_send_message,
    }));
  };


  return (
    <AdminLayoutComponent title="Contact Details" currentUser={props.currentUser} >
      <div className="md:mx-10 m-auto">
        <form
          onSubmit={onSubmit}
        >
          <div className="shadow sm:overflow-hidden sm:rounded-md md:p-10 rounded-lg">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Phone */}
              <TextField
                  id="phone"
                  name="phone"
                  type="number"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  required
                  value={contact.phone || ''}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={!!errors.phone} // Set error if the field has an error
                  helperText={errors.phone} // Display error message
                />
              {/* Phone */}

              {/* Email */}
              <div>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={contact.email || ''}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </div>
              {/* Email */}

              {/*Location */}
              <div>
                <TextField
                  id="location"
                  name="location"
                  type="text"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  required
                  value={contact.location || ''}
                  onChange={(e) => handleChange("location", e.target.value)}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </div>
              {/* Location */}


              {/* Facebook Link */}
              <div>
                <TextField
                    id="facebook_link"
                    name="facebook_link"
                    type="url"
                    label="Facebook link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contact.facebook_link || ''}
                    onChange={(e) => handleChange("facebook_link", e.target.value)}
                    error={!!errors.facebook_link}
                    helperText={errors.facebook_link}
                />
                </div>

                {/* Instagram Link */}
                <div>
                <TextField
                    id="instagram_link"
                    name="instagram_link"
                    type="url"
                    label="Instagram link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contact.instagram_link || ''}
                    onChange={(e) => handleChange("instagram_link", e.target.value)}
                    error={!!errors.instagram_link}
                    helperText={errors.instagram_link}
                />
                </div>

                {/* Twitter Link */}
                <div>
                <TextField
                    id="twitter_link"
                    name="twitter_link"
                    type="url"
                    label="Twitter link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contact.twitter_link || ''}
                    onChange={(e) => handleChange("twitter_link", e.target.value)}
                    error={!!errors.twitter_link}
                    helperText={errors.twitter_link}
                />
                </div>

                {/* Youtube Link */}
                <div>
                <TextField
                    id="youtube_link"
                    name="youtube_link"
                    type="url"
                    label="Youtube link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contact.youtube_link || ''}
                    onChange={(e) => handleChange("youtube_link", e.target.value)}
                    error={!!errors.youtube_link}
                    helperText={errors.youtube_link}
                />
                </div>

                {/* Tiktok Link */}
                <div>
                <TextField
                    id="tiktok_link"
                    name="tiktok_link"
                    type="url"
                    label="Tiktok link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contact.tiktok_link || ''}
                    onChange={(e) => handleChange("tiktok_link", e.target.value)}
                    error={!!errors.tiktok_link}
                    helperText={errors.tiktok_link}
                />
                </div>

                {/* Github Link */}
                <div>
                <TextField
                    id="github_link"
                    name="github_link"
                    type="url"
                    label="Github link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contact.github_link || ''}
                    onChange={(e) => handleChange("github_link", e.target.value)}
                    error={!!errors.github_link}
                    helperText={errors.github_link}
                />
                </div>


              <div>
                <label htmlFor="allow_send_message" className="flex items-center">
                  Allow Send Message
                  <Checkbox
                    id="allow_send_message"
                    name="allow_send_message"
                    checked={contact.allow_send_message === 1 || contact.allow_send_message === true}
                    onChange={toggleAllowSendMessage}
                  />
                </label>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <Button type="submit" disabled={processing} color="primary" variant="contained">Update</Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayoutComponent>
  );
};
