import { Item } from "./item.js";
import { FileProcessor } from "./fileProcessor.js";

/**
 * Clase JSONProcessor para procesar archivos JSON.
 * Extiende la clase abstracta FileProcessor.
 */
export class JSONProcessor extends FileProcessor {
  /**
   * Parsea el contenido de un archivo JSON y devuelve un array de objetos Item.
   * @param content - El contenido del archivo JSON como string.
   * @returns Un array de objetos Item.
   */
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

  /**
   * Extrae los beneficios y los pesos de un array de objetos Item y los devuelve en un objeto.
   * @param data - Un array de objetos Item.
   * @returns Un objeto con dos arrays: benefits y weights.
   */
  public extractData(data: Item[]): {
    benefits: number[];
    weights: number[];
  } {
    const benefits = data.map((item) => item.benefit);
    const weights = data.map((item) => item.weight);
    return { benefits, weights };
  }
}
