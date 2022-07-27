export class statsObj {
  appViewCount: number = 0;
  appViewerCount: number = 0;
  interestCount: number = 0;
  processedLoanCount: number = 0;
  testDriveCount: number = 0;
  webViewCount: number = 0;
  webViewerCount: number = 0;
}

export class Vehicle {

  bodyTypeId: string = "";
  city: string = "";
  depositReceived: boolean = false;
  fuelType: string = "";
  gradeScore: number = 0;
  hasFinancing: boolean = true;
  hasThreeDImage: boolean = false;
  hasWarranty: boolean = false;
  id: string = "";
  imageUrl: string = "";
  installment: number = 0;
  loanValue: number = 0;
  marketplaceOldPrice: number = 0;
  marketplacePrice: number = 0;
  marketplaceVisibleDate: string = "";
  mileage: number = 0;
  mileageUnit: string = "";
  sellingCondition: string = "";
  sold: boolean = false
  state: string = "";
  stats: statsObj = new statsObj();
  title: string = "";
  transmission: string = "";
  websiteUrl: string = "";
  year: number = 0;

}
