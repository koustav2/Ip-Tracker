'use client'
import Details from '@/components/Details';
import { LocationContext } from '@/context/LocationContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import HashLoader from "react-spinners/HashLoader";

export default function Home() {
  const { lat, lon, error, loading } = useContext(LocationContext);
  const {
    data,
    isLoading,
    isError,
    error: queryError,
    isFetching,
    status
  } = useQuery(['timeZone'], async () => {
    try {
      const response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&lat=${lat}&long=${lon}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }, {
    enabled: lat !== null && lon !== null && !error && !loading
  });

  if (isLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">

        <HashLoader
          color="#36d7b7"
          size={100}
        />
      </main>
    )
  }

  const {
    date_time_unix
  } = data

  const dateObj = new Date(date_time_unix * 1000);
  const hours = dateObj.getHours();

  let backgroundImage;
  if (hours >= 12) {
    backgroundImage = "url('https://img.freepik.com/free-vector/night-savannah-landscape-natural-african-background-with-hyenas-pack-silhouettes-run-through-field-with-trees-dark-starry-sky-with-full-moon-shining-game-scene-cartoon-vector-illustration_107791-9558.jpg?w=1380&t=st=1695648245~exp=1695648845~hmac=0e1963e9ee02d0b7b52c64c3300eaa72efc7de5ce0c8dc94f0f0d71665913a4a')";
  } else {
    backgroundImage = "url('https://img.freepik.com/free-photo/breathtaking-view-trees-foggy-hills-captured-sunset-hawke-s-bay-new-zealand_181624-40546.jpg?w=826&t=st=1695648309~exp=1695648909~hmac=302cd093958feb056234f50bbd4f759fbfc5d8286b6d003ab31db54899a4a1e5')";
  }

  const style = {
    backgroundImage: backgroundImage,
  };

  return (
    <main className="min-h-screen bg-cover bg-no-repeat" style={style}>
      <Details/>
    </main>
  );
}
