import { SystemManager as SM } from "./systemManager.js";

export enum Color {
  White = 'Blanco',
  Blue = 'Azul',
  Black = 'Negro',
  Red = 'Rojo',
  Green = 'Verde',
  Colorless = 'Incoloro',
  Multicolor = 'Multicolor',
}

export enum Type {
  Land = 'Tierra',
  Creature = 'Criatura',
  Enchantment = 'Encantamiento',
  Sorcery = 'Conjuro',
  Instant = 'Instantáneo',
  Artifact = 'Artefacto',
  Planeswalker = 'Planeswalker',
}

export enum Rarity {
  Common = 'Común',
  Uncommon = 'Infrecuente',
  Rare = 'Rara',
  Mythic = 'Mítica',
}

export class Card {
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
    if (lineaDeTipo === Type.Creature && !fuerzaYResistencia) throw SM.CREATURE_CARD_MUST_HAVE_POWER_AND_TOUGHNESS;
    else if (lineaDeTipo === Type.Planeswalker && !marcasDeLealtad) throw SM.PLANESWALKER_CARD_MUST_HAVE_LOYALTY_MARKS;
  }

  public getId(): number { return this.id; }
  public getNombre(): string { return this.nombre; }
  public getCosteDeMana(): number { return this.costeDeMana; }
  public getColor(): Color { return this.color; }
  public getTipo(): Type { return this.lineaDeTipo; }
  public getRareza(): Rarity { return this.rareza; }
  public getTextoDeReglas(): string { return this.textoDeReglas; }
  public getValorDeMercado(): number { return this.valorDeMercado; }
  public getFuerzaYResistencia(): [number, number] | null { return this.fuerzaYResistencia; }
  public getMarcasDeLealtad(): number | null { return this.marcasDeLealtad; }
}