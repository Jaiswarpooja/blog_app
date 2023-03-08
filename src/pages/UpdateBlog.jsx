import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import Base from '../components/Base'
import userContext from '../context/userContext'
import { loadAllCategories } from '../services/category-service'
import { loadPost,updatePost as doUpdatePost } from '../services/post-service'
import JoditEditor from "jodit-react"

function UpdateBlog() {

  const editor = useRef(null)  
  const [categories,setCategories]=useState([])
  const {blogId}=useParams()
  const object=useContext(userContext)
  const navigate=useNavigate()
  const [post,setPost]=useState(null)

  useEffect(()=>{

    loadAllCategories().then((data)=>{
        // console.log(data)   
         setCategories(data)
    }).catch(error=>{
        console.log(error)
    })

  //load the blog from database
  loadPost(blogId).then(data=>{
    setPost({...data, categoryId:data.category.categoryId})
  }).catch(error=>{
      console.log(error);
      toast.error("error in loading blog")
  })
  },[])

  useEffect(()=>{
    console.log("first")
          if(post){
            if(post.user.id != object.user.data.id)
            {
                toast.error("This is your post !!")
                navigate("/")
            }
          }
  },[post])

  const handleChange=(event,fieldName)=>{
    setPost({
        ...post,
        [fieldName]:event.target.value
    })
  }

  const updatePost=(event)=>{
    event.preventDefault()
    console.log(post)
    doUpdatePost({...post,category:{categoryId:post.categoryId}},post.postId)
    .then(res=>{
        console.log(res)
        toast.success("Post update ")

    }).catch(error=>{
        console.log(error)
        toast.error("Error in updating post")
    })
  }
  const updateHtml=()=>{

    return (
        
        <div className="wrapper">
            
            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    
                    <h3>Update post from here !!</h3>
                    <Form onSubmit={updatePost}>
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" 
                            placeholder="Enter here" className="rounded-0"
                            name="title"
                            value={post.title}
                            onChange={(event)=>handleChange(event,'title')}></Input>
                        </div>

                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            {/* <Input type="textarea" id="content" 
                            placeholder="Enter here" className="rounded-0"
                            style={{height:'150px'}} /> */}
                           
                             <JoditEditor ref={editor} 
                             value={post.content}
                             onChange={newContent=>setPost({...post,content:newContent})}>
                             </JoditEditor>

                        </div>

                            {/* file field */}

                            <div className="mt-3">
                                <Label for="image">Select Post banner</Label>
                                <Input id="image" type="file" onChange={''}/>
                            </div>
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" 
                            placeholder="Enter here" className="rounded-0"
                            name="categoryId"
                            onChange={(event)=>handleChange(event,'categoryId')}
                            value={post.categoryId}
                            >
                               
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
                                <Button type="submit" color="primary" className="rounded-0">Update Post</Button>
                                <Button color="danger" className="rounded-0 ms-2">Reset content </Button>
                            </Container>
                        </div>
                    </Form>
                    
                </CardBody>
            </Card>
        </div>
    )
  }
    return (
    <Base>
    <Container>
    {post && updateHtml()}
    </Container>
    </Base>
  )
}

export default UpdateBlog
