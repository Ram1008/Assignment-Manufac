interface CropProduction {
    CropName: string;
    Production: number | null;
  }
  
  interface YearlyData {
    max: CropProduction;
    min: CropProduction;
  }
  interface CropData {
    totalYield: number;
    totalArea: number;
  }
  