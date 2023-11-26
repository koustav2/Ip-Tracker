/* eslint-disable @next/next/no-img-element */
'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { LocationContext } from '@/context/LocationContext'
import MapF from './Map'
import Map from './map2/Map'
import Image from 'next/image'
const Details = () => {
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
                `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_IPIFY_API_KEY}&ipAddress=${ip}`
            );
            return res.json();
        },
        enabled: false,
    });
    console.log(data)
    return (
        <div className="flex h-screen flex-col">
            <div className="absolute -z-10">
                <img src='/images/pattern-bg-desktop.png' alt="" className="w-full h-80 object-cover" />
            </div>
            <article className="p-8">
                <h1 className="text-2xl lg:text-3xl text-center text-white font-bold mb-8">
                    IP Address Tracker
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        refetch();
                    }}
                    autoComplete="off"
                    className="flex justify-center max-w-xl mx-auto"
                >
                    <input
                        type="text"
                        name="ipaddress"
                        id="ipaddress"
                        placeholder="Search for any IP Address or domain"
                        required
                        className="py-2 px-4 rounded-l-lg w-full"
                        value={ip}
                        onChange={(e) => {
                            setIp(e.target.value);
                        }}
                    />
                    <button
                        type="submit"
                        className="bg-black py-4 px-4 hover:opacity-60 rounded-r-lg"
                    >
                        <img src='/images/icon-arrow.svg' alt="" />
                    </button>
                </form>
            </article>

                {data ? (
                    <Map
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                        error={queryError}
                        isFetching={isFetching}
                    />
                ) : (
                    <MapF 

                    />
                )}

        </div>
    );
};

export default Details

