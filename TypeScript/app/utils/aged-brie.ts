import { General } from './general';

export class AgedBrie extends General{
  constructor(name: string, sellIn: number, quality: number){
    super(name, sellIn, quality);
  }

  processItem(): void {
    const isPastSellDate = this.isSellInMinLimit();
    if (isPastSellDate) {
      this.updateQualityProcessor();
    }
    this.updateQuality();
  }

  updateQualityProcessor(): void {
    this.qualityProcessor += 1;
  }

  updateQuality(): void {
    this.sellIn -= 1;
    if (this.quality < 50) {
      this.quality += this.qualityProcessor;
    }
    if (this.quality > 50) {
      this.quality = 50;
    }
  }
}