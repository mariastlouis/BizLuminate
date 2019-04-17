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

export const selectPlace = async(id) => {
  try {
    const demographicFetch = await fetch (`/api/v1/demographics/${id}`);
    const demographicResponse = await demographicFetch.json();
    const transportationPromises = await getTransportation(id);
    const educationPromises = await getEducationData(id);
    return {
      income: {
        chartName: 'Median household income',
        placeName: demographicResponse.places[0].placeDisplayName,
        stateData: coloTotals[0].medianIncomeDollars,
        placeData: demographicResponse.places[0].medianIncomeDollars,
        dataStart: 15000
      },
      age:{
        chartName: 'Median age',
        placeName: demographicResponse.places[0].placeDisplayName,
        placeData: demographicResponse.places[0].medianAge,
        stateData: coloTotals[0].medianAge,
        dataStart: 30
      },
      transportation: transportationPromises,
      education: educationPromises
    }
  } catch (error){
    throw (error)
  }
};

export const getTransportation = async(id) => {
  try {
    const transportationFetch = await fetch (`/api/v1/transportation/${id}`)
    const transportationResponse = await transportationFetch.json();
    // return transportationResponse.places[0].placeDisplayName

    return {
      commute: {
        chartName: 'Average commute time',
        placeName: transportationResponse.places[0].placeDisplayName,
        placeData: transportationResponse.places[0].meanTravelTimeWork,
        stateData: coloTotals[0].meanTravelTimeWork,
        dataStart: 10
      },
      travel:{
        chartName: 'Transportation to work',
        placeName: transportationResponse.places[0].placeDisplayName,
        labels: ['Bike', 'Drive van or car alone', 'Walk'],
        placeData: [
        transportationResponse.places[0].pctBicycle,
        transportationResponse.places[0].pctCarTruckVanAlone,
        transportationResponse.places[0].pctWalked
        ]
      }
    }
  } catch (error) {
    throw (error)
  }
}

  const getEducationData = async(id) => {
    try {
      const educationFetch = await fetch(`api/v1/education/${id}`);
      const educationResponse = await educationFetch.json();
      return {
        level: {
          chartName: 'Education levels',
          placeName: educationResponse.places[0].placeDisplayName,
          labels: [
            'Less than 9th grade',
            'High school graduate',
            'Some college',
            "Associate's degree",
            "Bachelor's degree",
            "Graduate or professional degree"
          ],
          placeData: [
            educationResponse.places[0].less9th,
            educationResponse.places[0].hsgrad,
            educationResponse.places[0].somecollege,
            educationResponse.places[0].associates,
            educationResponse.places[0].bachelors,
            educationResponse.places[0].graduateprofessional,
          ]
        }
      }
    } catch (error){
      throw (error)
    }
  }
