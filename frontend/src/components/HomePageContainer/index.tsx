import React,{ useState } from "react";
import RoutesSection from "../RoutesSection";
import { Container,ButtonContainer,RoutesButton,HistoryButton } from "./styles";
import HistorySection from "../HistorySection";
import { PageType } from "../../types/PageType";

const HomePageContainer:React.FC = () => {

    const [pageSection,setPageSection] = useState<PageType>("routes");

    if(pageSection === "routes"){
        return(
            <Container>
                <ButtonContainer>
                    <RoutesButton pageSection={pageSection}>Rotas</RoutesButton>
                    <HistoryButton pageSection={pageSection} onClick={()=>{
                        setPageSection("history");
                    }}>Histórico</HistoryButton>
                </ButtonContainer>
                <RoutesSection setPageSection={setPageSection}></RoutesSection>
            </Container>
        )
    }
    else{
        return (
            <Container>
                <ButtonContainer>
                    <RoutesButton pageSection={pageSection} onClick={()=>{
                        setPageSection("routes");
                    }}>Rotas</RoutesButton>
                    <HistoryButton pageSection={pageSection}>Histórico</HistoryButton>
                </ButtonContainer>
                <HistorySection></HistorySection>
            </Container>
        )        
    } 
}

export default HomePageContainer;