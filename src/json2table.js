export let getColumns = (val) => {
  let cols = val
    .map((x) => Object.entries(x).map((y) => y[0]))
    .join()
    .split(",");
  return [...new Set(cols)];
};

export let getDataTable = (data, columns) => {
  return data.map((x) =>
    columns.map((c) => {
      let res = getType(x[c]);
      return res === undefined ? "" : res;
    })
  );
};

export let getHTMLDataTable = (data) => {
  let unTd = (arr) => arr.reduce((ac, cur) => `${ac}<td>${cur}</td>`, "");
  return data.reduce((ac, cu) => `${ac}<tr>${unTd(cu)}</tr>`, "");
};

export let getHTMLColumns = (columns) => {
  return columns.reduce((ac, cu) => `${ac}<td>${cu}</td>`, "<tr>") + "</tr>";
};

export let getType = (data) => {
  return typeof data === "object"
    ? Array.isArray(data)
      ? tableFromArray(data)
      : tableFromObject(data)
    : data;
};

export let tableFromArray = (val) => {
  let columns = getColumns(val);
  return (
    "<table>" +
    getHTMLColumns(columns) +
    getHTMLDataTable(getDataTable(val, columns)) +
    "</table>"
  );
};

export let tableFromObject = (val) => {
  return Object.entries(val)
    .map((x) => `<td>${x[0]}</td><td>${getType(x[1])}</td>`)
    .map((x) => `<tr>${x}</tr>`)
    .join("");
};
