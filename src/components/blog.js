import { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const Blog = () => { 
    const [blogList, setBlogList] = useState([]);
    const blogsCollectionRef = collection(db, "blogs");

    // New Blog States
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [body, setBody] = useState("");
    const [publish, setPublish] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");

    // File Upload States
    const [fileUpload, setFileUpload] = useState(null);
         
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

    const onSubmitBlog = async () => {
        try {
            await addDoc(blogsCollectionRef, {
                author: "Helina",
                title,
                summary,
                body,
                public: publish,
                userId: auth?.currentUser?.uid,
            });
            getBlogList();
        } catch (err) {
            console.log(err);
        }
    };

    const onDeleteBlog = async (id) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            getBlogList();
        } catch (err) {
            console.log(err);
        }
    };

    const onUpdateTitle = async (id) => {
        try {
            await updateDoc(doc(db, "blogs", id), {title: updatedTitle});
            getBlogList();
        } catch (err) {
            console.log(err);
        }
    };

    const onFileUpload = async () => { 
        if (fileUpload) {
            const storageRef = ref(storage, "images/" + fileUpload[0].name);
            try {
                await uploadBytes(storageRef, fileUpload[0]);
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div>
            <div>
                <input placeholder="Blog Title" onChange={(e) => setTitle(e.target.value)}/>
                <input placeholder="Blog Summary" onChange={(e) => setSummary(e.target.value)} />
                <input placeholder="Blog Body" onChange={(e) => setBody(e.target.value)} />
                <input 
                type="checkbox"
                checked={publish} 
                onChange={(e) => setPublish(e.target.checked)} /> 
                <label>Publish</label>
                <button onClick={onSubmitBlog}>Submit</button>
            </div>
            { blogList.map((blog) => (
                <div key={blog.id}>
                    <h1>{blog.title}</h1>
                    <p>{blog.summary}</p>
                    <p>{blog.body}</p>
                    <button onClick={() => onDeleteBlog(blog.id)}>Delete</button>
                    <input placeholder="Edit Title" onChange={(e) => setUpdatedTitle(e.target.value)}/>
                    <button onClick={() => onUpdateTitle(blog.id)}>Update Title</button>
                </div>
            ))}
            <div>
                <input type='file' onChange={(e) => setFileUpload(e.target.files)}/>
                <button onClick={onFileUpload}>Upload File</button>
            </div>
        </div>
    )
}

export default Blog;