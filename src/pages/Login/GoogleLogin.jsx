// import React from 'react';
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {

    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';


    const handleGoogleSingIn = () => {
        googleSignIn()
            .then(res => {
                const loggedUser = res.user;
                const saveUser = { name: loggedUser.displayName, email: loggedUser.email };

                fetch(`http://localhost:5000/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <div>
            <div className='divider'></div>
            <div className="flex justify-center my-4">
                <button onClick={handleGoogleSingIn} className="md:w-3/4 w-full mx-2 text-center border py-2 rounded-md font-semibold text-lg flex items-center justify-center ">
                    <span className="mr-3"><FaGoogle /></span>
                    SignIn with Google
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;