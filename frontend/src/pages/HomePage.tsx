import React, { useState } from "react";
import { ModalInformationType } from "../types/ModalInformationType";
import ErrorModal from "../components/ErrorModal";

const HomePage:React.FC = () => {

	type ShowMapType = "Invisible" | "Loading" | "Showing";
	type FormValuesType = {
		"customer_id":string,
		"origin":string,
		"destination":string
	};
	type DriverType = {
		"id":number,
		"name":string,
		"description":string,
		"vehicle":string,
		"review":{
			"rating":number,
			"comment":string
		},
		"value":number
	};

	const [showMap,setShowMap] = useState<ShowMapType>("Invisible");
	const [mapUrl,setMapUrl] = useState("");
	const [formValues,setFormValues] = useState<FormValuesType>({
		"customer_id":"",
		"origin":"",
		"destination":""
	});
	const [customerId,setCustomerId] = useState("");
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
			setDistance(routeData.distance);
			setDuration(routeData.duration);
			setDrivers(routeData.options);
			const mapResponse = await fetch("http://localhost:8080/map/image",{
				method:"POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({"polyline":routeData.routeResponse.routes[0].polyline.encodedPolyline})
			});
			const mapData = await mapResponse.json();
			setMapUrl(mapData.url);
			setShowMap("Showing");
		} 
		else{
			console.log("i'm here");
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
			<div>
				<ErrorModal modalInformation={modalInformation} setModal={setModal} showModal={showModal}></ErrorModal>				
				<section style={{ display: "flex", flexDirection:"column", width:"300px" }}>
					<input type="text" placeholder="customer_id" onChange={(e) =>{
						setFormValues({
							...formValues,
							customer_id:e.target.value,
					})}}></input>
					<input type="text" placeholder="origin" onChange={(e) =>{
						setFormValues({
							...formValues,
							origin:e.target.value,
					})}}></input>
					<input type="text" placeholder="destination" onChange={(e) =>{
						setFormValues({
							...formValues,
							destination:e.target.value,
					})}}></input>
					<button onClick={calculateRouteButtonHandler}>Calculate route</button>
				</section>
			</div>
		)
	}
	else if(showMap === "Loading"){
		return(
			<div>
				<ErrorModal modalInformation={modalInformation} setModal={setModal} showModal={showModal}></ErrorModal>
				<section style={{ display: "flex", flexDirection:"column", width:"300px" }}>				
					<input type="text" placeholder="customer_id" onChange={(e) =>{
						setFormValues({
							...formValues,
							customer_id:e.target.value,
					})}}></input>
					<input type="text" placeholder="origin" onChange={(e) =>{
						setFormValues({
							...formValues,
							origin:e.target.value,
					})}}></input>
					<input type="text" placeholder="destination" onChange={(e) =>{
						setFormValues({
							...formValues,
							destination:e.target.value,
					})}}></input>
					<button>Calculate route</button>
				</section>
				<section>imagine a loading screen</section>
			</div>
		)		
	}
	else{
		return(
			<div>
				<ErrorModal modalInformation={modalInformation} setModal={setModal} showModal={showModal}></ErrorModal>
				<section style={{ display: "flex", flexDirection:"column", width:"300px" }}>
					<input type="text" placeholder="customer_id" onChange={(e) =>{
						setFormValues({
							...formValues,
							customer_id:e.target.value,
					})}}></input>
					<input type="text" placeholder="origin" onChange={(e) =>{
						setFormValues({
							...formValues,
							origin:e.target.value,
					})}}></input>
					<input type="text" placeholder="destination" onChange={(e) =>{
						setFormValues({
							...formValues,
							destination:e.target.value,
					})}}></input>
					<button onClick={calculateRouteButtonHandler}>Calculate route</button>
				</section>
				<section className="map">
					<img src={mapUrl}></img>
				</section>
				<section className="rides">
				</section>
			</div>
		)
	}
}

export default HomePage;