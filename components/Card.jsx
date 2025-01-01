import React from "react";
import Image from "next/image";
import "../styles/Card.css";

// function formatPopulation(population) {
//   if (population > 1e9) {
//     return `${(population / 1e9).toFixed(1)}B`;
//   } else if (population > 1e6) {
//     return `${(population / 1e6).toFixed(1)}M`;
//   } else if (population > 1e3) {
//     return `${(population / 1e3).toFixed(1)}K`;
//   }
//   return population;
// }

export default function Card({ country }) {
  // const currency = Object.values(country.currencies);

  return (
    <div className="card">
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
        <button>Details</button>

      </div>
    </div>
  );
}
