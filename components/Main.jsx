"use client";
import React, { useEffect, useState } from "react";
import { COUNTRY_API, COUNTRY_URL } from "../api/api";
import Card from "./Card";
import "../styles/Main.css";
import leftBoldArrow from "../public/arrow-left-bold-circle-outline.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

library.add(faArrowLeft, faArrowRight);

export default function Main() {
  const [countriesData, setcountriesData] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // fonction pour mettre à jour les éléments visibles
  const updateVisibleItems = (data, start) => {
    const end = start + 50;
    setVisibleItems(data.slice(start, end));
  };

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(`${COUNTRY_URL}?apikey=${COUNTRY_API}`);
        const data = await response.json();
        const sortedCountries = Object.values(data).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setcountriesData(sortedCountries);
        updateVisibleItems(sortedCountries, 0);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    updateVisibleItems(countriesData, startIndex);
  }, [startIndex, countriesData]);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 50, countriesData.length - 50));
  };

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(prev - 50, 0));
  };

  const startItem = startIndex + 1;
  const endItem = Math.min(startIndex + 50, countriesData.length);

  const goToStart = () => {
    setStartIndex(0);
  };
  const goToEnd = () => {
    setStartIndex(countriesData.length - 50);
  };

  return (
    <div className="main">
      <div className="cards">
        {visibleItems.map((ct) => (
          <Card key={ct.numericCode} country={ct} />
        ))}
      </div>
      <div className="pagination-cards">
        <Image
          onClick={goToStart}
          className="arrow"
          src={leftBoldArrow}
          height={50}
          width={50}
          alt="leftBoldArrow"
        />
        <FontAwesomeIcon
          className="smallarrow arrow"
          icon={faArrowLeft}
          onClick={handlePrevious}
        />
        <p>
          {startItem} ... {endItem}
        </p>
        <p>Total: {countriesData.length}</p>
        <FontAwesomeIcon
          className="smallarrow arrow"
          icon={faArrowRight}
          onClick={handleNext}
        />
        <Image
          onClick={goToEnd}
          className="boldarrowright arrow"
          src={leftBoldArrow}
          height={50}
          width={50}
          alt="leftBoldArrow"
        />
      </div>
    </div>
  );
}
