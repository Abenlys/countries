import React from "react";
import Image from "next/image";
import "../styles/Card.css";
import Link from "next/link";


export default function Card({ country }) {

  return (
    <div className="card">
      <Link
        href={`/callingcode/${country.callingCode.slice(1)}`
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
