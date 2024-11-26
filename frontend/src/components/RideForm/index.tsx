import React from "react"
import { RideFormValuesType } from "../../types/RideFormValuesType"
import { StyledInput,Container,CalculateRouteButton } from "./styles"

type RideFormProps = {
    "formValues":RideFormValuesType,
    "setFormValues":React.Dispatch<React.SetStateAction<RideFormValuesType>>,
    "calculateRouteButtonHandler":()=>void
}

const RideForm:React.FC<RideFormProps> = (props) => {
    return (
        <Container>
            <StyledInput type="text" placeholder="Id do usuário" onChange={(e) =>{
				props.setFormValues({
				...props.formValues,
				customer_id:e.target.value.trim(),
			})}}></StyledInput>
            <StyledInput type="text" placeholder="Origem" onChange={(e) =>{
				props.setFormValues({
				...props.formValues,
				origin:e.target.value.trim(),
			})}}></StyledInput>
            <StyledInput type="text" placeholder="Destino" onChange={(e) =>{
				props.setFormValues({
				...props.formValues,
				destination:e.target.value.trim(),
			})}}></StyledInput>
            <CalculateRouteButton onClick={props.calculateRouteButtonHandler}>Calcular Rota</CalculateRouteButton>
        </Container>
    );
}

export default RideForm;