import React, { useState } from 'react';
import axios from 'axios';

const CheckOut = () => {
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/checkout', { employee_id: employeeId });
            alert('Check-out successful');
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Employee ID:</label>
            <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

            <button type="submit">Check Out</button>
        </form>
    );
};

export default CheckOut;
