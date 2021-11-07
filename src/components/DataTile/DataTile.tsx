import { Stack, Text } from '@chakra-ui/react';

type DataTileProps = {
  value: React.ReactNode;
  label: React.ReactNode;
  afterValue?: React.ReactNode;
};

export function DataTile(props: DataTileProps): React.ReactElement {
  return (
    <Stack borderWidth={1} borderRadius="xl" minWidth="90px" p={4} align="center" backgroundColor="white" flexGrow={1}>
      <Text fontWeight="medium" fontSize={22}>
        {props.value}
      </Text>

      <Text textTransform="uppercase" fontSize={10} fontWeight="bold">
        {props.label}
      </Text>

      {props.afterValue}
    </Stack>
  );
}
