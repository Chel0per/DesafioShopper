import React from "react";
import { Container,RideContainer,Info } from "./styles";
import { RideType } from "../../types/RideType";
import distanceStringParser from "../../parsers/distanceStringParser";
import durationStringParser from "../../parsers/durationStringParser";

interface RidesInfoProps {
    rides:RideType[]
}

const RidesInfo:React.FC<RidesInfoProps> = (props)=> {

    return (
        <Container>
            {props.rides.map((ride)=>{

                const dateParser = new Date(ride.date);

                const formatter = new Intl.DateTimeFormat("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
            
                return (
                    <RideContainer key={ride.id}>
                        <Info>Data:{formatter.format(dateParser)}</Info>
                        <Info>Motorista:{ride.driver.name}</Info>
                        <Info>Origem:{ride.origin}</Info>
                        <Info>Destino:{ride.destination}</Info>
                        <Info>Distância:{distanceStringParser(ride.distance)}</Info>
                        <Info>Tempo estimado:{durationStringParser(ride.duration)}</Info>
                        <Info>Valor:{ride.value} R$</Info>
                    </RideContainer>
                )
            })}
        </Container>
    )
}

export default RidesInfo;