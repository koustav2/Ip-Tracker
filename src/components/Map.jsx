import dynamic from 'next/dynamic'
import { useMemo } from 'react'


export default function MapF() {
  const Map = useMemo(() => dynamic(
    () => import('../components/MapC'),
    {
      ssr: false
    }
  ), [])

  return <div>
    <Map />
  </div>
}