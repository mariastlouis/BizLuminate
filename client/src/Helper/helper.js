import {nrelKey} from '../mapKey'
import {coloTotals} from '../geographyData/coloradoTotals';
import { isConstructorDeclaration } from 'typescript';

export const countyUnemploymentFetch = async() => {
  try {
    const initialFetch = await fetch('api/v1/unemployment');
    const fetchResponse = await initialFetch.json();
    return fetchResponse;
  } catch(error) {
    throw error;
  }
};

export const countyIdFetch = async(id) => {
  try {
    const initialFetch = await fetch(`api/v1/places/${id}`)
    const fetchResponse = await initialFetch.json();
    return JSON.stringify(fetchResponse)

  } catch (error) {
    throw error;
  }
}

export const cardDataFetch = async(id) => {
  try {
    const demographicFetch = await fetch (`/api/v1/demographics/${id}`);
    const demographicResponse = await demographicFetch.json();
    const educationFetch = await fetch(`api/v1/education/${id}`);
    const educationResponse = await educationFetch.json();
    return Object.assign({}, educationResponse.places[0], demographicResponse.places[0])

  }catch(error){
    throw error;
  }
}


export const altFuelFetch = async() => {
  try {
    const initialFetch = await fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${nrelKey}&fuel_type=ELEC&state=CO`)
    const fetchResponse = await initialFetch.json();
    return fuelGeo(fetchResponse.fuel_stations)
  } catch (error) {
    throw error;
  }
}


let fuelGeo = (locations) => {
  let fuelgeojson = {};
  fuelgeojson['type']="FeatureCollection";
  fuelgeojson['features']=[];
  locations.forEach((location)=> {
    fuelgeojson['features'].push(
      {
      "type":"Feature",
      "geometry":{
            "type":"Point",
            "coordinates": [location.longitude, location.latitude]
      },
      "properties":{
        "id": location.id,
        "city":location.city,
        "zip":location.zip,
        "address":location.street_address
        }
      }
    )
  });
  return fuelgeojson
}

export const selectPlace = async (id) => {
  const demographicFetch = await fetch (`/api/v1/demographics/${id}`);
  const demographicResponse = await demographicFetch.json();

  return {
    placeName: demographicResponse.places[0].placeDisplayName,
    stateIncome: coloTotals[0].medianIncomeDollars,
    placeIncome: demographicResponse.places[0].medianIncomeDollars
  }
}
