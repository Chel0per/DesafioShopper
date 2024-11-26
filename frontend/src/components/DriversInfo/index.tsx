import React from "react";
import { DriverType } from "../../types/DriverType";
import { Container,DriverContainer,Info,ConfirmRideButton } from "./styles";
import { PageType } from "../../types/PageType";

interface DriversInfoProps {
    setPageSection:React.Dispatch<React.SetStateAction<PageType>>,
    distance:number,
    duration:string,
    origin:string,
    destination:string,
    customer_id:string,
    drivers:DriverType[]
}

const DriversInfo:React.FC<DriversInfoProps> = (props) => {
    return (
        <Container>
            {props.drivers.map((driver) => {
                return(
                    <DriverContainer key={driver.id}>
                        <Info>Nome:{driver.name}</Info>
                        <Info>Descrição:{driver.description}</Info>
                        <Info>Carro:{driver.vehicle}</Info>
                        <Info>Avaliação:{driver.review.rating}/5 {driver.review.comment}</Info>
                        <Info>Preço:{driver.value.toFixed(2)} R$</Info>
                        <ConfirmRideButton onClick={async () => {
                            const requestBody = {
                                "customer_id":props.customer_id,
                                "origin":props.origin,
                                "destination":props.destination,
                                "distance":props.distance,
                                "duration":props.duration,
                                "driver":{
                                    "id":driver.id,
                                    "name":driver.name
                                },
                                "value":driver.value.toFixed(2)
                            };
                            await fetch("http://localhost:8080/ride/confirm",{
                                method:"PATCH",
                                headers: {"Content-Type":"application/json"},
                                body:JSON.stringify(requestBody)
                            });
                            props.setPageSection("history");
                        }}>Confirmar Viagem</ConfirmRideButton>
                    </DriverContainer>                    
                )
            })}
        </Container>
    )
}

export default DriversInfo;