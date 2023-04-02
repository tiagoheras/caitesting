import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';


function LogIn({ children, session }) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPassVisible, setPassVisible] = useState(false);
    const [error, setError] = useState("");

    const logIn = async (e) => {
        e.preventDefault();
        const { error, data } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        console.log(data)        
        if (error) setError(error.message)
    }

    useEffect(() => {
        if (session) console.log(session);
    }, [session])

    return (
        <div>
            <div>
                {session ? children :
                    (<div className='w-[60%] py-6 px-8 mx-auto text-center'>
                        <h1 className='my-3 font-bold text-lg'>Log In</h1>
                        {error ? <div role="alert">
                            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Error
                            </div>
                            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <p>{error}</p>
                            </div>
                        </div> :
                            null}
                        <form>
                            <div>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={e => setEmail(e.target.value)} placeholder="Email" type="text" />
                            </div>
                            <div className='relative'>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={e => setPassword(e.target.value)} placeholder="Password" type={isPassVisible ? "text" : "password"} />
                                <i onClick={() => setPassVisible(!isPassVisible)} className="fa-solid fa-eye absolute top-6 right-4 cursor-pointer"></i>
                            </div>
                            <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 rounded focus:outline-none focus:shadow-outline" onClick={logIn}>Log In</button>
                        </form>
                    </div>)}
            </div>

        </div >
    );
}

export default LogIn;