import Header, { HEADER_HEIGHT } from '~components/Header';
import Home from '~components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DistrictDetailPage } from './pages/DistrictDetailPage/DistrictDetailPage';
import { Center, Container } from '@chakra-ui/react';
import { Globs } from '~components/Globs/Globs';

function App() {
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/districts/:districtId" element={<DistrictDetailPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
