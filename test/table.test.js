import {
  tableFromObject,
  tableFromArray,
  getColumns,
  getHTMLColumns,
  getDataTable,
  getHTMLDataTable
} from "/src/json2table";

describe("Crear tabla desde un objeto", () => {
  it("crear tabla HTML 1 fila 1 columna", () => {
    let simpledata = { "columna 1": 0 };
    let table = tableFromObject(simpledata);
    expect(table).toBe("<tr><td>columna 1</td><td>0</td></tr>");
  });

  it("crear tabla HTML 1 fila 1 columna", () => {
    let simpledata = { "columna 1": "dato 1" };
    let table = tableFromObject(simpledata);
    expect(table).toBe("<tr><td>columna 1</td><td>dato 1</td></tr>");
  });

  it("crear tabla HTML 2 filas 2 columnas", () => {
    let simpledata = { "columna 1": "dato 1", "columna 2": "dato 2" };
    let table = tableFromObject(simpledata);
    expect(table).toBe(
      "<tr><td>columna 1</td><td>dato 1</td></tr><tr><td>columna 2</td><td>dato 2</td></tr>"
    );
  });

  it("crear tabla HTML 3 filas 2 columnas", () => {
    let simpledata = {
      "columna 1": "dato 1",
      "columna 2": "dato 2",
      "columna 3": "dato 3"
    };
    let table = tableFromObject(simpledata);
    expect(table).toBe(
      "<tr><td>columna 1</td><td>dato 1</td></tr><tr><td>columna 2</td><td>dato 2</td></tr><tr><td>columna 3</td><td>dato 3</td></tr>"
    );
  });
});

describe("Crear tabla desde un ARRAY", () => {
  it("calcular las columnas de un array debe ser col 1 2 y 3", () => {
    let data = [
      { "columna 1": "dato 1", "columna 2": "dato 2" },
      { "columna 1": "dato 1", "columna 3": "dato 2" }
    ];
    let columns_table = getColumns(data);
    expect(columns_table).toEqual(["columna 1", "columna 2", "columna 3"]);
  });

  it("calcular las columnas de un array debe ser col 1 2", () => {
    let data = [{ "columna 1": "dato 1", "columna 2": "dato 2" }];
    let columns_table = getColumns(data);
    expect(columns_table).toEqual(["columna 1", "columna 2"]);
  });

  it("calcular las columnas de un array debe ser col 1 2", () => {
    let data = [{ "columna 1": "dato 1" }, { "columna 2": "dato 2" }];
    let columns_table = getColumns(data);
    expect(columns_table).toEqual(["columna 1", "columna 2"]);
  });

  it("Encabezados de las columnas 1 2 3", () => {
    let table = getHTMLColumns(["columna 1", "columna 2", "columna 3"]);
    expect(table).toBe(
      "<tr><td>columna 1</td><td>columna 2</td><td>columna 3</td></tr>"
    );
  });

  it("Obtener datos columnas 1 2", () => {
    let data = [{ "columna 1": "dato 1" }, { "columna 1": "dato 2" }];
    let columns_table = getColumns(data);
    let data_table = getDataTable(data, columns_table);
    expect(data_table).toEqual([["dato 1"], ["dato 2"]]);
  });

  it("Obtener datos de tabla validar número 0", () => {
    let data = [{ "columna 1": 0 }];
    let columns_table = getColumns(data);
    let data_table = getDataTable(data, columns_table);
    expect(data_table).toEqual([[0]]);
  });

  it("Obtener datos columnas 1 2", () => {
    let data = [
      { "columna 1": "dato 1" },
      { "columna 1": "dato 2" },
      { "columna 2": "dato 3" }
    ];
    let columns_table = getColumns(data);
    let data_table = getDataTable(data, columns_table);
    expect(data_table).toEqual([
      ["dato 1", ""],
      ["dato 2", ""],
      ["", "dato 3"]
    ]);
  });

  it("Obtener HTML de los datos columnas 1 2", () => {
    let data = [{ "columna 1": "dato 1" }, { "columna 1": "dato 2" }];
    let columns_table = getColumns(data);
    let data_table = getDataTable(data, columns_table);
    let dataHTML_table = getHTMLDataTable(data_table);
    expect(dataHTML_table).toBe(
      "<tr><td>dato 1</td></tr><tr><td>dato 2</td></tr>"
    );
  });

  it("Obtener HTML de los datos columnas 1 2", () => {
    let data = [
      { "columna 1": "dato 1", "columna 2": "dato 2" },
      { "columna 1": "dato 3" }
    ];
    let columns_table = getColumns(data);
    let data_table = getDataTable(data, columns_table);
    let dataHTML_table = getHTMLDataTable(data_table);
    expect(dataHTML_table).toBe(
      "<tr><td>dato 1</td><td>dato 2</td></tr><tr><td>dato 3</td><td></td></tr>"
    );
  });
});

describe("Crear HTML y elementos desde un Array", () => {
  it("crear tabla HTML con array de 1 objeto", () => {
    let simpledata = [{ "columna 1": "dato 1" }];
    let table = tableFromArray(simpledata);
    expect(table).toBe(
      "<table><tr><td>columna 1</td></tr><tr><td>dato 1</td></tr></table>"
    );
  });

  it("crear tabla HTML con array de 1 objeto", () => {
    let simpledata = [{ "columna 1": 0 }];
    let table = tableFromArray(simpledata);
    expect(table).toBe(
      "<table><tr><td>columna 1</td></tr><tr><td>0</td></tr></table>"
    );
  });

  it("crear tabla HTML con array de 2 columnas", () => {
    let simpledata = [{ "columna 1": "dato 1", "columna 2": "dato 2" }];
    let table = tableFromArray(simpledata);
    expect(table).toBe(
      "<table><tr><td>columna 1</td><td>columna 2</td></tr><tr><td>dato 1</td><td>dato 2</td></tr></table>"
    );
  });

  it("crear tabla HTML con array de 2 objetos", () => {
    let simpledata = [{ "columna 1": "dato 1" }, { "columna 1": "dato 2" }];
    let table = tableFromArray(simpledata);
    expect(table).toBe(
      "<table><tr><td>columna 1</td></tr><tr><td>dato 1</td></tr><tr><td>dato 2</td></tr></table>"
    );
  });
});

describe("Elementos anidados", () => {
  it("objeto elemento anidado 1 Nivel", () => {
    let simpledata = { "Objeto 1": { "Objeto hijo": "Valor Objeto" } };
    let table = tableFromObject(simpledata);
    expect(table).toBe(
      "<tr><td>Objeto 1</td><td><tr><td>Objeto hijo</td><td>Valor Objeto</td></tr></td></tr>"
    );
  });

  it("objeto elemento anidado 2 Niveles", () => {
    let simpledata = {
      "Objeto N 1": { "Objeto N 2": { "Objeto N 3": "Valor Objeto" } }
    };
    let table = tableFromObject(simpledata);
    expect(table).toBe(
      "<tr><td>Objeto N 1</td><td><tr><td>Objeto N 2</td><td><tr><td>Objeto N 3</td><td>Valor Objeto</td></tr></td></tr></td></tr>"
    );
  });

  it("objeto Tabla anidado", () => {
    let simpledata = { "Objeto N 1": [{ "Col 1": "val 1", "Col 2": "val 2" }] };
    let table = tableFromObject(simpledata);
    expect(table).toBe(
      "<tr><td>Objeto N 1</td><td><table><tr><td>Col 1</td><td>Col 2</td></tr><tr><td>val 1</td><td>val 2</td></tr></table></td></tr>"
    );
  });
});
