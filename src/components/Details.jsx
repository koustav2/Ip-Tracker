'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { LocationContext } from '@/context/LocationContext'
import MapF from './Map'
import Map from './map2/Map'
const Details = () => {
    const { lat, lon, error, loading } = useContext(LocationContext);
    const [ip, setIp] = useState('');


    const {
        data,
        isLoading,
        isError,
        error: queryError,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['ip'],
        queryFn: async () => {
            const res = await fetch(
                `https://geo.ipify.org/api/v2/country,city?apiKey=at_8PnLTa5HP14za8jK8cZzj4GYL8v2F&ipAddress=${ip}`
            );
            return res.json();
        },
        enabled: false,
    });
    return (
        <div>
            <input
                placeholder="Enter IP Address"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
            />
            <button
                onClick={() => refetch()}
            >
                Search
            </button>
            {data ? (
                <Map data={data} isLoading={isLoading}
                    isError={isError}
                    error={error}
                    isFetching={isFetching}
                />
            ) : (
                <MapF />
            )}

        </div>
    )
}

export default Details

