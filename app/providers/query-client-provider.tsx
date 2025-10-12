'use client'



import { QueryClient, QueryClientProvider as OriginalClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react";

const makeQueryClient = (): QueryClient => { return new QueryClient() }
let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
    if (typeof window === 'undefined')
        browserQueryClient = makeQueryClient();
    else
        if (!browserQueryClient)
            browserQueryClient = makeQueryClient();

    return browserQueryClient;
}

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = getQueryClient();

    return <OriginalClientProvider client={queryClient!} >
        {children}
    </OriginalClientProvider>
}