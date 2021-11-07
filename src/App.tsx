import Header, { HEADER_HEIGHT } from '~components/Header';
import Home from '~components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DistrictDetailPage } from '~pages/DistrictDetailPage/DistrictDetailPage';
import { Container } from '@chakra-ui/react';
import { Globs } from '~components/Globs/Globs';
import { SchoolDetailPage } from '~pages/SchoolDetailPage/SchoolDetailPage';

function App(): React.ReactElement {
  return (
    <div className="App">
      <Header />
      <Globs />

      <Container
        width="4xl"
        maxWidth="100%"
        zIndex={1}
        marginTop={HEADER_HEIGHT}
        minHeight={`calc(100vh - ${HEADER_HEIGHT})`}
        paddingTop={20}
        paddingBottom={20}
      >
        <BrowserRouter basename="/cs-react-interview-exercise">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/districts/:districtId" element={<DistrictDetailPage />} />
            <Route path="/districts/:districtId/schools/:schoolId" element={<SchoolDetailPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
