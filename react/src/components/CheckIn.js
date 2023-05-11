import React, { useState } from 'react';
import axios from 'axios';

const CheckIn = () => {
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', photo);

        try {
            await axios.post('/api/checkin', formData);
            alert('Check-in successful');
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Photo:</label>
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

            <button type="submit">Check In</button>
        </form>
    );
};

export default CheckIn;
