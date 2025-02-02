import React from "react";
import Image from "next/image";
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
  const { countriesData, visibleItems, startIndex, searchTerms } = useSelector(
    (state) => state.countries
  );
  const updateVisibleItems = (data, start) => {
    const end = start + 50;
    dispatch(setVisibleItems(data.slice(start, end)));
    dispatch(setStartIndex(start));
  };
  const filteredData = searchTerms
    ? countriesData.filter((country) =>
        country.name.toLowerCase().includes(searchTerms.toLowerCase())
      )
    : countriesData;
  const navigate = (direction) => {
    const filteredData = searchTerms
      ? countriesData.filter((country) =>
          country.name.toLowerCase().includes(searchTerms.toLowerCase())
        )
      : countriesData;
    const newIndex =
      direction === "next"
        ? Math.min(startIndex + 50, filteredData.length - 50)
        : Math.max(startIndex - 50, 0);
    updateVisibleItems(filteredData, newIndex);
  };
  const startItem = startIndex + 1;
  const endItem = Math.min(startIndex + 50, visibleItems.length);
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
        {startItem} ... {endItem}
      </p>
      <p>Total: {filteredData ? filteredData.length : countriesData.length}</p>
      <StepForwardOutlined
        className="smallarrow arrow"
        onClick={() => navigate("next")}
      />
      <FastForwardOutlined
        onClick={() =>
          updateVisibleItems(
            filteredData ? filteredData : countriesData,
            filteredData ? filteredData.length - 50 : countriesData.length - 50
          )
        }
        className="bigArrow arrow"
        height={50}
        width={50}
        alt="leftBoldArrow"
      />
    </div>
  );
}
