import { Item } from "./item.js";
import { FileProcessor } from "./fileProcessor.js";

export class CSVProcessor extends FileProcessor {
  public parseContent(content: string): Item[] {
    const lines = content.split("\n");
    const items = lines
      .filter((line) => {
        const [itemNumber, weight, benefit] = line.split(",");
        return (
          !isNaN(Number(itemNumber)) &&
          !isNaN(Number(weight)) &&
          !isNaN(Number(benefit))
        );
      })
      .map((line) => {
        const [itemNumber, weight, benefit] = line.split(",");
        return {
          itemNumber: Number(itemNumber),
          weight: Number(weight),
          benefit: Number(benefit),
        };
      });
    return items;
  }

  public extractData(data: Item[]): { benefits: number[]; weights: number[] } {
    const benefits = data.map((item) => item.benefit);
    const weights = data.map((item) => item.weight);
    return { benefits, weights };
  }
}
