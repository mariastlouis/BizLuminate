import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibXNhbnRyYSIsImEiOiIyVEZpamwwIn0.Yua2dJ6-MSK_OJCyGe-WEA'

interface MapState {
  lng?: number
  lat?: number
  zoom?: number
}

class Map extends Component <any, any>{
mapContainer: any

  constructor(props:any){
    super(props)
      this.state = {
        lng: 5,
        lat: 34,
        zoom: 1.5
      }
  }

  componentDidMount(){
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });
  }

   render () {
    return (
      <div>
        <div ref={el => this.mapContainer = el} />
      </div>
    )
  }

}







export default Map