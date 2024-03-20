import { Item } from "./item.js";
import fs from "fs";

export abstract class FileProcessor {
  process(filename: string): { benefits: number[]; weights: number[] } {
    const content = this.readFile(filename);
    const data = this.parseContent(content);
    return this.extractData(data);
  }

  protected readFile(filename: string): string {
    return fs.readFileSync(filename, "utf8");
  }

  public abstract parseContent(content: string): Item[];

  public abstract extractData(data: Item[]): {
    benefits: number[];
    weights: number[];
  };
}
