import { Box, Center, Container, Flex, Icon, ScaleFade, Spinner, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export type PageProps = {
  breadcrumb?: {
    content: React.ReactNode;
    to: string;
  };

  title: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
};

export function Page(props: PageProps) {
  const { breadcrumb, loading, title, children } = props;

  return (
    <ScaleFade initialScale={0.9} in>
      <Container
        width="4xl"
        maxWidth="100%"
        backgroundColor="whiteAlpha.800"
        p={10}
        borderRadius="xl"
        boxShadow="xl"
        backdropFilter="blur(20px) saturate(180%)"
      >
        {loading && (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}

        <ScaleFade initialScale={0.9} in={!loading}>
          {!loading && (
            <>
              {breadcrumb && (
                <Text as={Link} to={breadcrumb.to} display="flex" align="center">
                  <ChevronLeftIcon fontSize="1.5em" marginLeft="-6px" />
                  {breadcrumb.content}
                </Text>
              )}
              <Text fontSize="3xl" fontWeight="bold" marginBottom={6}>
                {title}
              </Text>

              {children}
            </>
          )}
        </ScaleFade>
      </Container>
    </ScaleFade>
  );
}
