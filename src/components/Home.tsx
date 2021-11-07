import React from 'react';
import {
  Center,
  ScaleFade,
} from '@chakra-ui/react';
import { DistrictSearchCard } from "@components/DistrictSearchCard/DistrictSearchCard";

function Home() {
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <DistrictSearchCard />
    </ScaleFade>
  );
};

export default Home;
