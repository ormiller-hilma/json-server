import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function getNestedObject(obj, path) {
  return path.reduce((current, key) => {
    return current?.[key];
  }, obj);
}

function useFetch(url, objectPath = []) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Couldn't fetch data");

        const fetchedData = await response.json();
        if (objectPath.length === 0) {
          setData(fetchedData);
        } else {
          setData(getNestedObject(fetchedData, objectPath));
        }
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
