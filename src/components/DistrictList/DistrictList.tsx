import { Box, Text } from '@chakra-ui/react';
import { NCESDistrictFeatureAttributes } from '~utils/nces';
import { useNavigate } from 'react-router-dom';

type DistrictListProps = {
  districts: NCESDistrictFeatureAttributes[];
};

export function DistrictList(props: DistrictListProps): React.ReactElement {
  const { districts } = props;

  const navigate = useNavigate();

  return (
    <Box width="100%" borderWidth={1} borderRadius="xl" overflow="hidden">
      {districts.map((district) => (
        <Box
          borderBottomWidth={1}
          p={4}
          _last={{ borderBottomWidth: 0 }}
          _hover={{ backgroundColor: 'blackAlpha.50', cursor: 'pointer' }}
          onClick={() => navigate(`/districts/${district.LEAID}`)}
        >
          <Text>{district.NAME}</Text>
        </Box>
      ))}
    </Box>
  );
}
