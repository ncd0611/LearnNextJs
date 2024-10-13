import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export interface ParamsPageProps {
    query: any, 
    post: any
}

export default function ParamsPage({query, post}: ParamsPageProps) {
    const router = useRouter();
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((x) => {
                if(x > 60)
                    clearInterval(intervalId);
                return x + 1;
            })
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
}