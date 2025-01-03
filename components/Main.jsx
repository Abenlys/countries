"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import "../styles/Main.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setVisibleItems,
  fetchCountries,
} from "../src/app/Redux/features/countriesSlice";
import Pagination from "./Pagination";

export default function Main() {
  const dispatch = useDispatch();
  const { countriesData, visibleItems, startIndex, status, error } =
    useSelector((state) => state.countries);

  // fonction pour mettre à jour les éléments visibles
  const updateVisibleItems = (data, start) => {
    const end = start + 50;
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
