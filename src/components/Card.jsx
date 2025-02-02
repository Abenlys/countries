import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/Card.css";
import { useSelector } from "react-redux";


export default function Card({ country }) {
  const {countriesData} = useSelector((state) => state.countries)

 const index = countriesData.findIndex((c) => c.alpha3Code === country.alpha3Code)

  return (
    <div className="card">
      <Link
        href={`/alpha3Code/${index}`
        }
      >
        <div className="card__info">
          <Image
            height={190}
            width={255}
            src={country.flag.large}
            priority
            alt={country.name}
          />
          <p className="card__info__name">{country.name}</p>
          <p className="card__info__region">{country.region}</p>
          <button>DETAILS</button>
        </div>
      </Link>
    </div>
  );
}
