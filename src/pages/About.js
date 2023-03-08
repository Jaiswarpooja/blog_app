import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () =>{
    return (
    <userContext.Consumer>
        {(object)=>(
             <Base>
             <h1>This is my about component</h1>
             <p>We are building blog component</p>
             {console.log(object)}
             <h1>Welcome user: {object.user?.login && object.user?.data?.user?.name}</h1>
             </Base>
        )}
    </userContext.Consumer>

    )
};
export default About;