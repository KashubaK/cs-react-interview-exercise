import React from 'react';
import { Box } from '@chakra-ui/react';
import Logo from '../header_logo.png';

export const HEADER_HEIGHT = '80px';

const Header: React.FC = ({ children }) => {
  return (
    <Box
      className="cs-header"
      position="fixed"
      top="0"
      right="0"
      left="0"
      width="100vw"
      height={HEADER_HEIGHT}
      display="flex"
      justifyContent="center"
    >
      <a href="https://characterstrong.com">
        <img className="header-img" src={Logo} alt="CharacterStrong Logo" />
      </a>
      {children}
    </Box>
  );
};

export default Header;
