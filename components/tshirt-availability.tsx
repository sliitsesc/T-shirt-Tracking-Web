"use client"
import { useState, useEffect, useRef } from "react"
import { RefreshCw, AlertTriangle, Loader2, Lock } from "lucide-react"
import type { ApiResponse, SizeAvailability } from "@/types"

const API_URL = "https://tee-backend-06or.onrender.com/api/tshirt-data"
const LOW_STOCK_THRESHOLD = 5
const FETCH_INTERVAL = 180000
const ENABLE_FETCHING = true

export default function TShirtAvailability() {
  const [sizes, setSizes] = useState<SizeAvailability[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>("Never")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [fetchCount, setFetchCount] = useState(0)
  const [isMockData, setIsMockData] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const transformApiData = (data: ApiResponse): SizeAvailability[] => {
    return Object.entries(data)
      .map(([size, sizeData]) => {
        let status: "available" | "low" | "out" = "out"
        if (sizeData.availability > 0) {
          status = sizeData.availability <= LOW_STOCK_THRESHOLD ? "low" : "available"
        }

        return {
          size,
          total: sizeData.stockReceived,
          available: sizeData.availability,
          status,
        }
      })
      .sort((a, b) => {
        const sizeOrder = ["3XS", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"]
        return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
      })
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setIsMockData(false)

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const isMock = response.headers.get("X-Mock-Data") === "true"
      setIsMockData(isMock)

      if (isMock) {
        const errorMessage = response.headers.get("X-Error-Message")
        setError(`Using demo data: ${errorMessage || "API unavailable"}`)
      }

      const data = await response.json()

      if (!data || Object.keys(data).length === 0) {
        throw new Error("No data available")
      }

      if (data.error && data.error.includes("authentication")) {
        throw new Error("Authentication required. Please sign in to access the data.")
      }

      const transformedData = transformApiData(data)
      setSizes(transformedData)
      setLastUpdated(new Date().toLocaleString() + (isMock ? " (demo data)" : ""))
      setFetchCount((prev) => prev + 1)
    } catch (err: any) {
      const mockData: ApiResponse = {
        "3XS": { distributed: 5, stockReceived: 10, availability: 5 },
        "2XS": { distributed: 10, stockReceived: 20, availability: 10 },
        XS: { distributed: 20, stockReceived: 30, availability: 10 },
        S: { distributed: 40, stockReceived: 50, availability: 10 },
        M: { distributed: 80, stockReceived: 100, availability: 20 },
        L: { distributed: 70, stockReceived: 80, availability: 10 },
        XL: { distributed: 40, stockReceived: 50, availability: 10 },
        "2XL": { distributed: 20, stockReceived: 30, availability: 10 },
        "3XL": { distributed: 5, stockReceived: 10, availability: 5 },
      }

      setSizes(transformApiData(mockData))
      setLastUpdated(new Date().toLocaleString() + " (demo data)")
      setIsMockData(true)

      if (err.message.includes("authentication")) {
        setError("Authentication required. Please sign in to access the data.")
      } else if (err.message.includes("No data available")) {
        setError("No T-shirt data available. Please check back later.")
      } else if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
        setError("Network error. Please check your connection and try again.")
      } else {
        setError(`Using demo data: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (ENABLE_FETCHING) {
      fetchData()
      intervalRef.current = setInterval(fetchData, FETCH_INTERVAL)
    } else {
      const mockData: ApiResponse = {
        "3XS": { distributed: 5, stockReceived: 10, availability: 5 },
        "2XS": { distributed: 10, stockReceived: 20, availability: 10 },
        XS: { distributed: 20, stockReceived: 30, availability: 10 },
        S: { distributed: 40, stockReceived: 50, availability: 10 },
        M: { distributed: 80, stockReceived: 100, availability: 20 },
        L: { distributed: 70, stockReceived: 80, availability: 10 },
        XL: { distributed: 40, stockReceived: 50, availability: 10 },
        "2XL": { distributed: 20, stockReceived: 30, availability: 10 },
        "3XL": { distributed: 5, stockReceived: 10, availability: 5 },
      }

      setSizes(transformApiData(mockData))
      setLastUpdated("Using demo data (fetching disabled)")
      setIsLoading(false)
      setIsMockData(true)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <section className="py-12 bg-gradient-to-b from-black to-black/95" id="availability">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded-full mb-4">
              Stock Availability
            </div>
            <h2 className="text-3xl font-bold mb-2">T-shirt Availability</h2>
            <p className="text-white/60">Check current stock levels by size</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center mb-6 pb-4 border-b border-white/10">
              {error ? (
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
              ) : ENABLE_FETCHING ? (
                <RefreshCw className="w-4 h-4 text-white/40 animate-spin mr-2" />
              ) : (
                <RefreshCw className="w-4 h-4 text-white/40 mr-2" />
              )}
              <span className="text-sm text-white/60">Last updated: {lastUpdated}</span>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {error.includes("Authentication") ? (
                    <Lock className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="font-medium text-yellow-500">
                    {error.includes("Authentication") ? "Authentication Required" : "Using Demo Data"}
                  </span>
                </div>
                <p className="text-white/70">{error}</p>
              </div>
            )}

            {isLoading && !sizes.length && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                <p className="text-white/60">Loading availability data...</p>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {sizes.map((sizeItem) => (
                  <SizeCard key={`${sizeItem.size}-${fetchCount}`} sizeItem={sizeItem} />
                ))}
              </div>
            )}

            {!isLoading && !error && sizes.length === 0 && (
              <div className="text-center py-12">
                <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Data Available</h3>
                <p className="text-white/60">
                  We couldn't find any T-shirt availability data. Please check back later.
                </p>
              </div>
            )}

            {isMockData && !error && (
              <div className="mt-6 p-3 bg-white/5 rounded-lg text-center">
                <p className="text-sm text-white/60">
                  <AlertTriangle className="w-3 h-3 inline-block mr-1 text-yellow-500" />
                  Showing demo data. Real-time data is currently unavailable.
                </p>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-white/60">In Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-white/60">Low Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-white/60">Out of Stock</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

type SizeCardProps = {
  sizeItem: SizeAvailability
}

function SizeCard({ sizeItem }: SizeCardProps) {
  const percentage = Math.round((sizeItem.available / sizeItem.total) * 100) || 0

  const statusColor =
    sizeItem.status === "available" ? "bg-green-500" : sizeItem.status === "low" ? "bg-yellow-500" : "bg-red-500"

  const textColor =
    sizeItem.status === "available" ? "text-green-500" : sizeItem.status === "low" ? "text-yellow-500" : "text-red-500"

  const borderColor =
    sizeItem.status === "available"
      ? "border-green-500/30"
      : sizeItem.status === "low"
      ? "border-yellow-500/30"
      : "border-red-500/30"

  const bgColor =
    sizeItem.status === "available" ? "bg-green-500/5" : sizeItem.status === "low" ? "bg-yellow-500/5" : "bg-red-500/5"

  const statusText =
    sizeItem.status === "available" ? "In Stock" : sizeItem.status === "low" ? "Low Stock" : "Out of Stock"

  return (
    <div className={`p-5 rounded-lg border ${borderColor} ${bgColor}`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-3xl font-bold">{sizeItem.size}</span>
        <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
      </div>
      <div className={`text-sm font-medium mb-3 ${textColor}`}>{statusText}</div>
      <div className="w-full bg-white/10 h-2 rounded-full">
        <div className={`h-2 rounded-full ${statusColor}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-white/60 text-xs mt-2">
        {sizeItem.available} of {sizeItem.total} available
      </p>
    </div>
  )
}
