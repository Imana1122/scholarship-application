import React, {useEffect} from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { useForm } from '@inertiajs/react';
import TextField from '@mui/material/TextField'; // Import Material-UI TextField
import Button from '@mui/material/Button'; // Import Material-UI Button
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { roles } from '../../components/admin/const/userData';
import toast from 'react-hot-toast';

export default function UpdateUser(props) {
    const { data, setData, put, errors , processing} = useForm({
        name: '',
        phone_number: '',
        role_id:1,
    });

    useEffect(()=>{
        setData(props.user);
    },[props.user])

    useEffect(()=>{
        if(props.errors.error){
            toast.error(props.errors.error);
        }
    },[props.errors.error])

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/user/update/${props.user.id}`,data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the form data state
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <AdminLayoutComponent currentUser={props.currentUser} title="Create New User">
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between space-y-7">
                <div className="flex flex-col p-4 rounded-md mb-5 space-y-7">
                    <div>
                        {/* Material-UI TextField for 'name' */}
                        <TextField
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            fullWidth
                            value={data.name}
                            onChange={handleChange}
                            label="Name"
                            variant="outlined" // Use the outlined variant
                            error={!!errors.name} // Set error state based on validation
                            helperText={errors.name || ' '} // Display validation error message
                        />
                    </div>

                    <div>
                        {/* Material-UI TextField for 'phone_number' */}
                        <TextField
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            autoComplete="phone_number"
                            required
                            fullWidth
                            value={data.phone_number}
                            onChange={handleChange}
                            label="Phone Number"
                            variant="outlined" // Use the outlined variant
                            error={!!errors.phone_number} // Set error state based on validation
                            helperText={errors.phone_number || ' '} // Display validation error message
                        />
                    </div>
                    <div>
                        <FormControl variant="outlined" required fullWidth>
                        <InputLabel id="role-id-label">School Category</InputLabel>
                        <Select
                            labelId="role-id-label"
                            id="role_id"
                            name="role_id"
                            value={data.role_id}
                            onChange={handleChange}
                            label="School Category"
                            error={!!errors.role_id}
                        >
                            {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>

                </div>

                {/* Submit button */}
                <div className='flex justify-end'>
                    <Button variant="contained" color="primary" type="submit" disabled={processing}>
                       {processing? <span>Updating</span>:<span>Update</span>}
                    </Button>
                </div>
            </form>
        </AdminLayoutComponent>
    );
}
