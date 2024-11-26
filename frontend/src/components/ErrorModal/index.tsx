import React from "react";
import { Container,Warning,OkButton, ModalContainer } from "./styles"
import { ModalInformationType } from "../../types/ModalInformationType";

interface ErrorModalProps {
    "showModal":boolean,
    "modalInformation":ModalInformationType,
    "setModal":React.Dispatch<React.SetStateAction<boolean>>
}

const ErrorModal:React.FC<ErrorModalProps> = (props)=> {

    if(props.showModal) return(
        <Container>
            <ModalContainer>
                <Warning>Error code:{props.modalInformation.error_code}</Warning>
                <Warning>Error description:{props.modalInformation.error_description}</Warning>
                <OkButton onClick={()=>props.setModal(false)}>Ok</OkButton>
            </ModalContainer>
        </Container>
    )
    else return null;
    
}

export default ErrorModal;
