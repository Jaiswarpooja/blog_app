import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import Base from '../components/Base'
import CategorySideMenu from '../components/CategorySideMenu'
import { deletePostService, loadPostCategoryWise } from "../services/post-service";
import Post from '../components/Post';

function Categories(){

    const [posts,setPosts]=useState([])

    const {categoryId} =useParams()

    useEffect(()=>{
        console.log(categoryId);
        loadPostCategoryWise(categoryId).then(data=>{
               setPosts([...data])
        }).catch(error=>{
            console.log(error)
            toast.error("error in loading post")
        })
    },[categoryId])

    //function to delete post
    
function deletedPost(post){
    //going to delete post
    console.log(post)
    deletePostService(post.postId).then(res=>{
      console.log(res)
      toast.success("post is deleted..")
      let newPosts=posts.filter(p=>p.postId!=post.postId)
      setPosts([...newPosts])
    }).catch(error=>{                                 
      console.log(error)
      toast.error("error in deleteing post")
    })
  }

    return(
       <Base>
        <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-5">
                    <CategorySideMenu />
                </Col>
                <Col md={10}>
                    <h2>Blogs Count ({posts.length})</h2>
                    {
                        posts && posts.map((post,index)=>{
                            return(
                               <Post deletedPost={deletedPost} post={post} key={index}/>
                            )
                        })
                    }
                    { posts.length<=0? <h4>No post in this category</h4>:'' }
                </Col>
            </Row>
        </Container>
       </Base>
    )
}
export default Categories