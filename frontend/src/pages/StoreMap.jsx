import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import Header from '../components/Header';
import markers from '../assets/data/storesCoimbatore.json';
import Navbar from '../components/Navbar';

const containerStyle = {
    width: '100%',
    height: '580px'
};

const center = {
    lat: 11.028620748678694,
    lng: 77.02724840634416
};

function StoreMap() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
    });

    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const handleMouseOver = (index) => {
        setActiveMarker(index);
    };

    const handleMouseOut = () => {
        setActiveMarker(null);
    };

    return (
        <>
            <Navbar />
            <Header />
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        mapTypeId={window.google.maps.MapTypeId.HYBRID}
                    >
                        {
                            markers.map((marker, index) => (
                                <MarkerF
                                    key={index}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    onMouseOver={() => handleMouseOver(index)}
                                    onMouseOut={handleMouseOut}
                                >
                                    {
                                        activeMarker === index && (
                                            <InfoWindowF
                                                position={{ lat: marker.lat, lng: marker.lng }}
                                                onCloseClick={handleMouseOut}
                                            >
                                                <div>
                                                    {marker.name}
                                                </div>
                                            </InfoWindowF>
                                        )
                                    }
                                </MarkerF>
                            ))
                        }

                    </GoogleMap>
                ) : <></>
            }
        </>
    );
}

export default StoreMap;

// import React, { useState } from 'react'
// import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
// import Header from '../components/Header';
// import markers from '../assets/data/storesCoimbatore.json'
// import Navbar from '../components/Navbar';

// const containerStyle = {
//     width: '1700px',
//     height: '580px'
// };

// const center = {
//     lat: 11.028620748678694,
//     lng: 77.02724840634416
// };

// // const markers = [
// //     {
// //         id: 1,
// //         name: "CIT",
// //         position: { lat: 11.028620748678694, lng: 77.02724840634416 }
// //     }
// // ]

// function StoreMap() {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
//     })

//     const [map, setMap] = React.useState(null)

//     const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds(center);
//         map.fitBounds(bounds);
//         setMap(map)
//     }, [])

//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//     }, [])

//     return (
//         <>
//             <Navbar />
//             <Header />
//             {
//                 isLoaded ? (
//                     <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={center}
//                         zoom={10}
//                         onLoad={onLoad}
//                         onUnmount={onUnmount}
//                     >
//                         {
//                             markers.map((marker, index) => {
//                                 return (
//                                     <MarkerF key={index} position={{ lat: marker.lat, lng: marker.lng }}>
//                                         <InfoWindowF
//                                             position={{ lat: marker.lat, lng: marker.lng }}
//                                         >
//                                             <div>
//                                                 {marker.name}
//                                             </div>
//                                         </InfoWindowF>
//                                     </MarkerF>
//                                 );
//                             })
//                         }

//                     </GoogleMap >
//                 ) : <></>
//             }
//         </>
//     );
// }

// export default StoreMap;