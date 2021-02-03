import { General } from './general';

const SELL_IN_VALUE = 80;

export class Sulfuras extends General {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  processItem(): void {
    this.sellIn = SELL_IN_VALUE;
  }
}
