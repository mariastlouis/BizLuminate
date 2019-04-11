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