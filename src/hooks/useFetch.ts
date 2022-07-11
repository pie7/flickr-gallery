import fetchJsonp from "fetch-jsonp";
import { useState, useEffect } from "react";
export const useFetch = (path = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ items: [] });
  useEffect(() => {
    setIsLoading(true);
    fetchJsonp(path, {
      jsonpCallbackFunction: "jsonFlickrFeed",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [path]);
  return { isLoading, data };
};
