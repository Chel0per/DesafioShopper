import React from "react";
import {Container,CheckInput,Text,DriverSelect, StyledOption} from "./styles";
import { HistoryFormValuesType } from "../../types/HistoryFormValuesType";

interface DriverInputSectionProps {
    "historyFormValues":HistoryFormValuesType,
    "setHistoryFormValues":React.Dispatch<React.SetStateAction<HistoryFormValuesType>>,
    "checked":boolean,
    "setChecked":React.Dispatch<React.SetStateAction<boolean>>
}

const DriverInputSection:React.FC<DriverInputSectionProps> = (props)=>{
    if(props.checked){
        return(
            <Container>
                <CheckInput type="checkbox" onChange={(e)=>{props.setChecked(e.target.checked)}}></CheckInput>
                <Text>Filtrar por motorista?</Text>
                <DriverSelect onChange={(e)=>{
                    if(e.target.value==="Homer Simpson"){
                        props.setHistoryFormValues({
                            ...props.historyFormValues,
                            driver_id:"1"
                        })
                    }
                    else if(e.target.value==="Dominic Toretto"){
                        props.setHistoryFormValues({
                            ...props.historyFormValues,
                            driver_id:"2"
                        })
                    }
                    else if(e.target.value==="James Bond"){
                        props.setHistoryFormValues({
                            ...props.historyFormValues,
                            driver_id:"3"
                        })
                    }
                }}>
                    <StyledOption>Homer Simpson</StyledOption>
                    <StyledOption>Dominic Toretto</StyledOption>
                    <StyledOption>James Bond</StyledOption>
                </DriverSelect>
            </Container>
        )  
    }
    else{
        return(
            <Container>
                <CheckInput type="checkbox" onChange={(e)=>{props.setChecked(e.target.checked)}}></CheckInput>
                <Text>Filtrar por motorista?</Text>
            </Container>           
        )
    }
}

export default DriverInputSection;