import Leaflet from "leaflet";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import {useState} from "react";
import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: markerRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const MapComponent = () => { 
    
    const zoom = 16;
    const containerStyle = {
        width: "100%",
        height: "400px"
    }
    const center = {
        lat: 28.626137,
        lng: 79.821603
    }
    const initialMarkers = [
        {
            position: {
                lat: 28.625485,
                lng: 79.821091
            },
            draggable: true
        },
        {
            position: {
                lat: 28.625293,
                lng: 79.817926
            },
            draggable: false
        },
        {
            position: {
                lat: 28.625182,
                lng: 79.81464
            },
            draggable: true
        },
    ];

    const [markers, setMarkers] = useState(initialMarkers);

    const mapClicked = async (event: {latlng: {lat: any; lng: any;};}) => {
        console.log(event.latlng.lat, event.latlng.lng)   
    }

    const markerClicked = (marker: {position: any; draggable?: boolean;}, index: number) => {   
        console.log(marker.position.lat, marker.position.lng) 
    }

    const markerDragEnd = (event: {lat: any; lng: any;}, index: number) => {
        console.log(event.lat, event.lng)
    } 

    return (
        <MapContainer
            style={containerStyle}
            center={center}
            zoom={zoom}
            scrollWheelZoom={false} 
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapContent
                onClick={mapClicked}
            />
            {/* {markers.map((marker, index) => (
                <MarkerContent
                    key={index}
                    position={marker.position}
                    draggable={marker.draggable}
                    onMarkerClick={(event: any) => markerClicked(marker, index)}
                    onDragEnd={(event: any) => markerDragEnd(event, index)}
                />
            ))} */}
        </MapContainer>
    );
};


const MapContent = (e: any) => {  
    const map = useMapEvents({
        click: event => e.onClick(event)
    }) 
    return null;
}

// const MarkerContent = (props: {position: any; draggable: any; onMarkerClick: any; onDragEnd: any;}) => {
//     const markerRef = useRef();
//     const { position, draggable, onMarkerClick, onDragEnd } = props;  
    
//     return <Marker
//         position={position}
//         draggable={draggable}
//         eventHandlers={{
//             click: (event: any) => onMarkerClick(event),
//             dragend: () => onDragEnd(markerRef.current.getLatLng())
//         }}
//         ref={markerRef}
//     >
//         <Popup>
//             <b>{position.lat}, {position.lng}</b>
//         </Popup>
//     </Marker>
// }

export default MapComponent;
