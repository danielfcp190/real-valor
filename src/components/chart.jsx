import { useContext, useState } from "react";
import Chart from "react-apexcharts";
import { DataContext } from "../App";
import { Select } from "@chakra-ui/react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import questionMark from "./images/question-mark.png";

export default function ChartComponent() {
  const { data, crypto, setCrypto, setDateRange } = useContext(DataContext);
  const { width } = useWindowSize();
  const [portfolio, setPortfolio] = useState("cryptoPrice");
  const [dateFocus, setDateFocus] = useState(false);
  const [infoHover, setInfoHover] = useState(false);

  let portfolio2k = 2000;
  let portfolio2kArray = [];
  let portfolio10k = 10000;
  let portfolio10kArray = [];

  for (let i = 0; i < data.length; i++) {
    portfolio2k = portfolio2k * data[i].rentability;
    portfolio2kArray = [
      ...portfolio2kArray,
      { date: data[i].date, yield: portfolio2k.toFixed(2) },
    ];
    portfolio10k = portfolio10k * data[i].rentability;
    portfolio10kArray = [
      ...portfolio10kArray,
      { date: data[i].date, yield: portfolio10k.toFixed(2) },
    ];
  }

  const options = {
    chart: {
      id: "cryptoCurrency",
    },
    xaxis: {
      categories:
        portfolio === "cryptoPrice"
          ? data.map((item) => item.date)
          : portfolio === "portfolio2k"
          ? portfolio2kArray.map((item) => item.date)
          : portfolio === "portfolio10k" &&
            portfolio10kArray.map((item) => item.date),
    },
  };

  const series = [
    {
      name: `${crypto} BRL`,
      data:
        portfolio === "cryptoPrice"
          ? data.map((item) => item.close)
          : portfolio === "portfolio2k"
          ? portfolio2kArray.map((item) => item.yield)
          : portfolio === "portfolio10k" &&
            portfolio10kArray.map((item) => item.yield),
    },
  ];

  return (
    <Container>
      <SelectWrapper>
        <SelectField
          placeholder="Select Crypto Currency"
          onChange={(e) => {
            setCrypto(e.target.value);
          }}
        >
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="LUNA">Terra</option>
          <option value="XRP">XRP</option>
          <option value="BNB">Binance Coin</option>
        </SelectField>
        <SelectField
          placeholder="Select portfolio initial value (BRL)"
          onChange={(e) => {
            setPortfolio(e.target.value);
          }}
        >
          <option value="cryptoPrice">Crypto Price</option>
          <option value="portfolio2k">R$ 2,000.00</option>
          <option value="portfolio10k">R$ 10,000.00</option>
        </SelectField>
        <DateField>
          {!dateFocus && <Label id="date">Enter the investment Date</Label>}

          <DateFieldInput
            name="date"
            type={!dateFocus || width < 1024 ? "text" : "date"}
            placeholder={dateFocus && width < 1024 ? "mm/dd/yyyy" : null}
            pattern={
              dateFocus && width < 1024
                ? "(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])dd$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"
                : null
            }
            onChange={(e) =>
              setDateRange(
                Math.floor(
                  (new Date() - new Date(e.target.value)) / (1000 * 3600 * 24)
                ) - 1
              )
            }
            required
            max={new Date().toISOString().slice(0, -14)}
            onFocus={() => setDateFocus(true)}
          />
        </DateField>
      </SelectWrapper>

      <ChartWrapper>
        <Subtitle>
          {crypto} since {data.length > 0 && data[0].date}
        </Subtitle>
        <LineChart options={options} series={series} type="line" height={400} />
      </ChartWrapper>

      <img
        src={questionMark}
        alt="question mark"
        width={50}
        height={50}
        onMouseEnter={() => setInfoHover(!infoHover)}
        onMouseLeave={() => setInfoHover(!infoHover)}
      />
      {infoHover ||
        width <
          1024(
            <HelpText>
              This application aims to help investors analyze the profitability
              of the top 5 cryptocurrencies based on their history.
              <br /> The investor can choose the graphical analysis ("chart"
              route), in which he chooses the cryptocurrency, the initial value
              of the portfolio (R$ 2000 or R$ 10,000) or price of the currency
              and the initial date of the investment.
              <br /> The inline chart automatically updates according to your
              choices. <br /> The investor can also choose to simulate an
              investment ("Simulation" route), in which he informs the date the
              investment was made, the initial amount and the chosen currency.
            </HelpText>
          )}
    </Container>
  );
}

const Container = styled.div`
  height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  @media (max-width: 425px) {
    padding: 2rem 1rem;
  }
`;

const HelpText = styled.div`
  margin-top: 1rem;
`;
const SelectWrapper = styled.div`
  max-width: 35rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DateField = styled.div`
  padding-inline-end: 0.4rem;
  width: 100%;
  min-width: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  transition-property: var(--chakra-transition-property-common);
  transition-duration: var(--chakra-transition-duration-normal);
  background: inherit;
  padding-bottom: 1px;
  line-height: var(--chakra-lineHeights-normal);
  font-size: var(--chakra-fontSizes-md);
  padding-inline-start: var(--chakra-space-4);
  height: var(--chakra-sizes-10);
  border-radius: var(--chakra-radii-md);
  border: 1px solid;
  border-color: inherit;
`;

const DateFieldInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  position: relative;
  z-index: 1;
  background-color: transparent;
`;

const Label = styled.label`
  padding-top: 0.5rem;
  position: absolute;
`;

const SelectField = styled(Select)``;

const ChartWrapper = styled.div`
  margin: 1rem 0;
  width: auto;
  position: relative;
  overflow: auto;
`;

const Subtitle = styled.p`
  text-align: end;
  width: 70rem;
  @media (max-width: 1024px) {
    width: 50rem;
  }
`;

const LineChart = styled(Chart)`
  width: 70rem;
  @media (max-width: 1024px) {
    width: 50rem;
  }
`;
