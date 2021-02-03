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
  }

  isSellInMinLimit(): boolean {
    return this.sellIn < 0;
  }

  updateQualityProcessor(): void {
    this.qualityProcessor += 1;
  }

  isQualityMaxLimit(): boolean {
    return this.quality >= 50;
  }

  isQualityMinLimit(): boolean {
    return this.quality <= 0;
  }

  updateQuality(): void {
    this.sellIn -= 1;
    const canUpdateQuality = !this.isQualityMinLimit();
    if (canUpdateQuality) {
      this.quality -= this.qualityProcessor;
    }
  }
}
