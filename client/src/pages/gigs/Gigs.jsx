import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Gigs.scss";
// import {gigs} from "../../data.js"
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import ErrorDisplayer from "../../components/errorDisplayer/ErrorDisplayer";

const Gigs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort,search]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR {">"} GRAPHICS & DESIGN</span>
        <h1>WEB DEVELOPMENT</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's service
          providers.
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="text" placeholder="min" />
            <input ref={maxRef} type="text" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by : </span>
            <span className="sortType">
              {sort === "sales" ? "Best selling" : "Newest"}
            </span>
            <img
              src="../../../public/img/down.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplayer />
          ) : (
            data.map((gig) => {
              return <GigCard key={gig._id} item={gig} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
