import { Center, FormControl, FormLabel, Input, ScaleFade, Spinner, Text } from '@chakra-ui/react';
import { DistrictList } from '~components/DistrictList/DistrictList';
import React, { useMemo, useState } from 'react';
import { useFetch } from '~hooks/useFetch';
import { getSearchSchoolDistrictsURL, NCESDistrictFeatureAttributes, SearchSchoolDistrictsResponse } from '~utils/nces';
import { Page } from '~components/Page/Page';

const MAX_VISIBLE_DISTRICTS = 10;

export function DistrictSearchPage(): React.ReactElement {
  const [districtName, setDistrictName] = useState('Peninsula School District');
  const { loading, data } = useFetch<SearchSchoolDistrictsResponse>(getSearchSchoolDistrictsURL(districtName), {
    debounce: 300,
  });

  const districts = useMemo(
    () =>
      data
        ? (data.features.map((feature) => feature.attributes).filter(Boolean) as NCESDistrictFeatureAttributes[])
        : [],
    [data],
  );

  const visibleDistricts = useMemo(() => districts.slice(0, MAX_VISIBLE_DISTRICTS), [districts]);

  return (
    <Page title="Search districts">
      <FormControl marginBottom={4}>
        <FormLabel id="DistrictName">District name</FormLabel>
        <Input size="lg" value={districtName} onChange={(e) => setDistrictName(e.target.value)} borderRadius="xl" />
      </FormControl>

      {loading ? (
        <Center height="80px">
          <Spinner />
        </Center>
      ) : (
        <ScaleFade initialScale={0.9} in={!loading}>
          {districts.length > 0 ? (
            <DistrictList districts={visibleDistricts} />
          ) : (
            <Center height="80px">
              <Text>No results found.</Text>
            </Center>
          )}

          {districts.length > MAX_VISIBLE_DISTRICTS && (
            <Text marginTop={4}>
              {(districts.length - MAX_VISIBLE_DISTRICTS).toLocaleString()} district(s) not shown. Please refine your
              search.
            </Text>
          )}
        </ScaleFade>
      )}
    </Page>
  );
}
