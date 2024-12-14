import React, { useEffect, useState } from 'react'
import { Post as Ipost } from '../Main';
import { auth, db } from '../../config/firebase';
import { addDoc, doc, collection, getDocs, query, where, deleteDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { debounce } from "lodash";
import "../../Createpost.css"
interface Props {
    post: Ipost;
}

interface Like { 
    likeId: string;
    userId: string;
}

export default function Post(props: Props) {
    const { post } = props;
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState<Like[] | null>(null)    

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
        
    }
    const addLike = async () => {
       try {
        const newDoc = await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id
        })
        if (user) {
            setLikes((prev) => prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}])
        }
        getLikes()
       } catch (err) {
        console.log(err);
       }        
    }

    const removeLike = async() => {
        try{
            const likeToDeleteQuery = query(likesRef, 
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            )
    
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
            }
           
        } catch (err) {
            console.log(err);
            
        }
    
    }
    const hasUserLike = likes?.find((like) => like.userId === user?.uid)

    const timeAgo = (timestamp: Timestamp): string => {
        const now = new Date(); // Current time
        const pastDate = timestamp.toDate(); // Convert Firebase Timestamp to Date
        const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000); // Difference in seconds
      
        if (diffInSeconds < 60) {
          return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
        }
      
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
          return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
        }
      
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
          return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
        }
      
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
          return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
        }
      
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
          return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
        }
      
        const diffInMonths = Math.floor(diffInDays / 30); // Approximate 1 month as 30 days
        if (diffInMonths < 12) {
          return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
        }
      
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
      };

    useEffect(() => {
        getLikes();
    }, []);
     console.log(timeAgo(post.date));
    
  return (
    <div className="post-component">
        <div className="post-header">
            <img src={post?.userPhoto} alt="Profile Picture" className="profile-pic"></img>
            <div className="post-user-info">
                <h3>{post.username}</h3>
                <p className="timestamp">{timeAgo(post.date)}</p>
            </div>
            <button className="options-btn">⋮</button>
        </div>
        <div className="post-title">
            <h2>{post.title}</h2>
        </div>
        <div className="post-content">
            <p className='description'>
            {post.description}
            </p>
           { likes?.length === 0 ? "" : <p className='likecount'>{likes?.length} likes</p>  }
        </div>
        <div className="post-actions">
            <button onClick={debounce(()=>{  hasUserLike ? removeLike() : addLike() }, 800)}  className="like-btn">{hasUserLike ? '❤️ Liked' : '♡ Like'}</button>
            <button className="comment-btn">💬 Comment</button>
            <button className="share-btn">🔗 Share</button>
        </div>
    </div>

  )
}
