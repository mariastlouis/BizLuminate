import {nrelKey} from '../mapKey'

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
  let fuelgeojson = {}
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
  })
  return fuelgeojson
}


