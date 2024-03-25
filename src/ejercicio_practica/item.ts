/**
 * Define la interfaz Item para representar un objeto con tres propiedades numéricas.
 */
export interface Item {
  /**
   * Representa el número del ítem.
   */
  itemNumber: number;

  /**
   * Representa el peso del ítem.
   */
  weight: number;

  /**
   * Representa el beneficio del ítem.
   */
  benefit: number;
}
