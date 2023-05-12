import React, { useState, useEffect } from 'react';

const UpdateEmployeeModal = ({ employee, onUpdate, onClose }) => {
    const [employeeId, setEmployeeId] = useState(employee.employee_id);
    const [name, setName] = useState(employee.name);
    const [department, setDepartment] = useState(employee.department);
    const [position, setPosition] = useState(employee.position);

    useEffect(() => {
        setEmployeeId(employee.employee_id);
        setName(employee.name);
        setDepartment(employee.department);
        setPosition(employee.position);
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(employee.id, { employee_id: employeeId, name, department, position });
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Employee ID:</label>
                            <input
                                type="text"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="border-2 border-gray-300 px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-2 border-gray-300 px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>Department:</label>
                            <input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="border-2 border-gray-300 px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>Position:</label>
                            <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="border-2 border-gray-300 px-2 py-1"
                            />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployeeModal;
