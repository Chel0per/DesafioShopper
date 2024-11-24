import React, { FC } from "react";
import { Container,Warning,OkButton } from "./styles"
import { ModalInformationType } from "../../types/ModalInformationType";

interface ErrorModalProps {
    "showModal":boolean,
    "modalInformation":ModalInformationType,
    "setModal":React.Dispatch<React.SetStateAction<boolean>>
}

const ErrorModal:FC<ErrorModalProps> = (props)=> {

    if(props.showModal) return(
        <Container>
            <Warning>Error code:{props.modalInformation.error_code}</Warning>
            <Warning>Error description:{props.modalInformation.error_description}</Warning>
            <OkButton onClick={()=>props.setModal(false)}>Ok</OkButton>
        </Container>
    )
    else return null;
    
}

export default ErrorModal;
