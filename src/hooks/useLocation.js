'use client'

import { useState, useEffect } from 'react'


export default function useLocation() {
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
                setLoading(false)
            },
            (error) => {
                setError(error)
                setLoading(false)
            }
        )
    }
        , [])

    return {
        lat,
        lon,
        error,
        loading
    }
}