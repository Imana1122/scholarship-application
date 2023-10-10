import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { useForm } from '@inertiajs/react';
import Button from '@mui/material/Button';
import { BackgroundImageInput } from '../../components/BackgroundImageInput';

export default function NewAboutImage(props) {
    const { data, setData, errors, processing, post } = useForm({
        image: '',
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
        post('/register-about-image',data);
    };

    return (
        <AdminLayoutComponent currentUser={props.currentUser}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between space-y-7">
                <div className="flex flex-col p-4 rounded-md mb-5 space-y-7">
                    <div>
                    <BackgroundImageInput error={errors.image} setData={setData}/>
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
