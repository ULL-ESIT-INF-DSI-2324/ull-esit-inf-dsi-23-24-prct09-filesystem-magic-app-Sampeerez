import "mocha";
import { expect } from "chai";
import { JSONProcessor } from "../src/ejercicio_practica/jsonProcessor.js";
import { CSVProcessor } from "../src/ejercicio_practica/csvProcessor.js";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("CSVProcessor", () => {
  it("should correctly parse CSV content", () => {
    const processor = new CSVProcessor();
    const content = "1,10,60\n2,20,100\n3,30,120\n";
    const result = processor.parseContent(content);
    expect(result).to.deep.equal([
      { itemNumber: 1, weight: 10, benefit: 60 },
      { itemNumber: 2, weight: 20, benefit: 100 },
      { itemNumber: 3, weight: 30, benefit: 120 },
    ]);
  });
});

describe("JSONProcessor", () => {
  it("should correctly parse JSON content", () => {
    const processor = new JSONProcessor();
    const content = JSON.stringify({
      elementos: [
        { numElemento: 1, peso: 10, beneficio: 60 },
        { numElemento: 2, peso: 20, beneficio: 100 },
        { numElemento: 3, peso: 30, beneficio: 120 },
      ],
    });
    const result = processor.parseContent(content);
    expect(result).to.deep.equal([
      { itemNumber: 1, weight: 10, benefit: 60 },
      { itemNumber: 2, weight: 20, benefit: 100 },
      { itemNumber: 3, weight: 30, benefit: 120 },
    ]);
  });
});

describe("FileProcessor", () => {
  it("should correctly process JSON content", () => {
    const processor = new JSONProcessor();
    const filename = path.resolve(
      __dirname,
      "../src/ejercicio_practica/ejemplo_json.json",
    );
    const result = processor.process(filename);
    expect(result).to.deep.equal({
      benefits: [60, 100, 120],
      weights: [10, 20, 30],
    });
  });

  it("should correctly process CSV content", () => {
    const processor = new CSVProcessor();
    const filename = path.resolve(
      __dirname,
      "../src/ejercicio_practica/ejemplo_csv.csv",
    );
    const result = processor.process(filename);
    expect(result).to.deep.equal({
      benefits: [60, 100, 120],
      weights: [10, 20, 30],
    });
  });
});
