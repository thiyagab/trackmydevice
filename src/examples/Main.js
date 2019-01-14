import React, { Component, Fragment } from 'react';

// components:
import Marker from '../components/Marker';

// examples:
import GoogleMap from '../components/GoogleMap';

// consts
import CHENNAI_CENTER from '../const/la_center';
import Sockette from 'sockette';



// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.lat,
      place.lng,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
      this.initializeWebSocket()
  }

   initializeWebSocket = ()=>{
    
    var pathname=window.location.pathname.split("/")[2]
    console.log('Path',pathname)
    new Sockette('ws://localhost:8082/api/track?trackerid='+pathname, {
      timeout: 5e3,
      maxAttempts: 3,
      onopen: e => console.log('Connected!', e),
      onmessage: e => {
        console.log('Received:', e)
        var data= JSON.parse(e.data)
        this.onMessageReceived(data)
      },
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
  });
  }

  onMessageReceived = (data)=>{
    const placeslist=[]
      placeslist.push(
        {
          "lat": data["positions"][0].latitude,
          "lng": data["positions"][0].longitude,
          "id": data["positions"][0].id,
          "name": "Doomie's Home Cookin'"
        }
      )
      this.setState({
      places:placeslist
      });
  }

  render() {
    const { places } = this.state;

    let center ={}
    if (places  && places.length>0){
      center={lat:places[0].lat,lng:places[0].lng}
    }
    return (
      <Fragment>
        
          <GoogleMap
            defaultZoom={4}
            defaultCenter={CHENNAI_CENTER}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
            center ={center}
          >
            {places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.lat}
                lng={place.lng}
              />
            ))}
          </GoogleMap>
        
      </Fragment>
    );
  }
}

export default Main;
