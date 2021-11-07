import { useParams } from 'react-router-dom';
import {
  getSchoolDetailsURL,
  getSchoolDistrictDetailsURL,
  NCESSchoolDetailFeatureAttributes,
  SchoolDetailResponse,
  SchoolDistrictDetailResponse,
} from '~utils/nces';
import { useFetch } from '~hooks/useFetch';
import { Page } from '~components/Page/Page';
import { HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { DataTile } from '~components/DataTile/DataTile';
import { DistrictMap } from '~components/DistrictMap/DistrictMap';
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { theme } from '~theme';

export function SchoolDetailPage(): React.ReactElement {
  const { districtId, schoolId } = useParams();

  if (!districtId) throw new Error('Missing districtId param from URL');
  if (!schoolId) throw new Error('Missing schoolId param from URL');

  const { loading: loadingDistrict, data: districtData } = useFetch<SchoolDistrictDetailResponse>(
    getSchoolDistrictDetailsURL(districtId),
  );

  const { loading: loadingSchool, data: schoolData } = useFetch<SchoolDetailResponse>(
    getSchoolDetailsURL(districtId, schoolId),
  );

  const district = districtData?.features?.[0];
  const school = schoolData?.features?.[0];

  const failedToFindDistrict = !loadingDistrict && !district;
  const failedToFindSchool = !loadingSchool && !school;

  const chartData = useMemo((): ChartData<'bar'> | null => {
    if (!school?.attributes) return null;

    // Get all G01 - G13 keys that have number values
    const gradeKeys = Object.keys(school.attributes)
      .filter((key: string) => /G[0-9]+|PK|KG/.test(key))
      .filter((key) => school.attributes?.[key as keyof NCESSchoolDetailFeatureAttributes] != null);

    return {
      labels: gradeKeys.map((key) => {
        if (key == 'PK') return 'Pre-kindergarten';
        if (key == 'KG') return 'Kindergarten';

        return key.replace('G', 'Grade ');
      }),
      datasets: [
        {
          label: 'Student count',
          data: gradeKeys.map((key) => school.attributes?.[key as keyof NCESSchoolDetailFeatureAttributes] as number),
          backgroundColor: [theme.colors.green['500']],
          borderColor: [theme.colors.green['500']],
          borderWidth: 1,
          barThickness: 50,
          pointStyle: 'rectRounded',
        },
      ],
    };
  }, [school]);

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
        <VStack spacing={6}>
          <HStack spacing={6}>
            <DataTile value={`${school.attributes.GSLO}-${school.attributes.GSHI}`} label="Grades" />
            <DataTile value={Math.floor(school.attributes.FTE)} label="Teachers" />
            <DataTile value={Math.floor(school.attributes.TOTAL)} label="Students" />
            <DataTile value={school.attributes.STUTERATIO?.toFixed(2)} label="Students per Teacher" />
          </HStack>

          <VStack spacing={6} alignItems="stretch">
            <DataTile label="Phone" value={school.attributes.PHONE} />
            <DataTile label="Address" value={schoolAddress()} />
          </VStack>

          {chartData && <Bar data={chartData} style={{ maxHeight: '300px' }} />}

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
