import React from 'react';
import { Center, ScaleFade } from '@chakra-ui/react';
import { DistrictSearchPage } from '~pages/DistrictSearchPage/DistrictSearchPage';

function Home() {
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <DistrictSearchPage />
    </ScaleFade>
  );
}

export default Home;
