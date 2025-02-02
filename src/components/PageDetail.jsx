import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import "../styles/PageDetail.css";
import { useSelector } from "react-redux";
import Map from "./Map";

export default function PageDetail({ country }) {
  const { countriesData } = useSelector((state) => state.countries);


  const getOfficialName = (code) => {
    const ct = Object.values(countriesData).find(
      (ct) => ct.alpha3Code === code
    );
    return ct ? ct.name : code;
  };

  const findCountryIndex = (alpha3Code) => {
    return countriesData.findIndex((c) => c.alpha3Code === alpha3Code);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const languages = Object.values(country.languages);
  const curName = Object.values(country.currencies)[0].name;
  const curSymbol = Object.values(country.currencies)[0].symbol;
  const latLng = Object.values(country.latLng)[0];
  const lat = latLng[0];
  const lng = latLng[1];

  return (
    <>
      <div className="title">
        <h1>About {country.official_name}</h1>
      </div>
      <div className="flex">
        <Map lat={lat} lng={lng} />
        <div className="flagdes">
          <Image
            src={country.flag.large}
            height={192}
            width={256}
            priority
            alt={country.name}
          />
          <div className="ct-descrip">
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
                  <li key={index}>
                    <Link href={`/alpha3Code/${findCountryIndex(border)}`}>
                      {getOfficialName(border)}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>This country does not share borders with any other</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
