const XLSX = require('xlsx');
const axios = require('axios');
const fs = require('fs');

const getAddressLatLng = async (address) => {
    const apiKey = "AIzaSyBfS5CUoVacGm9Bdi20yXXQ9Yv7yj3xnU0";
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        
        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error('Geocoding API request failed');
        }
    } catch (error) {
        console.error('Error geocoding address:', error);
        return null;
    }
};

const processExcelFile = async (filePath) => {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[1]];
    const addresses = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });

    const results = [];

    for (let i = 0; i < addresses.length; i++) {
        const row = addresses[i];
        const address = row[1]; // Assuming address is in the first column
        console.log(address)
        const coords = await getAddressLatLng(address);
        if (coords) {
            results.push({ address, ...coords });
        }
    }

    return results;
};

const main = async () => {
    // const excelFilePath = './Store_Locations_final.xlsx';
    const excelFilePath = 'C:/Users/ajjos/OneDrive/Desktop/ImageUpload/backend/Store_Locations_final.xlsx';
    const outputFilePath = 'C:/Users/ajjos/OneDrive/Desktop/ImageUpload/backend/coordinates.json';

    try {
        const data = await processExcelFile(excelFilePath);
        fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
        console.log('Coordinates have been saved to', outputFilePath);
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
