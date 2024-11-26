import React from "react";
import styled from "styled-components";
import HomePageContainer from "../components/HomePageContainer";

const Background = styled.div`

    min-height: 100vh;
    background-color:#a8dac9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    box-sizing: border-box;
    margin: 0;        
`;

const HomePage:React.FC = () => {
    return(
        <Background>
            <HomePageContainer></HomePageContainer>
        </Background>
    )
}

export default HomePage;