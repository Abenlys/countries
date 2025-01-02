import React from "react";
import leftBoldArrow from "../public/arrow-left-bold-circle-outline.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartIndex,
  setVisibleItems,
} from "../src/app/Redux/features/countriesSlice";

library.add(faArrowLeft, faArrowRight);

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
      <Image
        onClick={() => updateVisibleItems(0)}
        className="arrow"
        src={leftBoldArrow}
        height={50}
        width={50}
        alt="leftBoldArrow"
      />
      <FontAwesomeIcon
        className="smallarrow arrow"
        icon={faArrowLeft}
        onClick={() => navigate("previous")}
      />
      <p>
        {startItem} ... {endItem}
      </p>
      <p>Total: {countriesData.length}</p>
      <FontAwesomeIcon
        className="smallarrow arrow"
        icon={faArrowRight}
        onClick={() => navigate("next")}
      />
      <Image
        onClick={() => updateVisibleItems(countriesData.length - 50)}
        className="boldarrowright arrow"
        src={leftBoldArrow}
        height={50}
        width={50}
        alt="leftBoldArrow"
      />
    </div>
  );
}
