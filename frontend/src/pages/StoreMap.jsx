import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Header from '../components/Header';

const containerStyle = {
    width: '1700px',
    height: '580px'
};

const center = {
    lat: 11.028620748678694,
    lng: 77.02724840634416
};

const markers = [
    {
        id: 1,
        name: "CIT",
        position: { lat: 11.028620748678694, lng: 77.02724840634416 }
    }
]

function StoreMap() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY

    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const { activeMarker, setActiveMarker } = useState(null);

    return (
        <>
            <Header />
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={20}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        {
                            markers.map(({ id, name, position }) => {
                                <MarkerF key={id} position={position}>
                                    <div>
                                        {name}
                                    </div>
                                </MarkerF>
                            })
                        }

                    </GoogleMap>
                ) : <></>
            }
        </>
    );
}

export default StoreMap;