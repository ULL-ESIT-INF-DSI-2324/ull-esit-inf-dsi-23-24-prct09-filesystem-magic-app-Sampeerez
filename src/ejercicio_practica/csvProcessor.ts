import { Item } from "./item.js";
import { FileProcessor } from "./fileProcessor.js";

/**
 * Clase CSVProcessor para procesar archivos CSV.
 * Extiende la clase abstracta FileProcessor.
 */
export class CSVProcessor extends FileProcessor {
  /**
   * Parsea el contenido de un archivo CSV y devuelve un array de objetos Item.
   * @param content - El contenido del archivo CSV como string.
   * @returns Un array de objetos Item.
   */
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

  /**
   * Extrae los beneficios y los pesos de un array de objetos Item y los devuelve en un objeto.
   * @param data - Un array de objetos Item.
   * @returns Un objeto con dos arrays: benefits y weights.
   */
  public extractData(data: Item[]): { benefits: number[]; weights: number[] } {
    const benefits = data.map((item) => item.benefit);
    const weights = data.map((item) => item.weight);
    return { benefits, weights };
  }
}