import { Box } from '@chakra-ui/react';
import Glob from '~components/design/Glob';
import { theme } from '~theme/index';
import React from 'react';

export function Globs() {
  return (
    <Box overflow="hidden" className="globParent" position="absolute" width="100vw" height="100%" minHeight="100vh">
      <Glob
        size={['60%', '60%']}
        speed={30}
        globSizes={[
          [60, 65],
          [70, 80],
          [30, 75],
        ]}
        left="0%"
        top="10%"
        opacity={0.5}
        color={theme.colors.brand.green}
      />
      <Glob size={['600px', '600px']} left="-50px" top="-20px" color={theme.colors.brand.green} />
      <Glob
        size={['60%', '60%']}
        speed={30}
        globSizes={[
          [50, 90],
          [80, 35],
          [50, 50],
        ]}
        left="80%"
        bottom="-50%"
        opacity={0.5}
        color={theme.colors.brand.darkBlue}
      />
      <Glob
        size={['60%', '70%']}
        speed={30}
        globSizes={[
          [80, 55],
          [50, 50],
          [50, 90],
        ]}
        left="80%"
        bottom="-50%"
        opacity={0.5}
        color={theme.colors.brand.blue}
      />
    </Box>
  );
}
