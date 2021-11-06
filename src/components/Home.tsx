import React, {useEffect, useState} from 'react';
import {
  Button,
  Center,
  Heading,
  Text,
  Icon,
  Input,
  ScaleFade,
  OrderedList,
  Divider,
  ListItem,
  Spinner,
  InputGroup, // Some Chakra components that might be usefull
  HStack,
  VStack,
  InputRightAddon, FormControl, FormLabel,
} from '@chakra-ui/react';
import { Card } from '@components/design/Card';
import {
  searchSchoolDistricts,
  searchSchools,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeatureAttributes, getSearchSchoolDistrictsURL, SearchSchoolDistrictsResponse,
} from '@utils/nces';
import {useFetch} from "../hooks/useFetch";

const Home: React.FC = () => {
  // const [searching, setSearching] = React.useState(false);
  // const [districtSearch, setDistrictSearch] = React.useState<NCESDistrictFeatureAttributes[]>([]);
  // const [schoolSearch, setSchoolSearch] = React.useState<NCESSchoolFeatureAttributes[]>([]);
  //
  // const demo = async () => {
  //   // see console for api result examples
  //   setSearching(true);
  //   const demoDistrictSearch = await searchSchoolDistricts('Peninsula School District');
  //   setDistrictSearch(demoDistrictSearch);
  //   console.log('District example', demoDistrictSearch);
  //
  //   const demoSchoolSearch = await searchSchools('k', demoDistrictSearch[1].LEAID);
  //   setSchoolSearch(demoSchoolSearch);
  //   console.log('School Example', demoSchoolSearch);
  //   setSearching(false);
  // };
  //
  // useEffect(() => {
  //   demo();
  // }, []);

  const [districtName, setDistrictName] = useState('Peninsula School District');
  const { loading, error, data } = useFetch<SearchSchoolDistrictsResponse>(getSearchSchoolDistrictsURL(districtName), { debounce: 300 });

  const districts = data?.features.map(feature => feature.attributes);
  console.log('District example', districts)

  return (
    <Center padding="100px" height="90vh">
      <ScaleFade initialScale={0.9} in={true}>
        <Card variant="rounded" borderColor="blue">
          <Heading>School Data Finder</Heading>

          <FormControl>
            <FormLabel id="DistrictName">District name</FormLabel>
            <Input value={districtName} onChange={e => setDistrictName(e.target.value)}  />
          </FormControl>

          {loading ? <Spinner /> : <>Found {districts?.length} districts</>}
        </Card>
      </ScaleFade>
    </Center>
  );
};

export default Home;
