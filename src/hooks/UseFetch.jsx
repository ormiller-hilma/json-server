import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function useFetch(url, method = "GET", body = "") {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObject = {
      method: method,
    };
    if (body !== "") fetchData.body = body;

    async function fetchData() {
      try {
        const response = await fetch(url, fetchObject);

        if (!response.ok) throw new Error("Couldn't fetch data");

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Custom error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading };
}

export default useFetch;
