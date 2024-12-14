import React from 'react'
import  "../Navbar.css";
import { auth, provider } from '../config/firebase';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';

export default function Navbar() {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
      await signOut(auth);
    }
    
  return (
    <div className='nav'>
        <div className='navul'>
            <Link to="/" className='navulli'>Home </Link>
            <Link to="/about" className='navulli'>About</Link>
            <Link to="/feedback" className='navulli'>Feedback</Link>
            {user? <Link to="/createpost" className='navulli'>Create Post</Link> :
            <Link to="/login" className='navulli'>Login</Link>
            }
        </div>

        <div >
               {user && (
                 <div className='user'>
                    <li className='navulli' onClick={signUserOut}><a>Logout</a></li>
                    <img className='userimg' src={user?.photoURL || ""}/>
                    <p className='username'>{user?.displayName}</p>
                  </div>
               )} 
        </div>
    </div>
  )
}