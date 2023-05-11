import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('department', department);
        formData.append('position', position);
        formData.append('photo', photo);

        try {
            await axios.post('/api/employees', formData);
            alert('Employee added successfully');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label>Department:</label>
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />

            <label>Position:</label>
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />

            <label>Photo:</label>
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

            <button type="submit">Add Employee</button>
        </form>
    );
};

export default AddEmployee;
