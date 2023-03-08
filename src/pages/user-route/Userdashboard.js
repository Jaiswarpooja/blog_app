import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import AddPost from "../../components/AddPost";
import Base from '../../components/Base'
import NewFeed from "../../components/NewFeed";
import Post from "../../components/Post";
import { deletePostService, loadPostUserWise } from "../../services/post-service";

const Userdashboard =()=>{

  const [user,setUser]=useState({})
 const [posts,setPosts]=useState([])
  useEffect(()=>{
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail())
    loadPostData()
    
  },[])

  function loadPostData(){
    loadPostUserWise(getCurrentUserDetail().id).then(data=>{
      console.log(data)
      setPosts([...data])
    }).catch(error=>{
      console.log(error)
      toast.error("error in loading user post")
    })
  }
//function to delete post
    
function deletedPost(post){
  //going to delete post
  console.log(post)
  deletePostService(post?.postId).then(res=>{
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
          <Container>
          <AddPost/>
          <h1 className="my-3">Posts Count :({posts.length})</h1>
          {posts.map((post,index)=>{
            return (<Post post={post} key={index} deletedPost={deletedPost}/>)
          })}
          </Container>
        </Base>
    )
}

export default Userdashboard