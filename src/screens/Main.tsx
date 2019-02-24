import React, { Component, Fragment } from 'react';
import Sockette from 'sockette';
// examples:
import GoogleMap from '../components/GoogleMap';
// components:
import Marker from '../components/Marker';
// consts
import CHENNAI_CENTER from '../const/la_center';

const WEBSOCKET_URL = 'ws://localhost:8082/api/track?trackerid=';

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(place.lat, place.lng));
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

export interface IPlace {
  lat: string;
  lng: string;
  id: string;
  name?: string;
}

interface IMainState {
  places: IPlace[];
}

class Main extends Component<any, IMainState> {
  public constructor(props, state) {
    super(props, state);
    this.state = {
      places: [],
    };
  }

  public render() {
    const { places } = this.state;

    let center = {};
    if (places && places.length > 0) {
      center = { lat: places[0].lat, lng: places[0].lng };
    }
    return (
      <Fragment>
        <GoogleMap
          defaultZoom={4}
          defaultCenter={CHENNAI_CENTER}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
          center={center}
        >
          {places.map((place) => (
            <Marker detail={place} />
          ))}
        </GoogleMap>
      </Fragment>
    );
  }

  public componentDidMount() {
    this.initializeWebSocket();
  }

  private initializeWebSocket = () => {
    const pathname = window.location.pathname.split('/')[2];
    const sockette = new Sockette(WEBSOCKET_URL + pathname, {
      timeout: 5e3,
      maxAttempts: 3,
      onopen: (e) => console.log('Connected!', e),
      onmessage: (e) => {
        console.log('Received:', e);
        const data = JSON.parse(e.data);
        this.onMessageReceived(data);
      },
      onreconnect: (e) => console.log('Reconnecting...', e),
      onmaximum: (e) => console.log('Stop Attempting!', e),
      onclose: (e) => console.log('Closed!', e),
      onerror: (e) => console.log('Error:', e),
    });
  };

  private onMessageReceived = (data) => {
    const placeslist: IPlace[] = [];
    const defaultPosition = data.positions[0];
    placeslist.push({
      lat: defaultPosition.latitude,
      lng: defaultPosition.longitude,
      id: defaultPosition.id,
      name: "Doomie's Home Cookin'",
    });
    this.setState({
      places: placeslist,
    });
  };
}

export default Main;
