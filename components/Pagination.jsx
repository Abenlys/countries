import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartIndex,
  setVisibleItems,
} from "../src/app/Redux/features/countriesSlice";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
} from "@ant-design/icons";

export default function Pagination() {
  const dispatch = useDispatch();
  const { countriesData, startIndex } = useSelector((state) => state.countries);
  const updateVisibleItems = (start) => {
    const end = start + 50;
    dispatch(setVisibleItems(countriesData.slice(start, end)));
    dispatch(setStartIndex(start));
  };
  const navigate = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(startIndex + 50, countriesData.length - 50)
        : Math.max(startIndex - 50, 0);
    updateVisibleItems(newIndex);
  };
  const startItem = startIndex + 1;
  const endItem = Math.min(startIndex + 50, countriesData.length);
  return (
    <div className="pagination-cards">
      <FastBackwardOutlined
        onClick={() => updateVisibleItems(0)}
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
      <p>Total: {countriesData.length}</p>
      <StepForwardOutlined
        className="smallarrow arrow"
        onClick={() => navigate("next")}
      />
      <FastForwardOutlined
        onClick={() => updateVisibleItems(countriesData.length - 50)}
        className="bigArrow arrow"
        height={50}
        width={50}
        alt="leftBoldArrow"
      />
    </div>
  );
}
