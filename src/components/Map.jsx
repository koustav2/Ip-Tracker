import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import ClockLoader from 'react-spinners/ClockLoader'

export default function MapF() {
  const Map = useMemo(() => dynamic(
    () => import('../components/MapC'),
    {
      loading: () =>
        <ClockLoader
          color="#36d7b7"
          size={70}
        />
      ,
      ssr: false
    }
  ), [])

  return <div>
    <Map />
  </div>
}