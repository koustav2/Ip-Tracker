'use client'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import ClockLoader from 'react-spinners/ClockLoader';
import { useQuery } from "@tanstack/react-query";

const MapC = ({
    data: {
        location: {
            lat,
            lng
        }
    },
    isLoading,
    error,
}) => {



    const {
        data: data1,
        isLoading: isLoading1,
        isError: isError1,
        error: error1,
        isFetching: isFetching1,
    } = useQuery(['timeZone1'], async () => {
        try {
            const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.NEXT_PUBLIC_TIME_ZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }, {
        enabled: lat !== null && lng !== null && !error && !isLoading
    });
    if (isLoading1 && isFetching1) {
        return (
            <main className="flex justify-center items-center">

                <ClockLoader
                    color="#36d7b7"
                    size={50}
                />
            </main>
        )
    }
    const {
        formatted
    } = data1

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
        <>
            {
                isLoading1 ? (
                    <div className="flex justify-center items-center h-full">
                        <ClockLoader
                            color="#36d7b7"
                            size={100}
                        />
                    </div>

                )
                    : (
                        <MapContainer
                            center={[lat, lng]}
                            zoom={14}
                            scrollWheelZoom={true}
                            style={{ height: "100vh", width: "100%" }}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/koustavoo1/${style_id}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                                attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                            />
                            <Marker position={[lat, lng]} draggable={true} animate={true}>
                                <Popup>
                                    {data1.regionName} <br />{data1.zoneName}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    )
            }

        </>
    )
}

export default MapC


