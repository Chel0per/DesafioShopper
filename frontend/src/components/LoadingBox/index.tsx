import React from "react";
import { Container,Spinner } from "./styles";

const LoadingBox:React.FC = () => {
    return (
        <Container>
            <Spinner/>
        </Container>
    );
};
  
  export default LoadingBox;
  