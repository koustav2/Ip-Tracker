'use client'
import Details from '@/components/Details';
import { LocationContext } from '@/context/LocationContext';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import HashLoader from "react-spinners/HashLoader";


export default function Home() {
  const { lat, lon, error, loading } = useContext(LocationContext);

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center">

        <HashLoader
          color="#36d7b7"
          size={100}
        />
      </main>
    )
  }


  // const style = {
  //   backgroundImage: `url(/images/pattern-bg-desktop.png)`,
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   height: '50vh'
  // };


  return (
    <main className="min-h-screen" >
      <Details />
    </main>
  );
}
