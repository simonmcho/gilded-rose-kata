export class General {
  name: string;
  sellIn: number;
  quality: number;
  qualityProcessor = 1;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  processItem(): void {
    const isPastSellDate = this.isSellInMinLimit();
    if (isPastSellDate) {
      this.updateQualityProcessor();
    }
    this.updateQuality();
    this.setQualityThreshold();
  }

  isSellInMinLimit(): boolean {
    return this.sellIn < 0;
  }

  updateQualityProcessor(): void {
    this.qualityProcessor += 1;
  }

  setQualityThreshold(): void {
    if (this.quality > 50) {
      this.quality = 50;
    }
    if (this.quality < 0) {
      this.quality = 0;
    }
  }

  updateQuality(): void {
    this.sellIn -= 1;
    const canUpdateQuality = this.quality > 0;
    if (canUpdateQuality) {
      this.quality -= this.qualityProcessor;
    }
    if (this.quality < 0) {
      this.quality = 0;
    }
  }
}
