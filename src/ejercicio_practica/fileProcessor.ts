import { Item } from "./item.js";
import fs from "fs";

/**
 * Clase abstracta FileProcessor para procesar archivos.
 */
export abstract class FileProcessor {
  /**
   * Procesa un archivo y extrae los datos.
   * @param filename - El nombre del archivo a procesar.
   * @returns Un objeto con dos arrays: benefits y weights.
   */
  process(filename: string): { benefits: number[]; weights: number[] } {
    const content = this.readFile(filename);
    const data = this.parseContent(content);
    return this.extractData(data);
  }

  /**
   * Lee un archivo y devuelve su contenido como string.
   * @param filename - El nombre del archivo a leer.
   * @returns El contenido del archivo como string.
   */
  protected readFile(filename: string): string {
    return fs.readFileSync(filename, "utf8");
  }

  /**
   * Método abstracto para parsear el contenido de un archivo.
   * @param content - El contenido del archivo como string.
   * @returns Un array de objetos Item.
   */
  public abstract parseContent(content: string): Item[];

  /**
   * Método abstracto para extraer los datos de un array de objetos Item.
   * @param data - Un array de objetos Item.
   * @returns Un objeto con dos arrays: benefits y weights.
   */
  public abstract extractData(data: Item[]): {
    benefits: number[];
    weights: number[];
  };
}