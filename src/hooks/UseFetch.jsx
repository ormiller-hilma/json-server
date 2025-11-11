import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function resetData() {
    setData([]);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Couldn't fetch data");

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Custom error", error);
      } finally {
        setLoading(false);
      }
    }
    if (data.length === 0) fetchData();
  }, [data, url]);

  return { data, loading, resetData };
}

export default useFetch;
