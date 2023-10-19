import React, { useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LocationContext } from '../context/LocationContext'
import ClockLoader from 'react-spinners/ClockLoader'
import { useQuery } from '@tanstack/react-query';
const MapC = () => {
    const { lat, lon, error, loading } = useContext(LocationContext);
    const {
        data,
        isLoading,
    } = useQuery(['timeZone'], async () => {
        try {
            const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.NEXT_PUBLIC_TIME_ZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }, {
        enabled: lat !== null && lon !== null && !error && !loading
    });
    if (isLoading) {
        return (
            <main className=" flex justify-center items-center">

                <ClockLoader
                    color="#36d7b7"
                    size={50}
                />
            </main>
        )
    }

    const {
        formatted
    } = data

    const dateObj = new Date(formatted);
    const hours = dateObj.getHours();

    let style_id;
    if (hours >= 12) {
        style_id = 'clmz2zy7q02tg01nzah7l2mk1';
    } else if (hours === null || hours === undefined) {
        style_id = 'clmz31qa402wl01pf5hi9g8o2';
    } else {
        style_id = 'clmz31qa402wl01pf5hi9g8o2';
    }

    return (
        <MapContainer
            center={[lat, lon]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/koustavoo1/${style_id}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            />
            <Marker position={[lat, lon]} draggable={true} animate={true}>
                <Popup>
                    {data.regionName} <br />{data.zoneName}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default MapC


