import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { googleMapsKey } from '~utils/maps';
import { NCESDistrictDetailFeature, NCESSchoolDetailFeature, NCESSchoolFeature } from '~utils/nces';
import { Link } from 'react-router-dom';

export type DistrictMapProps = {
  district: NCESDistrictDetailFeature;
  schools: (NCESSchoolFeature | NCESSchoolDetailFeature)[];
};

type School = {
  lat: number;
  long: number;
  name: string;
  address: string;
  id: string;
};

export function DistrictMap(props: DistrictMapProps) {
  const { district, schools } = props;

  const [focusedSchool, setFocusedSchool] = useState<null | School>(null);

  const { isLoaded: googleMapsReady } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsKey,
  });

  // The NCESSchoolFeature and NCESSchoolDetailFeature types are too different to handle in JSX.
  // Serialize the two types into one type to make it easier to deal with.
  const serializedSchools = useMemo((): School[] => {
    return schools.reduce((schools: School[], school) => {
      if (!school?.attributes) return schools;

      // NCESSchoolFeature has LAT, NCESSchoolDetailFeature has LATCOD
      if ('LAT' in school.attributes) {
        schools.push({
          lat: school.attributes.LAT || 0,
          long: school.attributes.LON || 0,
          name: school.attributes.NAME || '',
          address: `${school.attributes?.STREET} ${school.attributes?.CITY} ${school.attributes?.STATE} ${school.attributes?.ZIP}`,
          id: school.attributes.NCESSCH || '',
        });
      } else if ('LATCOD' in school.attributes) {
        schools.push({
          lat: school.attributes.LATCOD || 0,
          long: school.attributes.LONCOD || 0,
          name: school.attributes.SCH_NAME || '',
          address: `${school.attributes?.LSTREET1} ${school.attributes?.LCITY} ${school.attributes?.LSTATE} ${school.attributes?.LZIP}`,
          id: school.attributes.NCESSCH || '',
        });
      }

      return schools;
    }, []);
  }, [schools]);

  return (
    <>
      {googleMapsReady && district.attributes?.Lat && district.attributes?.Long && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: 400, borderRadius: 10 }}
          center={{ lat: district.attributes.Lat, lng: district.attributes.Long }}
          zoom={10}
        >
          {serializedSchools.map((school) => (
            <>
              {focusedSchool == school && (
                <InfoWindow
                  position={{
                    lat: school.lat,
                    lng: school.long,
                  }}
                  onCloseClick={() => setFocusedSchool(null)}
                >
                  <VStack p={1}>
                    <Text fontWeight="medium">{school.name}</Text>
                    <Text>{school.address}</Text>

                    <Button
                      as={Link}
                      to={`/districts/${district.attributes?.LEAID}/schools/${school.id}`}
                      colorScheme="green"
                      size="xs"
                    >
                      View
                    </Button>
                  </VStack>
                </InfoWindow>
              )}

              <Marker position={{ lat: school.lat, lng: school.long }} onClick={() => setFocusedSchool(school)}>
                <Text>{school.name}</Text>
              </Marker>
            </>
          ))}
        </GoogleMap>
      )}
    </>
  );
}
