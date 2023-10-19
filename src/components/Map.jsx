import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import ClockLoader from 'react-spinners/ClockLoader'

export default function MapF() {
  const Map = useMemo(() => dynamic(
    () => import('../components/MapC'),
    {
      loading: () =>
        <div
        className="flex justify-center items-center min-h-screen"
        >
          <ClockLoader
            color="#36d7b7"
            size={70}
          />
        </div>
      ,
      ssr: false
    }
  ), [])

  return <div>
    <Map />
  </div>
}