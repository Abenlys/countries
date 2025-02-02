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

export default function Main() {
  const dispatch = useDispatch();
  const {
    countriesData,
    visibleItems,
    startIndex,
    status,
    error,
    searchTerms,
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
  }, [searchTerms])

  useEffect(() => {
    const filteredData = searchTerms
      ? countriesData.filter((country) =>
          country.name.toLowerCase().includes(searchTerms.toLowerCase())
        )
      : countriesData;
    updateVisibleItems(filteredData, startIndex);
  }, [startIndex, searchTerms, countriesData]);

  return (
    <div className="main">
      <div className="cards">
        {visibleItems.map((ct) => (
          <Card key={ct.numericCode} country={ct} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
