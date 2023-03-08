import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { deletePostService, loadAllPosts } from "../services/post-service";
import Post from "./Post";

function NewFeed(){

    const [postContent,setPostContent]=useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    })

    const [currentPage,setCurrentPage]=useState(0)
    useEffect(()=>{
       changePage(currentPage)
    },[currentPage])
    
    const changePage=(pageNumber=0,pageSize=4)=>{
        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            return;
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
            return;
        }
        loadAllPosts(pageNumber,pageSize).then(data=>{

            setPostContent({
                content:[...postContent.content,...data.content],
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                pageSize:data.pageSize,
                lastPage:data.lastPage,
                pageNumber:data.pageNumber
            })
            console.log(data)
            
        }).catch(error=>{
            toast.error("Error in loading posts")
        })
    }

    function deletedPost(post){
        //going to delete post
        console.log(post)
        deletePostService(post.postId).then(res=>{
          console.log(res)
          toast.success("post is deleted..")
         let newPostContents= postContent.content.filter(p=>p.postId!=post.postId)
         setPostContent({...postContent,content:newPostContents}) 

        }).catch(error=>{                                 
          console.log(error)
          toast.error("error in deleteing post")
        })
      }

    const changePageInfinite=()=>{
        console.log("Page changed");
        setCurrentPage(currentPage+1)
    }
    return(
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size:12
                        
                    }
                }>
                <h1>Blogs Count ({postContent?.totalElements})</h1>
               <InfiniteScroll
               
               dataLength={postContent.content.length}
               next={changePageInfinite}
               hasMore={ !postContent.lastPage}
               loader={<h4>Loading</h4>}
               endMessage={
                <p style={{ textAlign:'center'}}>
                <b>Yay! You have seen it all</b>
                </p>
               }
               >
               {
                    postContent.content.map((post)=>(
                        <Post deletedPost={deletedPost} post={post} key={post.postId} />
                    ))
                }
               </InfiniteScroll>
                {/* <Container className="mt-3">
                     <Pagination>
                        <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0}>
                            <PaginationLink previous>
                                 Previous
                            </PaginationLink>
                        </PaginationItem>

                        {
                            [...Array(postContent.totalPages)].map((item,index)=>(
                                <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
                                    <PaginationLink >
                                        {index+1}    
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }
                        <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                            <PaginationLink next>
                                Next
                            </PaginationLink>
                        </PaginationItem>
                     </Pagination>
                </Container> */}
                </Col>
            </Row>
        </div>
    )
}
export default NewFeed