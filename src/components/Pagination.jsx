import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartIndex,
  setVisibleItems,
} from "../app/Redux/features/countriesSlice";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
} from "@ant-design/icons";

export default function Pagination() {
  const dispatch = useDispatch();
  const { countriesData, visibleItems, startIndex, searchTerms, selectRegion } =
    useSelector((state) => state.countries);
  const updateVisibleItems = (data, start) => {
    const end = Math.min(start + 50, data.length);
    dispatch(setVisibleItems(data.slice(start, end)));
    dispatch(setStartIndex(start));
  };
  const filteredData = countriesData
    .filter((country) =>
      // Filtrer par recherche
      searchTerms
        ? country.name.toLowerCase().includes(searchTerms.toLowerCase())
        : true
    )
    .filter((country) =>
      // Filtrer par région
      selectRegion ? country.region === selectRegion : true
    );
  const navigate = (direction) => {
    const filteredData = countriesData
      .filter((country) =>
        // Filtrer par recherche
        searchTerms
          ? country.name.toLowerCase().includes(searchTerms.toLowerCase())
          : true
      )
      .filter((country) =>
        // Filtrer par région
        selectRegion ? country.region === selectRegion : true
      );
    const totalItems = filteredData
      ? filteredData.length
      : countriesData.length;
    const maxStartIndex = totalItems - (totalItems % 50 || 50);
    const newIndex =
      direction === "next"
        ? Math.min(startIndex + 50, maxStartIndex)
        : Math.max(startIndex - 50, 0);
    updateVisibleItems(filteredData, newIndex);
  };
  const startItem = startIndex + 1;
  const endItem = () => {
    if (startIndex + 50 < filteredData.length) {
      return startIndex + 50;
    }
    return filteredData.length;
  };
  return (
    <div className="pagination-cards">
      <FastBackwardOutlined
        onClick={() =>
          updateVisibleItems(filteredData ? filteredData : countriesData, 0)
        }
        className="arrow bigArrow"
        alt="leftBoldArrow"
      />

      <StepBackwardOutlined
        className="smallarrow arrow"
        onClick={() => navigate("previous")}
      />

      <p>
        {startItem} ... {endItem()}
      </p>
      <p>Total: {filteredData ? filteredData.length : countriesData.length}</p>
      <StepForwardOutlined
        className="smallarrow arrow"
        onClick={() => navigate("next")}
      />
      <FastForwardOutlined
        onClick={() => {
          const totalItems = filteredData.length;
          const maxStartIndex = totalItems - (totalItems % 50 || 50);
          updateVisibleItems(filteredData, maxStartIndex);
        }}
        className="bigArrow arrow"
        height={50}
        width={50}
        alt="leftBoldArrow"
      />
    </div>
  );
}
