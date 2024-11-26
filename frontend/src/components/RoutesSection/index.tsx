import React, { useState } from "react";
import { ModalInformationType } from "../../types/ModalInformationType";
import { DriverType } from "../../types/DriverType";
import { RideFormValuesType } from "../../types/RideFormValuesType";
import { Container } from "./styles";
import ErrorModal from "../ErrorModal";
import RideForm from "../RideForm";
import RouteInfo from "../RouteInfo";
import DriversInfo from "../DriversInfo";
import durationStringParser from "../../parsers/durationStringParser";
import distanceStringParser from "../../parsers/distanceStringParser";
import LoadingBox from "../LoadingBox";
import { PageType } from "../../types/PageType";

interface RoutesSectionProps { setPageSection:React.Dispatch<React.SetStateAction<PageType>> };

const RoutesSection:React.FC<RoutesSectionProps> = (props) => {

	type ShowMapType = "Invisible" | "Loading" | "Showing";

	const [showMap,setShowMap] = useState<ShowMapType>("Invisible");
	const [mapUrl,setMapUrl] = useState("");
	const [formValues,setFormValues] = useState<RideFormValuesType>({
		"customer_id":"",
		"origin":"",
		"destination":""
	});
	const [customerId,setCustomerId] = useState("");
    const [currentOrigin,setCurrentOrigin] = useState("");
    const [currentDestination,setCurrentDestination] = useState("");
	const [distance,setDistance] = useState(0);
	const [duration,setDuration] = useState("");
	const [drivers,setDrivers] = useState<DriverType[]>([]);
	const [showModal,setModal] = useState(false);
	const [modalInformation,setModalInformation] = useState<ModalInformationType>({
		"error_code":"",
		"error_description":""
	});

	async function calculateRouteButtonHandler(){
		const routeResponse = await fetch("http://localhost:8080/ride/estimate",{
			method:"POST",
			headers: {"Content-Type":"application/json"},
			body:JSON.stringify(formValues)
		});
		if(routeResponse.status === 200){
			setShowMap("Loading");
			const routeData = await routeResponse.json();
			setCustomerId(formValues.customer_id);
            setCurrentOrigin(formValues.origin);
            setCurrentDestination(formValues.destination);
			setDistance(routeData.distance);
			setDuration(routeData.duration);
			setDrivers(routeData.options);
			const mapResponse = await fetch("http://localhost:8080/map/image",{
				method:"POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({
                    "polyline":routeData.routeResponse.routes[0].polyline.encodedPolyline,
                    "origin":routeData.origin,
                    "destination":routeData.destination
                })
			});
			const mapData = await mapResponse.json();
			setMapUrl(mapData.url);
			setShowMap("Showing");
		} 
		else {
			const errorInformation = await routeResponse.json();
			setModalInformation({
				"error_code":errorInformation.error_code,
				"error_description":errorInformation.error_description				
			})
			setModal(true);
		}
	}

	if(showMap === "Invisible"){
		return(
			<Container>
				<ErrorModal modalInformation={modalInformation} setModal={setModal} showModal={showModal}></ErrorModal>				
                <RideForm formValues={formValues} setFormValues={setFormValues} calculateRouteButtonHandler={calculateRouteButtonHandler}></RideForm>
			</Container>
		)
	}
	else if(showMap === "Loading"){
		return(
			<Container>
				<ErrorModal modalInformation={modalInformation} setModal={setModal} showModal={showModal}></ErrorModal>
				<RideForm formValues={formValues} setFormValues={setFormValues} calculateRouteButtonHandler={calculateRouteButtonHandler}></RideForm>
				<LoadingBox></LoadingBox>
			</Container>
		)		
	}
	else{
		return(
			<Container>
				<ErrorModal modalInformation={modalInformation} setModal={setModal} showModal={showModal}></ErrorModal>
				<RideForm formValues={formValues} setFormValues={setFormValues} calculateRouteButtonHandler={calculateRouteButtonHandler}></RideForm>
                <RouteInfo mapUrl={mapUrl} distance={distanceStringParser(distance)} duration={durationStringParser(duration)}></RouteInfo>
				<DriversInfo setPageSection={props.setPageSection} distance={distance} duration={duration} origin={currentOrigin} destination={currentDestination} drivers={drivers} customer_id={customerId}></DriversInfo>
			</Container>
		)
	}
}

export default RoutesSection;