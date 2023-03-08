import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import NewFeed from "../components/NewFeed.jsx";


const Home=()=>{
    
    return(
        <Base>
        <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-3">
          <CategorySideMenu/>
          </Col>
          <Col md={10}>
          <NewFeed/>
          </Col>
        </Row>
        </Container>
        </Base>
    );
};
export default Home;