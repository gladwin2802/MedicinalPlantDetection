const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const apiKey = "";

async function searchAyurvedicShops(location) {
    const encodedLocation = encodeURIComponent(location);
    const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=ayurvedic+shops+near+${encodedLocation}&key=${apiKey}`;

    try {
        const textSearchResponse = await axios.get(textSearchUrl);
        const textSearchData = textSearchResponse.data;

        if (textSearchData.status === 'OK') {
            const shopPlaceIds = textSearchData.results.map((shop) => shop.place_id);
            return await getShopLocations(shopPlaceIds);
        } else {
            console.error('Error searching for ayurvedic shops:', textSearchData.status);
            return [];
        }
    } catch (error) {
        console.error('Error searching for ayurvedic shops:', error);
        return [];
    }
}

async function getShopLocations(placeIds) {
    const locationString = placeIds.join('|');
    const nearbySearchUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${locationString}&fields=name,geometry&key=${apiKey}`;

    try {
        const nearbySearchResponse = await axios.get(nearbySearchUrl);
        const nearbySearchData = nearbySearchResponse.data;

        if (nearbySearchData.status === 'OK') {
            return nearbySearchData.results.map((shop) => ({
                name: shop.name,
                latitude: shop.geometry.location.lat,
                longitude: shop.geometry.location.lng,
            }));
        } else {
            console.error('Error fetching shop locations:', nearbySearchData.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching shop locations:', error);
        return [];
    }
}

async function main() {
    const location = "Coimbatore, Tamil Nadu, India";

    const shops = await searchAyurvedicShops(location);
    const shopJson = JSON.stringify(shops, null, 2);

    if (shops.length > 0) {
        fs.writeFileSync('nearby_ayurvedic_shops.json', shopJson);
        console.log('Locations of nearby ayurvedic shops saved to nearby_ayurvedic_shops.json');
    } else {
        console.log('No ayurvedic shops found nearby.');
    }
}

main();
