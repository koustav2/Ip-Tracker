'use client'
import useLocation from '@/hooks/useLocation';
import { createContext } from 'react';

const LocationContext = createContext();

function Provider({
    children
}) {
    const location = useLocation();
    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
}

export { LocationContext, Provider }
