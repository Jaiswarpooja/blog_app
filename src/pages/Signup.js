import {signUp} from "../services/user-service";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
const Signup=()=>{

const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    about:'',
})

const [error,setError]=useState({
    errors:{},
    isError:false

})

useEffect(()=>{
console.log(data);
},[data])

const handleChange=(event,property)=>{
    //dynamic setting the value
    setData({...data,[property]:event.target.value})
}
//resetting form
const resetData=()=>{
    setData({
        name:'',
        email:'',
        password:'',
        about:'',
    })
}
 
//submit the form
const submitForm=(event)=>{
    event.preventDefault();

    // if(error.isError){
    //    toast.error("Form data is invalid ,correct all details then submit");
    //    setError({...error,isError:false}) 
    //    return  ;
    // }
    console.log(data);

//data validate

//call server api for sending data
signUp(data).then((resp)=>{
    console.log(resp);
    console.log("success log");
    toast.success("User is registered successfully !! User id "+resp.id)
    setData({
        name:"",
        email:"",
        password:"",
        about:"",
    })
}).catch((error)=>{
    console.log(error)
    console.log("Error log")

    //handle error in proper way
    setError({
        errors:error,
        isError:true
    })
})
}

    return(
       <Base>
        <Container>
            <Row className="mt-2">

               {/* {JSON.stringify(data)} */}

                <Col sm={{size:6,offset:3}}>
                <Card color="dark" inverse>
                <CardHeader>
                    <h3>Fill Information to register !!</h3>
                </CardHeader>
                <CardBody>
                    {/* form starting */}
                    <Form onSubmit={submitForm}>
                        {/* name field */}
                        <FormGroup>
                            <Label for="name">Enter Name</Label>
                            <Input type="text" placeholder="Enter here" 
                            id="name" onChange={(e)=>handleChange(e,'name')}
                            value={data.name} 
                            invalid={error.errors?.response?.data?.name ? true : false}
                            
                            />
                       
                       <FormFeedback>
                            { error.errors?.response?.data?.name }
                        </FormFeedback>

                        </FormGroup>
                        {/*  email */}
                        <FormGroup>
                            <Label for="email">Enter Email</Label>
                            <Input type="email" placeholder="Enter here" 
                            id="email" onChange={(e)=>handleChange(e,'email')}
                            value={data.email}
                            invalid={error.errors?.response?.data?.email ? true:false }
                            />

                       <FormFeedback>
                            { error.errors?.response?.data?.email }
                        </FormFeedback>

                        </FormGroup>
                        {/* password field */}
                        <FormGroup>
                            <Label for="password">Enter Password</Label>
                            <Input type="password" placeholder="Enter here" 
                            id="password" onChange={(e)=>handleChange(e,'password')}
                            value={data.password}
                            invalid={error.errors?.response?.data?.password ? true:false }
                            />
                         <FormFeedback>
                        { error.errors?.response?.data?.password }    
                        </FormFeedback> 

                        </FormGroup>
                        {/* for about */}
                        <FormGroup>
                            <Label for="about">Enter About Yourself</Label>
                            <Input type="textarea" placeholder="Enter here" 
                            id="about" onChange={(e)=>handleChange(e,'about')}
                            style={{height:"150px"}} 
                            value={data.about}
                            invalid={error.errors?.response?.data?.about ? true:false }
                            />
                           <FormFeedback>
                        { error.errors?.response?.data?.about }    
                        </FormFeedback> 

                        </FormGroup>
                        <Container className="text-center">
                            <Button outline color="light" type="submit">Register</Button>
                            <Button onClick={resetData} outline color="light" type="reset" className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
                </Col>
            </Row>
        </Container>
       </Base>
    );
};
export default Signup;