import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { googleMapsKey } from '@utils/maps';
import { NCESDistrictDetailFeature, NCESSchoolFeature } from '@utils/nces';
import { Link } from 'react-router-dom';

export type DistrictMapProps = {
  district: NCESDistrictDetailFeature;
  schools: NCESSchoolFeature[];
};

export function DistrictMap(props: DistrictMapProps) {
  const { district, schools } = props;

  const [focusedSchool, setFocusedSchool] = useState<null | NCESSchoolFeature>(null);

  const { isLoaded: googleMapsReady } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsKey,
  });

  return (
    <>
      {googleMapsReady && district.attributes?.Lat && district.attributes?.Long && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: 400, borderRadius: 10 }}
          center={{ lat: district.attributes.Lat, lng: district.attributes.Long }}
          zoom={10}
        >
          {schools.map(
            (school) =>
              school.attributes?.LAT &&
              school.attributes.LON && (
                <>
                  {focusedSchool == school && (
                    <InfoWindow
                      position={{
                        lat: school.attributes.LAT,
                        lng: school.attributes.LON,
                      }}
                      onCloseClick={() => setFocusedSchool(null)}
                    >
                      <VStack p={1}>
                        <Text fontWeight="medium">{school.attributes?.NAME}</Text>
                        <Text>
                          {school.attributes?.STREET} {school.attributes?.CITY} {school.attributes?.STATE}{' '}
                          {school.attributes?.ZIP}
                        </Text>
                      </VStack>
                    </InfoWindow>
                  )}

                  <Marker
                    position={{ lat: school.attributes.LAT, lng: school.attributes.LON }}
                    onClick={() => setFocusedSchool(school)}
                  >
                    <Text>{school.attributes.NAME}</Text>
                  </Marker>
                </>
              ),
          )}
        </GoogleMap>
      )}
    </>
  );
}
