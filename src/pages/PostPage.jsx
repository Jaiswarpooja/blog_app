import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import { isLoggedIn } from "../auth"
import Base from "../components/Base"
import { BASE_URL } from "../services/helper"
import { createComment, loadPost } from "../services/post-service"

const PostPage=()=>{

    const {postId}=useParams()

    const [post,setPost]=useState(null)

    const [comment,setComment]=useState({
        content:''
    })
    useEffect(()=>{
        //load post of postId
        loadPost(postId).then(data=>{
            console.log(data);
            setPost(data)
        }).catch(error=>{
            console.log(error)
            toast.error("Error in loading post")
        })
    },[])

    const printDate=(numbers)=>{
        return new Date(numbers).toLocaleDateString()
    }

    const submitPost=()=>{
        if(!isLoggedIn()){
            toast.error("Need to login first !!")
            return
        }
        if(comment.content.trim()===''){
            return
        }
        createComment(comment,post.postId)
        .then(data=>{
            console.log(data)
            toast.success("comment added...");
            setPost({
                ...post,
                comments:[...post.comments,data.data]
            })
            setComment({
                content:''
            })
        }).catch(error=>{
            console.log(error)
        })
    }
    return(
        <Base>

        {/* posts section*/}
        <Container className="mt-3">
            <Link to={"/"}>Home</Link> / {post && (<Link to="">{post.title}</Link>)}
            <Row>
                <Col md={{
                    size:12
                }}>
                    <Card className="mt-3">
                        {
                            (post) && (
                                <CardBody>
                            <CardText>Posted By <b>{post?.user.name} </b> on <b>{printDate(post.addedDate)}</b></CardText>
                            <CardText>
                                <span className="text-muted">
                                    {post.category.categoryTitle}
                                </span>
                            </CardText>
                            <div className="divider" style={{
                                width:'100%',
                                height:'1px',
                                background:'#e2e2e2'
                            }}>

                            </div>
                            <CardText className="mt-3">
                                <h1>{post.title}</h1>
                            </CardText>
                            <div className="image-container mt-3 container text-center" style={{width:'50%'}}>
                                <img className="img-fluid" src={BASE_URL+'/post/image/'+post.imageName} alt="" />
                            </div>
                            <CardText className="mt-3" dangerouslySetInnerHTML={{__html:post?.content}}>

                            </CardText>
                        </CardBody>
                            )
                        }
                    </Card>
                </Col>
            </Row>

            {/* comments section */}
            <Row className="mt-4">
                          <Col md={
                            {
                                size:9,
                                offset:2
                            }
                          }>
                              <h3>Comments ({ post?post.comments.length:0 })</h3>
                                  {
                                    post && post.comments.map((c,index)=>(
                                        <Card className="mt-2 border-0" key={index}>
                                            <CardBody>
                                                <CardText>
                                                {c.content}
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    ))
                                  }
                                        <Card className="mt-2 border-0">
                                             <CardBody>
                                                <Input type="textarea"
                                                placeholder="Enter comments here"
                                                value={comment.content}
                                                onChange={(event)=>setComment({content:event.target.value})}
                                                />
                                             <Button onClick={submitPost} className="mt-2" color="primary">submit</Button>   
                                             </CardBody>
                                        </Card>
                                  
                          </Col>
            </Row>
        </Container>
        </Base>
    )
}
export default PostPage