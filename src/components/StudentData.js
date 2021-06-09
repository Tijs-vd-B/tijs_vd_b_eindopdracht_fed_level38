import React, { useEffect, useState } from "react";
import Tabletop from "tabletop";

function StudentData() {
  const [data, setData] = useState({});

  useEffect(() => {
    Tabletop.init({
      key: "1fKX0b0-FMXqo6M0VfPIt7oBYUzgVbxtNXtN790i_mN8", // my-key
      //   key: "1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks", // WinC-key
      simpleSheet: true,
      parseNumbers: true,
      postProcess: function (element) {
        element["name"] = element["Wie ben je?"];
        element["excercise"] =
          element["Welke opdracht of welk project lever je nu in?"];
        element["difficultyRating"] =
          element["Hoe moeilijk vond je deze opdracht?"];
        element["funRating"] = element["Hoe leuk vond je deze opdracht?"];
      },
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  console.log(data);

  return <div>there are {data.length} items</div>;
}
export default StudentData;
