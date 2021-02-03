import { General } from './general';

export class AgedBrie extends General{
  constructor(name: string, sellIn: number, quality: number){
    super(name, sellIn, quality);
  }

  updateQualityProcessor(): void {
    this.qualityProcessor = 2;
  }

  updateQuality(): void {
    this.sellIn -= 1;
    if (this.quality < 50) {
      this.quality += this.qualityProcessor;
    }
  }
}
