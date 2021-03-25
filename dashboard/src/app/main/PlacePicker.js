import React, { useEffect } from 'react';

import {
  withGoogleMap, GoogleMap, withScriptjs, Marker,
} from 'react-google-maps';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { TextField } from '@material-ui/core';
import Geocode from 'react-geocode';
// If you want to use the provided css
// import 'react-google-places-autocomplete/dist/index.min.css';

let zoomLevel = 12;

function PlacePicker(props) {
  const [selectedLocation, setSelectedLocation] = React.useState({
    lat: props.geopoint.coordinates[1],
    lng: props.geopoint.coordinates[0],
  });
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const map = React.createRef();

  Geocode.setApiKey(props.googleKey);
  Geocode.enableDebug();
  useEffect(() => {
    setSelectedLocation({
      lat: props.geopoint.coordinates[1],
      lng: props.geopoint.coordinates[0],
    });
  }, [props.geopoint, props.geopoint.coordinates]);

  function handleSelectedLocation(lat, lng) {
    if (props.onLocationSelected) {
      props.onLocationSelected(lat, lng);
    }
    setSelectedLocation({
      lat,
      lng,
    });
  }

  const onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    handleSelectedLocation(newLat, newLng);
    Geocode.fromLatLng(newLat, newLng)
      .then(
        (response) => {
          const address = response.results[0].formatted_address;
          setSelectedAddress(address);
        },
        (error) => {
          console.error(error);
        },
      );
  };
  const AsyncMap = withScriptjs(
    withGoogleMap(
      () => (
        <div>
          <GooglePlacesAutocomplete
            className="mt-8 mb-16"
            fullWidth
            initialValue={selectedAddress}
            selectProps={{
              onChange: (place) => {
                geocodeByPlaceId(place.value.place_id)
                  .then((results) => {
                    if ((results || []).length > 0) {
                      setSelectedAddress(results[0].formatted_address);
                      handleSelectedLocation(results[0].geometry.location.lat(),
                        results[0].geometry.location.lng());
                    }
                  })
                  .catch((error) => console.error(error));
              },
            }}
            renderInput={(props) => (
              <div className="custom-wrapper">
                <TextField
                  className="mt-8 mb-16"
                  fullWidth
                  label="Location"
                  id="location"
                  name="location"
                  variant="outlined"
                  {...props}
                />
              </div>
            )}
          />
          <GoogleMap
            google={props.google}
            ref={map}
            defaultZoom={zoomLevel}
            onZoomChanged={() => {
              zoomLevel = map.current.getZoom();
            }}
            defaultCenter={selectedLocation}
          >
            <Marker
              draggable
              onDragEnd={onMarkerDragEnd}
              position={selectedLocation}
            />
          </GoogleMap>
        </div>
      ),
    ),
  );

  return (
    <div className="mt-8 mb-16 h-512">
      <div className="w-full h-256">
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.googleKey}&libraries=places`}
          loadingElement={
            <div style={{ height: '100%' }} />
          }
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
        />
      </div>
    </div>
  );
}

export default React.memo(PlacePicker);
