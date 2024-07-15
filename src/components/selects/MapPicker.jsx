import React, { useState } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const MapPicker = () => {
    const [address, setAddress] = useState('');

    const handleSelect = async (value) => {
        setAddress(value);
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            console.log('Coordinates:', latLng);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
            <div>
                <h1>Places Search Box</h1>
                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input {...getInputProps({ placeholder: 'Enter a location' })} />
                            <div>
                                {loading ? <div>Loading...</div> : null}
                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                    };
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, { style })}>
                                            {suggestion.description}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
        </LoadScript>
    );
};

export default MapPicker;
