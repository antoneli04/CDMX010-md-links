/* eslint-disable no-undef */
const functions = require("../index");

describe("existRoute", () => {
  it("should be a function", () => {
    expect(typeof functions.existRoute).toBe("function");
  });
  it("should return a true valor is the route exuste", () => {
    expect(
      functions.existRoute(
        "/Users/Antoneli/Documents/Developer/CDMX010-md-links/markdown/read.md"
      )
    ).toBe(true);
  });
  it("should return false for invalid path", () => {
    expect(
      functions.existRoute(
        "/Users/Antoneli/Documents/Developer/CDMX010-md-links/read.md"
      )
    ).toBe(false);
  });
});

describe("routeAbsolute", () => {
  it("should be a function", () => {
    expect(typeof functions.routeAbsolute).toBe("function");
  });
  it("should return a true valor is the route exuste", () => {
    expect(
      functions.routeAbsolute(
        "/Users/Antoneli/Documents/Developer/CDMX010-md-links/options.js"
      )
    ).toBe(true);
  });
  it("should return false for invalid path", () => {
    expect(functions.routeAbsolute("read.md")).toBe(false);
  });
});

describe("routeIsFile", () => {
  it("should be a function", () => {
    expect(typeof functions.routeIsFile).toBe("function");
  });
  it("should return a true valor if is a FIle", () => {
    expect(
      functions.routeIsFile(
        "/Users/Antoneli/Documents/Developer/CDMX010-md-links/markdown/read.md"
      )
    ).toBe(true);
  });
  it("should return false if is not a file", () => {
    expect(
      functions.routeIsFile(
        "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links"
      )
    ).toBe(false);
  });
});

describe("routeIsMd", () => {
  it("should be a function", () => {
    expect(typeof functions.routeIsFile).toBe("function");
  });
  it("should return .md", () => {
    expect(
      functions.routeIsMd(
        "/Users/Antoneli/Documents/Developer/CDMX010-md-links/markdown/read.md"
      )
    ).toBe(".md");
  });
  it("should return .txt", () => {
    expect(
      functions.routeIsMd(
        "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/markdown/archivos/archivo.txt"
      )
    ).toBe(".txt");
  });
});

describe("convertToAbsolute", () => {
  it("should be a function", () => {
    expect(typeof functions.convertToAbsolute).toBe("function");
  });
  it("returns a boolean if the convertToAbsolute", () => {
    expect(functions.convertToAbsolute("datalovers.md")).toBe(
      "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\datalovers.md"
    );
  });
});

const pruebaUno = [
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\archivos",
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\cifrado.md",
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\read.md",
];

describe("filesAndDirectories", () => {
  it("should be a function", () => {
    expect(typeof functions.filesAndDirectories).toBe("function");
  });
  it("returns an array convertToAbsolute", () => {
    expect(
      functions.filesAndDirectories(
        "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown"
      )
    ).toEqual(pruebaUno);
  });
});

const pruebaDos = [
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\archivos\\datalovers.md",
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\archivos\\FAQ.md",
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\archivos\\Rick-and-Morty.md",
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\cifrado.md",
  "C:\\Users\\Antoneli\\Documents\\Developer\\CDMX010-md-links\\Markdown\\read.md",
];

describe("searchRouteMd", () => {
  it("should be a function", () => {
    expect(typeof functions.searchRouteMd).toBe("function");
  });
  it("returns an array ", () => {
    expect(
      functions.searchRouteMd(
        "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown"
      )
    ).toEqual(pruebaDos);
  });
});

const pruebaTres = `
# FAQ (preguntas frecuentes)

- [Por qué usar html semántico](https://youtu.be/vRqQRrULSxI)
- [Diferencia entre datos atómicos y estructurados](https://www.todojs.com/tipos-datos-javascript-es6/)
- [Para qué sirve el ESLint](https://antoniomasia.com/que-es-eslint-y-por-que-deberias-usarlo/)
- [Para qué sirven las pruebas unitarias](http://oscarmoreno.com/pruebas-unitarias/)
- Tengo que testear toda mi función

> En líneas generales, sí, esto es, sabiendo que queremos que tu función haga pocas
cosas. Si tu función hace varias cosas al mismo tiempo el problema sería otro
y primero tendrías que dividir esa funcionalidad en varias funciones y escribir
un test para cada una.
`;

describe("readFilePath", () => {
  it("should be a function", () => {
    expect(typeof functions.readFilePath).toBe("function");
  });
  it("returns an array ", () => {
    expect(
      functions.readFilePath(
        "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/markdown/archivos/FAQ.md"
      )
    ).toEqual(pruebaTres);
  });
});

const pruebaCuatro = [
  {
    href: "https://en.wikipedia.org/wiki/Caesar_cipher",
    text: "cifrado César",
    file:
      "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md",
  },
  {
    href:
      "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML",
    text: "Uso de HTML semántico.",
    file:
      "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md",
  },
  {
    href:
      "https://developer.mozilla.org/es/docs/Referencia_DOM_de_Gecko/Introducci%C3%B3n",
    text: "Manipulación dinámica del DOM.",
    file:
      "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md",
  },
  {
    href: "https://jestjs.io/docs/es-ES/getting-started",
    text: "Testeo unitario.",
    file:
      "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md",
  },
  {
    href: "https://jestjs.io/docs/es-ES/getting-sted",
    text: "Testeo unitario.",
    file:
      "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md",
  },
  {
    href: "https://jestjs.io/docs/es-ES/tting-started",
    text: "Testeo unitario.",
    file:
      "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md",
  },
];

describe("extraerLinks", () => {
  it("should be a function", () => {
    expect(typeof functions.extraerLinks).toBe("function");
  });
  it("returns an array with objects ", () => {
    expect(
      functions.extraerLinks(
        "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md"
      )
    ).toEqual(pruebaCuatro);
  });
});
