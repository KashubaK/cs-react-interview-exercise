import { useParams } from 'react-router-dom';
import {
  getSchoolDistrictDetailsURL,
  getSearchSchoolsURL,
  SchoolDistrictDetailResponse,
  SearchSchoolsResponse,
} from '~utils/nces';
import { useFetch } from '~hooks/useFetch';
import { Page } from '~components/Page/Page';
import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { DataTile } from '~components/DataTile/DataTile';
import { DistrictMap } from '~components/DistrictMap/DistrictMap';

export function DistrictDetailPage(): React.ReactElement {
  const { districtId } = useParams();
  if (!districtId) throw new Error('Missing districtId param from URL');

  const { loading: loadingDistrict, data: districtData } = useFetch<SchoolDistrictDetailResponse>(
    getSchoolDistrictDetailsURL(districtId),
  );

  const { loading: loadingSchools, data: schoolsData } = useFetch<SearchSchoolsResponse>(
    getSearchSchoolsURL('', districtId, { searchPrivate: false }),
  );

  const district = districtData?.features?.[0];
  const failedToFindDistrict = !loadingDistrict && !district;

  return (
    <Page
      loading={loadingDistrict || loadingSchools}
      breadcrumb={{ content: 'Home', to: '/' }}
      title={district?.attributes?.LEA_NAME}
    >
      {failedToFindDistrict && (
        <Text>
          {"Couldn't"} find a district with ID {districtId}
        </Text>
      )}

      {district?.attributes && (
        <VStack spacing={6}>
          <HStack spacing={6} justify="stretch" width="100%">
            <DataTile label="Grades" value={`${district.attributes.GSLO}-${district.attributes.GSHI}`} />
            <DataTile label="Schools" value={district.attributes.SCH} />
            <DataTile label="Teachers" value={Math.floor(district.attributes.TOTTCH).toLocaleString()} />
            <DataTile label="Students" value={Math.floor(district.attributes.MEMBER).toLocaleString()} />
            <DataTile label="Students per Teacher" value={district.attributes.STUTERATIO.toLocaleString()} />
          </HStack>

          <VStack spacing={6} alignItems="stretch">
            <DataTile label="Phone" value={district.attributes.PHONE} />
            <DataTile label="Address" value={districtAddress()} />
          </VStack>

          {schoolsData?.features && <DistrictMap district={district} schools={schoolsData?.features} />}
        </VStack>
      )}
    </Page>
  );

  function districtAddress() {
    if (!district?.attributes) return '';

    const { LSTREET1, LSTREET2, LCITY, LSTATE, LZIP } = district.attributes;

    let address = LSTREET1;

    if (LSTREET2) address += ` ${LSTREET2}`;
    address += ` ${LCITY} ${LSTATE} ${LZIP}`;

    return address;
  }
}
