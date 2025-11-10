import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function useFetch(url) {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Couldn't fetch data");

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.log("Custom error", error);
      }
    }
    fetchData();
  }, [url]);

  return data;
}

export default useFetch;
