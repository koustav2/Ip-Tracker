'use client';
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Providers = ({ children }) => {
   const [client] = React.useState(new QueryClient(
      {
         defaultOptions: {
            queries: {
               refetchOnWindowFocus: false,
            },
         },
      }
   ));
   return (
      <QueryClientProvider client={client}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}