import { useParams } from 'react-router-dom';
import {
  getSchoolDetailsURL,
  getSchoolDistrictDetailsURL,
  getSearchSchoolsURL,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeature,
  NCESSchoolFeatureAttributes,
  SchoolDetailResponse,
  SchoolDistrictDetailResponse,
  SearchSchoolsResponse,
} from '~utils/nces';
import { useFetch } from '../../hooks/useFetch';
import { Page } from '~components/Page/Page';
import { Box, Button, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DataTile } from '~components/DataTile/DataTile';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { googleMapsKey } from '~utils/maps';
import { DistrictMap } from '~components/DistrictMap/DistrictMap';

export function SchoolDetailPage() {
  const { districtId, schoolId } = useParams();

  if (!districtId) throw new Error('Missing districtId param from URL');
  if (!schoolId) throw new Error('Missing schoolId param from URL');

  const [schoolSearch, setSchoolSearch] = useState('');
  const [searchPrivate, setSearchPrivate] = useState(false);

  const {
    loading: loadingDistrict,
    error: districtError,
    data: districtData,
  } = useFetch<SchoolDistrictDetailResponse>(getSchoolDistrictDetailsURL(districtId));

  const {
    loading: loadingSchool,
    error: schoolError,
    data: schoolData,
  } = useFetch<SchoolDetailResponse>(getSchoolDetailsURL(districtId, schoolId));

  const district = districtData?.features?.[0];
  const school = schoolData?.features?.[0];

  const failedToFindDistrict = !loadingDistrict && !district;
  const failedToFindSchool = !loadingSchool && !school;

  console.log({ schoolData });

  return (
    <Page
      loading={loadingDistrict || loadingSchool}
      breadcrumb={{ content: district?.attributes?.LEA_NAME, to: `/districts/${district?.attributes?.LEAID}` }}
      title={school?.attributes?.SCH_NAME}
    >
      {failedToFindDistrict && (
        <Text>
          {"Couldn't"} find a district with ID {districtId}
        </Text>
      )}

      {failedToFindSchool && (
        <Text>
          {"Couldn't"} find a school with ID {schoolId}
        </Text>
      )}

      {school?.attributes && district?.attributes && (
        <VStack spacing={3}>
          <HStack spacing={3}>
            <DataTile value={`${school.attributes.GSLO}-${school.attributes.GSHI}`} label="Grades" />
            <DataTile value={Math.floor(school.attributes.FTE)} label="Teachers" />
            <DataTile value={Math.floor(school.attributes.TOTAL)} label="Students" />
            <DataTile value={school.attributes.STUTERATIO?.toFixed(2)} label="Students per Teacher" />
          </HStack>

          <VStack spacing={6} alignItems="stretch">
            <DataTile label="Phone" value={school.attributes.PHONE} />
            <DataTile label="Address" value={schoolAddress()} />
          </VStack>

          <DistrictMap district={district} schools={[school]} />
        </VStack>
      )}
    </Page>
  );

  function schoolAddress() {
    if (!school?.attributes) return '';

    const { LSTREET1, LSTREET2, LCITY, LSTATE, LZIP } = school.attributes;

    let address = LSTREET1;

    if (LSTREET2) address += ` ${LSTREET2}`;
    address += ` ${LCITY} ${LSTATE} ${LZIP}`;

    return address;
  }
}
