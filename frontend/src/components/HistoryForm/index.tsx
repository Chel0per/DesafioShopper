import React, {useState} from "react";
import { Container,ListRidesButton, StyledInput } from "./styles";
import DriverInputSection from "../DriverInputSection";
import ErrorModal from "../ErrorModal";
import { HistoryFormValuesType } from "../../types/HistoryFormValuesType";
import { RideType } from "../../types/RideType";
import { ModalInformationType } from "../../types/ModalInformationType";

interface HistoryFormProps {
    "setRides":React.Dispatch<React.SetStateAction<RideType[]>>,
    "setShowRides":React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryForm:React.FC<HistoryFormProps> = (props) => {

    const [checked,setChecked] = useState(false);
    const [historyFormValues,setHistoryFormValues] = useState<HistoryFormValuesType>({
        "customer_id":"",
        "driver_id":"1"
    })
    const [showModal,setModal] = useState(false);
	const [modalInformation,setModalInformation] = useState<ModalInformationType>({
		"error_code":"",
		"error_description":""
	});

    async function listRidesButtonHandler(){

        let ridesResponse;
        if(historyFormValues.customer_id.trim().length === 0){
            setModalInformation({
                "error_code":"INVALID_DATA",
                "error_description":"Customer Id is required."				
            })
            setModal(true);
        }
        else{
            if(checked){
                ridesResponse = await fetch(`http://localhost:8080/ride/${encodeURIComponent(historyFormValues.customer_id.trim())}?driver_id=${historyFormValues.driver_id}`);        
            }
            else{
                ridesResponse = await fetch(`http://localhost:8080/ride/${encodeURIComponent(historyFormValues.customer_id.trim())}`);
            }
    
            if(ridesResponse.status===200){
                const ridesData = await ridesResponse.json();
                props.setRides(ridesData.rides);
                props.setShowRides(true);
            }
            else{
                const errorInformation = await ridesResponse.json();
                setModalInformation({
                    "error_code":errorInformation.error_code,
                    "error_description":errorInformation.error_description				
                })
                setModal(true);
            }              
        } 
    }

    return (
        <Container>
            <ErrorModal modalInformation={modalInformation} setModal={setModal} showModal={showModal}></ErrorModal>
            <StyledInput placeholder="Id do usuário" onChange={(e)=>{
                setHistoryFormValues({
                    ...historyFormValues,
                    customer_id:e.target.value 
                })                
            }}></StyledInput>
            <DriverInputSection historyFormValues={historyFormValues} setHistoryFormValues={setHistoryFormValues} checked={checked} setChecked={setChecked}></DriverInputSection>
            <ListRidesButton onClick={listRidesButtonHandler}>Listar Viagens</ListRidesButton>
        </Container>
    );
}

export default HistoryForm;