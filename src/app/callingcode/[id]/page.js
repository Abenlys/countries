"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { COUNTRY_API, COUNTRY_URL } from '../../../../api/api';
import Navbar from '../../../../components/Navbar';



export default function countrydetail() {
   const { id } = useParams();
   console.log(id);
   const [ctDetail, setCtDetail] = useState(null);

   useEffect(() => {
    async function fetchCtDetail() {
        try {
            const response = await fetch(`https://countryapi.io/api/callingcode/${id}?apikey=${COUNTRY_API}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setCtDetail(data);
            console.log(data);
        } catch (err) {
            console.log("error", err);
        }
    }
    fetchCtDetail();
}, [id]);
    
    return (
        <div>
            <Navbar />
            <h1>countrydetail</h1>
            <p>{id}</p>
        </div>
    )
}


