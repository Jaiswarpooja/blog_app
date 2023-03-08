import { loadAllCategories } from "../services/category-service"
import { Card, CardBody, Label ,Form, Input, Container, Button} from "reactstrap"
import { useEffect, useRef, useState } from "react"
import JoditEditor from "jodit-react";
import { createPost as doCreatePost, uploadPostImage} from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";

const AddPost=()=>{

    const editor=useRef(null)

    const [user,setUser]=useState(undefined)

    // const [content,setContent]=useState('')

    const [categories,setCategories]=useState([])

   const [post,setPost] = useState({
        title:'',
        content:'',
        categoryId:''
    })

    const [image,setImage]=useState(null)

    // const config={
    //     placeholder:"start typing..."
    // }
    useEffect(
        ()=>{
            setUser(getCurrentUserDetail())
           loadAllCategories().then((data)=>{
            // console.log(data)   
             setCategories(data)
        }).catch(error=>{
            console.log(error)
        })
        },[]
    )

    //field changed function
    const fieldChanged=(event)=>{
        //console.log(event)
        setPost({...post,[event.target.name]:event.target.value})
    }

    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }

    //create post
    const createPost=(event)=>{
        event.preventDefault();
        
        if(post.title.trim()===''){
            toast.error("post title is required !!")
            return;
        }
        if(post.content.trim()===''){
            toast.error("post content is required")
            return;
        }
        if(post.categoryId===''){
            toast.error("select some category !!")
            return;
        }

        //submit the form on server
        post['userId']=user.id
        doCreatePost(post).then(data=>{

            uploadPostImage(image,data.postId).then(data=>{
                toast.success("Image uploaded")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })
           toast.success("Post created !!")
            //console.log(post)
            setPost({
                title:'',
                content:'',
                categoryId:''
            })
        }).catch((error)=>{
            toast.error("Post not created due to some error !!" )
            //console.log(error)
        })
    }

    //to hande the file change
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }
    return(
        <div className="wrapper">
            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    
                    <h3>What's going in your mind ?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" 
                            placeholder="Enter here" className="rounded-0"
                            name="title"
                            onChange={fieldChanged}></Input>
                        </div>

                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            {/* <Input type="textarea" id="content" 
                            placeholder="Enter here" className="rounded-0"
                            style={{height:'150px'}} /> */}
                           
                             <JoditEditor ref={editor} 
                             value={post.content} 
                             onChange={contentFieldChanged}>
                             </JoditEditor>

                        </div>

                            {/* file field */}

                            <div className="mt-3">
                                <Label for="image">Select Post banner</Label>
                                <Input id="image" type="file" onChange={handleFileChange}/>
                            </div>
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" 
                            placeholder="Enter here" className="rounded-0"
                            name="categoryId"
                            onChange={fieldChanged}
                            defaultValue={0}>
                               
                               <option disabled value={0}>--select category--</option>
                               {
                                
                                categories.map((category)=>(
                                    <option value={category.categoryId} key={category.categoryId}>
                                        {category.categoryTitle}
                                    </option>
                                ))
                               }

                            </Input>
                        </div>
                        <div>
                            <Container className="text-center">
                                <Button type="submit" color="primary" className="rounded-0">Create Post</Button>
                                <Button color="danger" className="rounded-0 ms-2">Reset content </Button>
                            </Container>
                        </div>
                    </Form>
                    
                </CardBody>
            </Card>
        </div>
    )
}
export default AddPost