'use client'
import fetcher from '@/lib/fetcher'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { LocationContext } from '@/context/LocationContext'
import MapF from './Map'
const Details = () => {
    const { lat, lon, error, loading } = useContext(LocationContext);
    const [ip, setIp] = useState('')
    const [domain, seTdomain] = useState('')
    const [ipOpen, setIpOpen] = useState(false)
    const [domainOpen, setDomainOpen] = useState(false)
    const {
        data,
        isLoading,
        isError,
        error: queryError,
        isFetching,
        refetch,
    } = useQuery(['ipDetails'], () => fetcher(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&ip=${ip}`),
        {
            enabled: false
        });
    const {
        data: data1,
        isLoading: isLoading1,
        isError: isError1,
        error: queryError1,
        isFetching: isFetching1,
        refetch: refetch1,
    } = useQuery(['ipDetailsDomain'], () => fetcher(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_IPIFY_API_KEY}&domain=${domain}`)
        , {
            enabled: false
        });

    return (
        <div>
           
        </div>
    )
}

export default Details


