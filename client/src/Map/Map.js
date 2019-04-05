import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import './Map.scss'

mapboxgl.accessToken = 'pk.eyJ1IjoibXNhbnRyYSIsImEiOiIyVEZpamwwIn0.Yua2dJ6-MSK_OJCyGe-WEA'


class Map extends Component {

  constructor(props){
    super(props)
      this.state = {
        lng: -104.9389,
        lat: 39.2587,
        zoom: 6
      }
  }

  componentDidMount(){
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/msantra/cjts4mlvt1es21fp70le4t23j',
      center: [lng, lat],
      zoom
    });
  }


   render () {
    return (
      <div>
        <div className = "map-holder" ref={el => this.mapContainer = el} />
      </div>
    )
  }

}

export default Map