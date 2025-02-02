import React, { useEffect, useState } from 'react'
import "../styles/FilterRegion.css"
import { useDispatch, useSelector } from 'react-redux'
import { setSelectRegion } from "../app/Redux/features/countriesSlice";

export default function FilterRegion() {
    const {countriesData, searchTerms, selectRegion} = useSelector((state) => state.countries)
    const [region, setRegion] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const filteredData = countriesData
        .filter((country) => 
          // Filtrer par recherche
          searchTerms ? country.name.toLowerCase().includes(searchTerms.toLowerCase()) : true
        )
        const uniqueRegion = [...new Set(filteredData.map((reg) => reg.region))]
        setRegion(uniqueRegion)
    }, [countriesData, searchTerms, selectRegion])

    const handleFilter = (e) => {
        const value = e.target.value
        dispatch(setSelectRegion(value))
    }
  return (
    <div className='filterregion'>
        <label htmlFor="region-select">filter by Region :</label>
        <select onChange={handleFilter} name="region" id="region-select">
            <option value="">--here--</option>
            {region.map((reg, index) => (
                <option  key={index} value={reg}>{reg}</option>
            ))}
        </select>
    </div>
  )
}
