import React from 'react';
import { Box } from '@chakra-ui/react';
import Logo from '../header_logo.png';
import Glob from './design/Glob';
import { theme } from '@theme/index';

export const HEADER_HEIGHT = '80px';

const Header: React.FC = ({ children }) => {
  return (
    <>
      <Box overflow="hidden" className="globParent" position="absolute" width="100vw" height="100%" minHeight="100vh" >
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
      </Box>
      <Box className="cs-header" position="fixed" top="0" right="0" left="0" width="100vw" height={HEADER_HEIGHT}>
        <a href="https://characterstrong.com">
          <img className="header-img" src={Logo} alt="CharacterStrong Logo" />
        </a>
        {children}
      </Box>
    </>
  );
};

export default Header;
