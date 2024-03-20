import { Item } from "./item.js";
import { FileProcessor } from "./fileProcessor.js";

export class JSONProcessor extends FileProcessor {
  public parseContent(content: string): Item[] {
    const data = JSON.parse(content);
    return data.elementos.map(
      (element: { numElemento: number; peso: number; beneficio: number }) => ({
        itemNumber: element.numElemento,
        weight: element.peso,
        benefit: element.beneficio,
      }),
    );
  }

  public extractData(data: Item[]): {
    benefits: number[];
    weights: number[];
  } {
    const benefits = data.map((item) => item.benefit);
    const weights = data.map((item) => item.weight);
    return { benefits, weights };
  }
}
