import { General } from './general';

export class Conjured extends General {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);

    this.qualityProcessor = 2;
  }

  processItem(): void {
    this.updateQuality();
  }

  updateQuality(): void {
    this.sellIn -=1;
    this.quality -= this.qualityProcessor;
  }
}
