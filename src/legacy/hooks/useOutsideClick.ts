import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

type TypeOut = {
    ref: any,
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
}

export const useOutside = (initialVisible: boolean):TypeOut => {
    const [isShow, setIsShow] = useState(initialVisible)
    const ref = useRef<HTMLElement>(null)

    const handleClickOutSide = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide, true)
        return () => {
            document.removeEventListener('click', handleClickOutSide, true)
        }
    }, [])


    return {ref, isShow, setIsShow}
}