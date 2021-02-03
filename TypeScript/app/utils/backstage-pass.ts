import { General } from './general';

export class BackstagePass extends General {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  processItem(): void {
    this.updateQualityProcessor();
    this.updateQuality();
  }

  // Not consistent calculation
  updateQualityProcessor(): void {
    if (this.sellIn <= 10) {
      this.qualityProcessor = 2;
    }
    if (this.sellIn <= 5) {
      this.qualityProcessor = 3;
    }
    if (this.sellIn <= 0) {
      this.qualityProcessor = 0;
    }
  }

  updateQuality(): void {
    this.sellIn -= 1;
    this.quality += this.qualityProcessor;
    if (!this.qualityProcessor) { // Not consistent calculation
      this.quality = 0;
    }
  }
}
