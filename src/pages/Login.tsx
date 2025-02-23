import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        navigate("/");
    }

  return (
    <div>
        <p>Sign In With Google To Continue</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}
