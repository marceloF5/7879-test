"use client"
import { SWRConfig } from "swr";
import { query } from "../util/api";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: query,
      }}
    >
      {children}
    </SWRConfig>
  )
}
