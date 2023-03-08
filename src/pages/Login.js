
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Form ,Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row, Container, Button } from "reactstrap";
import Base from "../components/Base";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login=()=>{

    const userContextData=useContext(userContext);

    const navigate=useNavigate()

  const [loginDetail,setLoginDetail]=useState({
    username:'',
    password:''
  })

  const handleChange=(event,field)=>{
    let actualValue=event.target.value
    setLoginDetail({
        ...loginDetail,
        [field]:actualValue
    })
  };
   
  const handleReset =()=>{
    setLoginDetail({
        username:"",
        password:""
    });
  };

   const handleFormSubmit=(event)=>{
     event.preventDefault();
     console.log(loginDetail);

     //validation
     if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
        toast.error("Username or password is required !!")
        return;
     }

//submit the data to server to generate token
   loginUser(loginDetail).then((data)=>{
    console.log(data)
    
    //save the data to local storage
    doLogin(data,()=>{
        //console.log("login details is saved to localStorage")

        //redirect to user dashboard
        userContextData.setUser({
            data:data.user,
            login:true
        })
        navigate("/user/dashboard")
    })

    toast.success("Login success")
   }).catch(error=>{
    //console.log(error)
    if(error.response.status==400 || error.response.status==404){
        toast.error(error.response.data.message)
    }else{
        toast.error("Something went wrong on server !!")
    }
    
   })

   }
   
    return(
        <Base>
       <Row className="mt-2">
        <Col sm={{size:6,offset:3}}>
            <Card inverse color="dark">
                <CardHeader>
                    <h3>Login Here !!</h3>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleFormSubmit}>
                        {/* Email field */}
                        <FormGroup>
                            <Label for="email">Enter Email</Label>
                            <Input type="email" id="email"
                            value={loginDetail.username}
                            onChange={(e)=> handleChange(e,'username')}/>
                        </FormGroup>
                        {/* Password field */}
                        <FormGroup>
                            <Label for="password">Enter Password</Label>
                            <Input type="password" id="password"
                            value={loginDetail.password}
                            onChange={(e)=> handleChange(e,'password')}/>
                        </FormGroup>
                        <Container className="text-center">
                            <Button color="light" outline>Login</Button>
                            <Button onClick={handleReset} className="ms-2" outline color="secondary">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </Col>
       </Row>
        </Base>
    );
};
export default Login;