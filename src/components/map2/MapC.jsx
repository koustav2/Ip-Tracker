+'use client'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import ClockLoader from 'react-spinners/ClockLoader';
import { useQuery } from "@tanstack/react-query";
// https://api.ipgeolocation.io/timezone?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&lat=${lat}&long=${lng}
const MapC = ({
    data: {
        ip,
        location: {
            lat,
            lng,
            timezone,
            country,
            region
        },
        isp
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
    } = useQuery({
        queryKey: ['timezone', { lat, lng }],
        queryFn: async () => {
            const res = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&lat=${lat}&long=${lng}`)
            return res.json()
        },
        enabled: !isLoading,
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
        date_time_unix
    } = data1

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
                                        {ip}
                                    </p>
                                </div>
                                <div className="lg:border-r lg:border-slate-400">
                                    <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
                                        LOCATION
                                    </h2>
                                    <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">
                                        {country},{region}
                                    </p>
                                </div>
                                <div className="lg:border-r lg:border-slate-400">
                                    <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
                                        TIMEZONE
                                    </h2>
                                    <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">
                                        UTC {timezone}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
                                        ISP
                                    </h2>
                                    <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">
                                        {isp}
                                    </p>
                                </div>
                            </article>
                            <MapContainer
                                center={[lat, lng]}
                                zoom={14}
                                scrollWheelZoom={true}
                                style={{ height: "100vh", width: "100%", bottom: '7em', }}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/koustavoo1/${style_id}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                                    attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                                />
                                <Marker position={[lat, lng]} draggable={true} animate={true}>
                                    <Popup>
                                        {data1.timezone}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </>
                    )
            }

        </>
    )
}

export default MapC


