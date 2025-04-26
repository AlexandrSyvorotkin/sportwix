import { useEffect, useState } from "react"

export const useFetch = (url: string) => {
     const [data, setData] = useState<any>(null)
     const [isLoading, setIsLoading] = useState<boolean | null>(null)
     const [error, setError] = useState<string | null>(null)


     useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetch(url)
                const data = await res.json

                setData(data)
            }
            fetchData()
        } catch (error) {
            //@ts-ignore
            setError(error)
        } finally {
            setIsLoading(false)
        }
     }, [url])

     return {data, isLoading, error}
}