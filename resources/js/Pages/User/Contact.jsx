import React, { useState } from 'react';
import {BsTelephoneFill} from 'react-icons/bs';
import {GrMail} from "react-icons/gr";
import { HiLocationMarker} from 'react-icons/hi';
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaTiktok,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
} from '@mui/material';
import UserLayoutComponent from '../../components/pagelayouts/UserLayoutComponent';
import { inputCss } from '../../components/css-components/text-field';
import { Link } from '@inertiajs/react';



export default function Contact(props) {


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [contact, setContact] = useState(props.contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const submit=(e)=>{
    e.preventDefault();
  }


  return (
    <UserLayoutComponent activeRoute={props.activeRoute}>
      <Box
        className="bg-[#1d043f] w-screen h-auto md:h-screen"
        py={10}
        px={2}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Box py={4}>
                <Typography variant="h4" component="h1" color="white">
                  Get In Touch
                </Typography>
                <Typography variant="body1" color="grey" mt={4}>
                  Fill up the form and our team will get back to you within 12
                  hours
                </Typography>
                <Box mt={10}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>

            <div className='flex gap-5 p-5 border border-gray-500 hover:border-blue-700 md:w:1/2 w-full rounded-md group cursor-pointer items-center'>
                {/**Icon */}
                <BsTelephoneFill className='text-xl text-gray-500 group-hover:text-white'/>
                <p className='text-gray-500 text-base font-semibold group-hover:text-white'>{contact.phone}</p>
            </div>



                    </Grid>
                    <Grid item xs={12}>
                    <div className='flex gap-5 p-5 border border-gray-500 hover:border-blue-700 md:w:1/2 w-full rounded-md group cursor-pointer items-center'>
                {/**Icon */}
                <GrMail className='text-xl text-gray-500 group-hover:text-white'/>
                <p className='text-gray-500 text-base font-semibold group-hover:text-white'>{contact.email}</p>
            </div>

                    </Grid>
                    <Grid item xs={12}>
                    <div className='flex gap-5 p-5 border border-gray-500 hover:border-blue-700 md:w:1/2 w-full rounded-md group cursor-pointer items-center'>
                {/**Icon */}
                <HiLocationMarker className='text-xl text-gray-500 group-hover:text-white'/>
                <p className='text-gray-500 text-base font-semibold group-hover:text-white'>{contact.location}</p>
            </div>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={10}>
                  <Grid container spacing={2}>
                    {contact.facebook_link && (
                      <Grid item>
                        <Link href={contact.facebook_link}>
                          <FaFacebook
                            className="text-2xl text-white hover:text-blue-700 cursor-pointer"
                          />
                        </Link>
                      </Grid>
                    )}
                    {contact.twitter_link && (
                      <Grid item>
                        <Link href={contact.twitter_link}>
                          <FaTwitter
                            className="text-2xl text-white hover:text-blue-700 cursor-pointer"
                          />
                        </Link>
                      </Grid>
                    )}
                    {contact.github_link && (
                      <Grid item>
                        <Link href={contact.github_link}>
                          <FaGithub
                            className="text-2xl text-white hover:text-blue-700 cursor-pointer"
                          />
                        </Link>
                      </Grid>
                    )}
                    {contact.tiktok_link && (
                      <Grid item>
                        <Link href={contact.tiktok_link}>
                          <FaTiktok
                            className="text-2xl text-white hover:text-blue-700 cursor-pointer"
                          />
                        </Link>
                      </Grid>
                    )}
                    {contact.youtube_link && (
                      <Grid item>
                        <Link href={contact.youtube_link}>
                          <FaYoutube
                            className="text-2xl text-white hover:text-blue-700 cursor-pointer"
                          />
                        </Link>
                      </Grid>
                    )}
                    {contact.instagram_link && (
                      <Grid item>
                        <Link href={contact.instagram_link}>
                          <FaInstagram
                            className="text-2xl text-white hover:text-blue-700 cursor-pointer"
                          />
                        </Link>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              {contact.allow_send_message === 1 && (
                <Box
                  p={4}
                  bgcolor="white"
                  borderRadius="lg"
                  boxShadow="md"
                  mt={6}
                >
                  <form onSubmit={submit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth sx={inputCss}
                          id="first_name"
                          name="first_name"
                          label="First Name"
                          variant="outlined"
                          required
                          autoFocus
                          value={formData.first_name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth sx={inputCss}
                          id="last_name"
                          name="last_name"
                          label="Last Name"
                          variant="outlined"
                          required
                          value={formData.last_name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth sx={inputCss}
                          id="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth sx={inputCss}
                          id="subject"
                          name="subject"
                          label="Subject"
                          variant="outlined"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        id="message"
                        name="message"
                        label="Message"
                        variant="outlined"
                        required
                        multiline  // This makes it a textarea
                        rows={4}   // Adjust the number of rows as needed
                        fullWidth sx={inputCss}
                        value={formData.message}
                        onChange={handleChange}
                        />

                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </UserLayoutComponent>
  );
}
