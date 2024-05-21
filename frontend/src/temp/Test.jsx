import React, { useState } from 'react';
import axiosNode from '../config/axiosNode';

function Test() {
    const [responseData, setResponseData] = useState(null);

    const handleClick = async () => {
        try {
            console.log('POST URL:', axiosNode.defaults.baseURL + '/api/upload');
            const response = await axiosNode.get('/api/deleteAll');
            setResponseData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Delete All</button>
            {responseData && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Test;
