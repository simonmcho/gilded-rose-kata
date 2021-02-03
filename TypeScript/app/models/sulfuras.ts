import { General } from './general';

const QUALITY_VALUE = 80;

export class Sulfuras extends General {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  processItem(): void {
    this.quality = QUALITY_VALUE;
  }
}
