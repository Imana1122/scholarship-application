import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { useForm } from '@inertiajs/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ImageInput from '../../components/ImageInput';

export default function NewMember(props) {
    const { data, setData, errors, processing, post } = useForm({
        name: '',
        phone_number: '',
        image: null,
        imagePath: '',
        description: '', // Add the description field
    });


    const handleChange = (e) => {
        const { name, value, files } = e.target;


            // Handle text input fields
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form submission
        post('/register-member',data);
    };

    return (
        <AdminLayoutComponent currentUser={props.currentUser}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between space-y-7">
                <div className="flex flex-col p-4 rounded-md mb-5 space-y-7">
                    <div>
                        <TextField
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={data.name}
                            onChange={handleChange}
                            label="Name"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name || ' '}
                            fullWidth
                        />
                    </div>

                    <div>
                        <TextField
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            required
                            value={data.phone_number}
                            onChange={handleChange}
                            label="Phone Number"
                            variant="outlined"
                            error={!!errors.phone_number}
                            helperText={errors.phone_number || ' '}
                            fullWidth
                        />
                    </div>

                    <div>
                        <TextField
                            id="description"
                            name="description"
                            multiline
                            rows={4}
                            required
                            value={data.description}
                            onChange={handleChange}
                            label="Description"
                            variant="outlined"
                            error={!!errors.description}
                            helperText={errors.description || ' '}
                            fullWidth
                        />
                    </div>


                    <div>
                    <ImageInput error={errors.image} imagePath={data.imagePath} setData={setData}/>
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
