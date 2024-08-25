import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = () => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setLoading(false);
                console.log('User logged in: ', user);
                navigate('/');
                // Redirect or perform any additional actions here
            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                const email = error.customData?.email ?? 'unknown'; // Safely access email
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(`Login failed: ${errorMessage}, Email: ${email}, Credential: ${credential}`);
                alert(`Login failed: ${errorMessage}`);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen w-full bg-black">
            <button
                className={`bg-yellow-300 border-2 border-yellow-400 py-3 px-9 text-black font-bold rounded-lg shadow-lg transform transition-all duration-200 ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-yellow-400'
                } m-4`} // Add margin
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login with Google'}
            </button>
        </div>
    );
};

export default Login;
