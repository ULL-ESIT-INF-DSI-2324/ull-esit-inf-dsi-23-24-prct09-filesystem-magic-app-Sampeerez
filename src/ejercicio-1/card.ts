import { SystemManager as SM } from "./systemManager.js";

/**
 * Enum for card colors.
 */
export enum Color {
  White = "Blanco",
  Blue = "Azul",
  Black = "Negro",
  Red = "Rojo",
  Green = "Verde",
  Colorless = "Incoloro",
  Multicolor = "Multicolor",
}

/**
 * Enum for card types.
 */
export enum Type {
  Land = "Tierra",
  Creature = "Criatura",
  Enchantment = "Encantamiento",
  Sorcery = "Conjuro",
  Instant = "Instantáneo",
  Artifact = "Artefacto",
  Planeswalker = "Planeswalker",
}

/**
 * Enum for card rarities.
 */
export enum Rarity {
  Common = "Común",
  Uncommon = "Infrecuente",
  Rare = "Rara",
  Mythic = "Mítica",
}

/**
 * Class representing a card.
 */
export class Card {
  /**
   * Create a card.
   * @param {number} id - The id of the card.
   * @param {string} nombre - The name of the card.
   * @param {number} costeDeMana - The mana cost of the card.
   * @param {Color} color - The color of the card.
   * @param {Type} lineaDeTipo - The type of the card.
   * @param {Rarity} rareza - The rarity of the card.
   * @param {string} textoDeReglas - The rules text of the card.
   * @param {number} valorDeMercado - The market value of the card.
   * @param {[number, number]} fuerzaYResistencia - The power and toughness of the card.
   * @param {number} marcasDeLealtad - The loyalty marks of the card.
   */
  constructor(
    private id: number,
    private nombre: string,
    private costeDeMana: number,
    private color: Color,
    private lineaDeTipo: Type,
    private rareza: Rarity,
    private textoDeReglas: string,
    private valorDeMercado: number,
    private fuerzaYResistencia: [number, number] | null = null,
    private marcasDeLealtad: number | null = null,
  ) {
    if (lineaDeTipo === Type.Creature && !fuerzaYResistencia)
      throw SM.CREATURE_CARD_MUST_HAVE_POWER_AND_TOUGHNESS;
    else if (lineaDeTipo === Type.Planeswalker && !marcasDeLealtad)
      throw SM.PLANESWALKER_CARD_MUST_HAVE_LOYALTY_MARKS;
  }

  /**
   * Get the id of the card.
   * @return {number} The id of the card.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Get the name of the card.
   * @return {string} The name of the card.
   */
  public getNombre(): string {
    return this.nombre;
  }

  /**
   * Get the mana cost of the card.
   * @return {number} The mana cost of the card.
   */
  public getCosteDeMana(): number {
    return this.costeDeMana;
  }

  /**
   * Get the color of the card.
   * @return {Color} The color of the card.
   */
  public getColor(): Color {
    return this.color;
  }

  /**
   * Get the type of the card.
   * @return {Type} The type of the card.
   */
  public getTipo(): Type {
    return this.lineaDeTipo;
  }

  /**
   * Get the rarity of the card.
   * @return {Rarity} The rarity of the card.
   */
  public getRareza(): Rarity {
    return this.rareza;
  }

  /**
   * Get the rules text of the card.
   * @return {string} The rules text of the card.
   */
  public getTextoDeReglas(): string {
    return this.textoDeReglas;
  }

  /**
   * Get the market value of the card.
   * @return {number} The market value of the card.
   */
  public getValorDeMercado(): number {
    return this.valorDeMercado;
  }

  /**
   * Get the power and toughness of the card.
   * @return {[number, number]} The power and toughness of the card.
   */
  public getFuerzaYResistencia(): [number, number] | null {
    return this.fuerzaYResistencia;
  }

  /**
   * Get the loyalty marks of the card.
   * @return {number} The loyalty marks of the card.
   */
  public getMarcasDeLealtad(): number | null {
    return this.marcasDeLealtad;
  }
}
