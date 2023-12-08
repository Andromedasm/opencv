import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UpdateEmployeeModal from './UpdateEmployeeModal';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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

    const handleUpdate = async (employeeId, updatedData) => {
        try {
            await axios.put(`/api/employees/${employeeId}`, updatedData);
            setEmployees(
                employees.map((employee) => (employee.id === employeeId ? {...employee, ...updatedData} : employee))
            );
            setShowUpdateModal(false);
            alert('Employee updated successfully');
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleCapturePhoto = (employeeId) => {
        // Implement the logic for capturing a new photo for an employee
    };

    return (
        <div>
            <ul className="space-y-4">
                {employees.map((employee) => (
                    <li key={employee.id} className="flex items-center space-x-4">
                        <div>
                            {employee.name} ({employee.department}, {employee.position})
                        </div>
                        <button
                            onClick={() => {
                                setSelectedEmployee(employee);
                                setShowUpdateModal(true);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            更新
                        </button>
                        <button
                            onClick={() => handleCapturePhoto(employee.id)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Capture Photo
                        </button>
                    </li>
                ))}
            </ul>
            {showUpdateModal && (
                <UpdateEmployeeModal
                    employee={selectedEmployee}
                    onUpdate={handleUpdate}
                    onClose={() => setShowUpdateModal(false)}
                />
            )}
        </div>
    );
};

export default EmployeeList;
