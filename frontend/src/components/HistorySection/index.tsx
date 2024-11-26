import React, {useState} from "react";
import HistoryForm from "../HistoryForm";
import RidesInfo from "../RidesInfo";
import { Container } from "./styles";
import { RideType } from "../../types/RideType";


const HistorySection:React.FC = () => {

    const [rides,setRides] = useState<RideType[]>([]);
    const [showRides,setShowRides] = useState(false);

    if(showRides){
        return(
            <Container>
                <HistoryForm setRides={setRides} setShowRides={setShowRides}></HistoryForm>
                <RidesInfo rides={rides}></RidesInfo>
            </Container>
        )
    }
    else {
        return (
            <Container>
                <HistoryForm setRides={setRides} setShowRides={setShowRides}></HistoryForm>
            </Container>
        )
    }
    }


export default HistorySection;