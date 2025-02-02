import Image from "next/image";
import React, { useEffect } from "react";
import "../styles/PageDetail.css";
import { useDispatch, useSelector } from "react-redux";
import Map from "./Map";

export default function PageDetail({ country }) {

  const dispatch = useDispatch();
  const { countriesData, status } = useSelector((state) => state.countries);
  console.log(country)

  const getOfficialName = (code) => {
    const ct = Object.values(countriesData).find(
      (ct) => ct.alpha3Code === code
    );
    return ct ? ct.name : code;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  const languages = Object.values(country.languages)
  const curName = Object.values(country.currencies)[0].name
  const curSymbol = Object.values(country.currencies)[0].symbol
  const latLng = Object.values(country.latLng)[1]
  const lat = latLng[0]
  const lng = latLng[1]
  


  return (
    <>
      <div className="title">
        <h1>About {country.official_name}</h1>
      </div>
      <div>
        <div>
          <Image
            src={country.flag.large}
            height={192}
            width={256}
            priority
            alt={country.name}
          />
        </div>
        <div>
          <p>Capital: {country.capital}</p>
          <p>Region: {country.region}</p>
          <p>Subregion: {country.subregion}</p>
          <p>Population: {formatNumber(country.population)}</p>
          <p>Languages:</p>
          <ul>
            {languages.map((lang, index) => (
                <li key={index}>{lang}</li>
            ))}
          </ul>
          <p>Currency: {curName + " | " + curSymbol}</p>
          <p>Area: {formatNumber(country.area)} km²</p>
          <p>Borders :</p>
          {Array.isArray(country.borders) && country.borders.length > 0 ? (
            <ul>
              {country.borders.map((border, index) => (
                <li key={index}>{getOfficialName(border)}</li>
              ))}
            </ul>
          ) : (
            <p>No borders available</p>
          )}
        </div>
      </div>
      <Map lat={lat} lng={lng} />
    </>
  );
}
