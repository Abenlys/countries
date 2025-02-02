"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "@/app/Redux/features/countriesSlice";
import PageDetail from "@/components/PageDetail";

export default function Countrydetail() {
  const { id } = useParams();
  const index = parseInt(id, 10);
  const dispatch = useDispatch();
  const { countriesData, status } = useSelector((state) => state.countries);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);
  const country =
    countriesData && countriesData.length > index ? countriesData[index] : null;
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      {country && <PageDetail country={country} />}
    </>
  );
}
