export default class Place {
  private placeId: number;
  private placeShortId: number;
  private placeCensusName: string;
  private placeDisplayName: string;
  private cityTown: string;
  private multipleCounties: string;
  private countyName: string;
  private countyShortId: number;
  private countyId: number;
  private county2Name: string;
  private county2ShortId: number;
  private county2Id: number;
  private county3Name: string;
  private county3ShortId: number;
  private county3Id: number;

  constructor(
    placeId: number,
    placeShortId: number,
    placeCensusName: string,
    placeDisplayName: string,
    cityTown: string,
    multipleCounties: string,
    countyName: string,
    countyShortId: number,
    countyId: number,
    county2Name: string,
    county2ShortId: number,
    county2Id: number,
    county3Name: string,
    county3ShortId: number,
    county3Id: number
  ) {
    this.placeId = placeId;
    this.placeShortId = placeShortId;
    this.placeCensusName = placeCensusName;
    this.placeDisplayName = placeDisplayName;
    this.cityTown = cityTown;
    this.multipleCounties = multipleCounties;
    this.countyName = countyName;
    this.countyShortId = countyShortId;
    this.countyId = countyId;
    this.county2Name = county2Name;
    this.county2ShortId = county2ShortId;
    this.county2Id = county2Id;
    this.county3Name = county3Name;
    this.county3ShortId = county3ShortId;
    this.county3Id = county3Id;
  }
}
