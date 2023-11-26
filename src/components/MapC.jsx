import React, { useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LocationContext } from '../context/LocationContext'
import ClockLoader from 'react-spinners/ClockLoader'
import { useQuery } from '@tanstack/react-query';
// enabled: lat !== null && lon !== null && !error && !loading
const MapC = () => {
    const { lat, lon, loading } = useContext(LocationContext);
    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ['timezone', lat, lon],
        queryFn: async () => {
            const res = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=3e4ad07c20bb4170a1fb1ef712650bd2&lat=32.69922&long=-117.11281`)
            return res.json()

        },
        enabled: !loading,

    });
    const getInitialData = async () => {
        const res = await fetch(
            `https://geo.ipify.org/api/v2/country?apiKey=at_8PnLTa5HP14za8jK8cZzj4GYL8v2F&ipAddress=103.51.58.105`
        );
        return res.json()

    };
    const {
        data: data1,
        isLoading: isLoading1,
    } = useQuery({
        queryKey: ['ip', lat, lon],
        queryFn: getInitialData,
        enabled: !loading,

    });

    if (isLoading && isLoading1) {
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
        date_time_unix
    } = data

    const dateObj = new Date(date_time_unix);
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
            <article
                className="bg-white rounded-lg shadow p-8 mx-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl xl:mx-auto text-center md:text-left lg:-mb-16 relative "
                style={{ zIndex: 10000 }}
            >
                <div className="lg:border-r lg:border-slate-400">
                    <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
                        Ip Address
                    </h2>
                    <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">
                        {data1?.ip}
                    </p>
                </div>
                <div className="lg:border-r lg:border-slate-400">
                    <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
                        LOCATION
                    </h2>
                    <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">
                        {data1?.location?.country},{data1?.location?.region}
                    </p>
                </div>
                <div className="lg:border-r lg:border-slate-400">
                    <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
                        TIMEZONE
                    </h2>
                    <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">
                        UTC {data1?.location?.timezone}
                    </p>
                </div>
                <div>
                    <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
                        ISP
                    </h2>
                    <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">
                        {data1?.isp}
                    </p>
                </div>
            </article>
            <MapContainer
                center={[lat, lon]}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%",bottom: '10em',  }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/koustavoo1/${style_id}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                    attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                />
                <Marker position={[lat, lon]} draggable={true} animate={true}>
                    <Popup>
                        {data1?.location?.region}
                    </Popup>
                </Marker>
            </MapContainer>
        </>

    )
}

export default MapC


