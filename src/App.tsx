import Header, { HEADER_HEIGHT } from '@components/Header';
import Home from '@components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DistrictDetailPage } from './pages/DistrictDetailPage/DistrictDetailPage';
import { Center, Container } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Header />

      <Container width="4xl" maxWidth="100%" zIndex={1}>
        <Center width="4xl" height="90vh" maxWidth="100%">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/districts/:districtId" element={<DistrictDetailPage />} />
            </Routes>
          </BrowserRouter>
        </Center>
      </Container>
    </div>
  );
}

export default App;
