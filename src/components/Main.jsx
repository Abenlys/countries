"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import "../styles/Main.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setVisibleItems,
  fetchCountries,
  setStartIndex,
} from "../app/Redux/features/countriesSlice";
import Pagination from "./Pagination";
import FilterRegion from "./FilterRegion";

export default function Main() {
  const dispatch = useDispatch();
  const {
    countriesData,
    visibleItems,
    startIndex,
    status,
    error,
    searchTerms,
    selectRegion,
  } = useSelector((state) => state.countries);

  // fonction pour mettre à jour les éléments visibles
  const updateVisibleItems = (data, start) => {
    const end = Math.min(start + 50, data.length);
    dispatch(setVisibleItems(data.slice(start, end)));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  useEffect(() => {
    updateVisibleItems(countriesData, startIndex);
  }, [startIndex, countriesData]);

  useEffect(() => {
    dispatch(setStartIndex(0))
  }, [searchTerms, selectRegion])

  useEffect(() => {
    const filteredData = countriesData
    .filter((country) => 
      // Filtrer par recherche
      searchTerms ? country.name.toLowerCase().includes(searchTerms.toLowerCase()) : true
    )
    .filter((country) => 
      // Filtrer par région
      selectRegion ? country.region === selectRegion : true
    );
    updateVisibleItems(filteredData, startIndex);
  }, [startIndex, searchTerms, countriesData, selectRegion]);

  return (
    <div className="main">
      <FilterRegion />
      <div className="cards">
        {visibleItems.map((ct) => (
          <Card key={ct.numericCode} country={ct} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
