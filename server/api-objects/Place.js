"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Place = /** @class */ (function () {
    function Place(placeId, placeShortId, placeCensusName, placeDisplayName, cityTown, multipleCounties, countyName, countyShortId, countyId, county2Name, county2ShortId, county2Id, county3Name, county3ShortId, county3Id) {
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
    return Place;
}());
exports.default = Place;
