import { tableFromObject } from "/src/json2table";

fetch("/src/data.json")
  .then((res) => res.json())
  .then((result) => {
    let tabla = tableFromObject(result);
    document.getElementById("tabledata").innerHTML = tabla;
  });
