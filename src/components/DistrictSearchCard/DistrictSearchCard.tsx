import { Card } from '@components/design/Card';
import { FormControl, FormLabel, Heading, Input, Spinner } from '@chakra-ui/react';
import { DistrictList } from '@components/DistrictList/DistrictList';
import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getSearchSchoolDistrictsURL, NCESDistrictFeatureAttributes, SearchSchoolDistrictsResponse } from '@utils/nces';

export function DistrictSearchCard() {
  const [districtName, setDistrictName] = useState('Peninsula School District');
  const { loading, error, data } = useFetch<SearchSchoolDistrictsResponse>(getSearchSchoolDistrictsURL(districtName), {
    debounce: 300,
  });

  const districts = data
    ? (data.features.map((feature) => feature.attributes).filter(Boolean) as NCESDistrictFeatureAttributes[])
    : [];

  return (
    <Card variant="rounded" borderColor="blue" width="xl">
      <Heading>School Data Finder</Heading>

      <FormControl>
        <FormLabel id="DistrictName">District name</FormLabel>
        <Input value={districtName} onChange={(e) => setDistrictName(e.target.value)} />
      </FormControl>

      {loading ? <Spinner /> : <DistrictList districts={districts} />}
    </Card>
  );
}
