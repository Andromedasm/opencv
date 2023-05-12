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

    const capturePhoto = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
            });
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
        <form onSubmit={handleSubmit}>
            <button type="button" onClick={capturePhoto}>
                Capture Photo
            </button>
            <button type="submit">Check In</button>
        </form>
    );
};

export default CheckIn;
