import { title } from 'process';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, Timestamp} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import  "../../Createpost.css";
import { useNavigate } from 'react-router-dom';  


interface CreateFormData {
    title: string;
    description: string;
}

export default function Createform() {
    const schema = yup.object().shape({
        title: yup.string().required("You must need a title."),
        description: yup.string().required("You must need a description."),
          
    })

    const [user] = useAuthState(auth); 
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            //tittle: data.title,
            //description: data.description, replace by
            ...data,
            username: user?.displayName,
            userId: user?.uid,
            userPhoto: user?.photoURL,
            date: Timestamp.fromDate(new Date()),

        })

        navigate("/")
    }

    console.log(user);
    

  return (  
    <div>
        <form className="formbold-chatbox-form" onSubmit={handleSubmit(onCreatePost)}>
          <div className="formbold-mb-5">
            <label className="formbold-form-label"> Your Name </label>
            <input className="formbold-form-input" placeholder='Name...' type="text" />
          </div>
          <div className="formbold-mb-5">
            <label className="formbold-form-label"> Email Address </label>
            <input className="formbold-form-input" placeholder='Title...' type="text" {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
          </div> 
           <div className="formbold-mb-5">
            <label className="formbold-form-label"> Message </label>
            <textarea
              placeholder="Explain you queries"
              className="formbold-form-input"
              {...register("description")}
            ></textarea>
            <p style={{color: "red"}}>{errors.description?.message}</p>
          </div>
            <button className="formbold-btn w-full" type="submit">Submit</button> 
        </form>  
  </div>
  )
}
