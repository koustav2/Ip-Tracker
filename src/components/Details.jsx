'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const Details = () => {
    const [ip, setIp] = useState('')
    const [domain, seTdomain] = useState('')
    const {
        data,
        isLoading,
        isError,
        error: queryError,
        isFetching,
        refetch,
    } = useQuery(['ipDetails'], async () => {
        try {
            const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&ip=${ip}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }, {
        enabled: false
    });
    const {
        data: data1,
        isLoading: isLoading1,
        isError: isError1,
        error: queryError1,
        isFetching: isFetching1,
        refetch: refetch1,
    } = useQuery(['ipDetailsDomain'], async () => {
        try {
            const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_IPIFY_API_KEY}&domain=${domain}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }, {
        enabled: false
    });
    return (
        <div>

        </div>
    )
}

export default Details
