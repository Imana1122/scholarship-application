import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { useForm } from '@inertiajs/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BackgroundImageInput } from '../../components/BackgroundImageInput';

export default function NewBackgroundImage(props) {
    const { data, setData, errors, processing, post } = useForm({
        image: '',
        title: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle text input fields
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form submission
        post('/register-background-image',data);
    };

    return (
        <AdminLayoutComponent currentUser={props.currentUser}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between space-y-7">
                <div className="flex flex-col p-4 rounded-md mb-5 space-y-7">
                    <div>
                        <TextField
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={data.title}
                            onChange={handleChange}
                            label="Title"
                            variant="outlined"
                            error={!!errors.title}
                            helperText={errors.title || ' '}
                            fullWidth
                        />
                    </div>


                    <div>
                    <BackgroundImageInput error={errors.image} background_image={data.background_image} setData={setData}/>
                    </div>
                </div>

                <div className='flex justify-end'>
                <Button variant="contained" color="primary" type="submit" disabled={processing}>
                {processing?<span>Submitting</span>:<span>Submit</span>}
                </Button>
                </div>
            </form>
        </AdminLayoutComponent>
    );
}
