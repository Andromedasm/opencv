import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('employee_id', employeeId);
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

    // ... (capturePhoto and dataURItoBlob functions are unchanged)
    const capturePhoto = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = mediaStream;
            video.onloadedmetadata = () => {
                video.play();
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                const photoDataUrl = canvas.toDataURL('image/jpeg');
                setPhoto(dataURItoBlob(photoDataUrl));
            };
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([uint8Array], { type: mimeString });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Employee ID:</label>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block">Department:</label>
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block">Position:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div>
                <button
                    type="button"
                    onClick={capturePhoto}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Capture Photo
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-700"
                >
                    Add Employee
                </button>
            </div>
        </form>
    );
};

export default AddEmployee;
