import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

const Blogs = () => { 
    const [blogList, setBlogList] = useState([]);
    const blogsCollectionRef = collection(db, "blogs");
         
    const getBlogList = async () => {
        // read blogs
        // set blog list
        try {
            const data = await getDocs(blogsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setBlogList(filteredData);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => { 
        getBlogList();
    }, []);

    return (
        <div>
            { blogList.map((blog) => (
                <div key={blog.id}>
                    <h1>{blog.title}</h1>
                    <p>{blog.summary}</p>
                    <p>{blog.body}</p>
                </div>
            ))}
        </div>
    )
}

export default Blogs;