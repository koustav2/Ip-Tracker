import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import ClockLoader from 'react-spinners/ClockLoader'

export default function Map({ 
    data,
    isLoading,
    isError,
    error,
    isFetching,
}) {
    const Map = useMemo(() => dynamic(
        () => import('../map2/MapC'),
        {
            ssr: false
        }
    ), [])

    return <div>
        <Map data={data} 
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
        />
    </div>
}