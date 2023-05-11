import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <ul>
            {employees.map((employee) => (
                <li key={employee.id}>
                    {employee.name} ({employee.department}, {employee.position})
                </li>
            ))}
        </ul>
    );
};

export default EmployeeList;
