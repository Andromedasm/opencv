import React from 'react';
import './App.css';
import Navigation from './components/Navigation';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="bg-blue-500 text-white w-full p-6 mb-8">
                <h1 className="text-center text-4xl font-bold">勤怠システム</h1>
            </header>
            <div className="container mx-auto">
                <Navigation />
            </div>
        </div>
    );
}

export default App;
