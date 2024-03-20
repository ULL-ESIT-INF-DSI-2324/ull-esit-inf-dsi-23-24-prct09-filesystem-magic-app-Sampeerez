import "mocha";
import { expect } from "chai";
import { JSONProcessor } from "../src/ejercicio_practica/jsonProcessor.js";
import { CSVProcessor } from "../src/ejercicio_practica/csvProcessor.js";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
