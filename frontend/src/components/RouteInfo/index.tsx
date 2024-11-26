import React from "react";
import { Container,Map,Info } from "./styles";

type RouteInfoProps = {
    "duration":string,
    "distance":string,
    "mapUrl":string
}

const RouteInfo:React.FC<RouteInfoProps> = (props) => {
    return (
        <Container>
            <Map src={props.mapUrl}></Map>  
            <Info>Distância:{props.distance}, Tempo estimado:{props.duration}</Info>
        </Container>        
    )
}

export default RouteInfo;