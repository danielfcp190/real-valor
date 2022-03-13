import React, { useState, createContext, useEffect } from "react";
import Home from "./components/home";
import Simulation from "./components/simulation";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";

export const DataContext = createContext([]);

function App() {
  const [data, setData] = useState([]);
  const [crypto, setCrypto] = useState("BTC");
  const [dateRange, setDateRange] = useState("364");

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await axios(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${crypto}&tsym=BRL&limit=${dateRange}`
        );

        const newArr = await response.data.Data.Data.map((item) => ({
          date: new Date(item.time * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          open: item.open,
          close: item.close,
          rentability: item.close / item.open,
        }));

        setData(await newArr);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    return () => {
      source.cancel();
    };
  }, [crypto, dateRange]);

  console.log(data);

  return (
    <ChakraProvider>
      <DataContext.Provider
        value={{ data, setData, crypto, setCrypto, dateRange, setDateRange }}
      >
        <Router>
          <PageLayout>
            <Nav>
              <NavLinkContainer>
                <NavLink>
                  <Link to="/">Chart</Link>
                </NavLink>
                <NavLink>
                  <Link to="/simulation">Simulation</Link>
                </NavLink>
              </NavLinkContainer>
            </Nav>
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/simulation" element={<Simulation />} />
              </Routes>
            </ContentWrapper>

            <Footer>&#169; Copyright - 2022 All the rights reserved.</Footer>
          </PageLayout>
        </Router>
      </DataContext.Provider>
    </ChakraProvider>
  );
}

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1 1 0%;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  background-color: #4081ec;
  font-family: "Montserrat", sans-serif;
`;
const NavLinkContainer = styled.ul`
  display: flex;
  list-style-type: none;
`;
const NavLink = styled.li`
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 24px;
  color: #ffcc00;
  margin-left: 2rem;
`;

const Footer = styled.div`
  height: 4rem;
  background-color: #4081ec;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
