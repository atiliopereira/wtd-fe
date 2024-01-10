import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import React from "react";

interface LocationMapProps {
    onSetLocation: (location: LatLngExpression) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ onSetLocation }) => {
    const [position, setPosition] = React.useState<LatLngExpression>([51.505, -0.09]);
    const onMapClick = (location: LatLngExpression) => {
        setPosition(location);
        onSetLocation(location);
    };

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "20em", width: "100%" }}>
            <MapEvents onMapClick={onMapClick} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}></Marker>
        </MapContainer>
    );
}

const MapEvents: React.FC<{ onMapClick: (location: LatLngExpression) => void }> = ({ onMapClick }) => {     
        useMapEvents({
            click: (e) => {
                onMapClick(e.latlng);
            },
        });
        return null;
};

export default LocationMap;