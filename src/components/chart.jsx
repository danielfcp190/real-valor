import { useContext, useState } from "react";
import Chart from "react-apexcharts";
import { DataContext } from "../App";
import { Select } from "@chakra-ui/react";
import styled from "styled-components";

export default function ChartComponent() {
  const { data, crypto, setCrypto, setDateRange } = useContext(DataContext);
  const [portfolio, setPortfolio] = useState("cryptoPrice");
  const [dateFocus, setDateFocus] = useState(false);

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
          <option value="portfolio2k">R$ 2000.00</option>
          <option value="portfolio10k">R$ 10,000.00</option>
        </SelectField>
        <DateField>
          {!dateFocus && <Label id="date">Enter the investment Date</Label>}

          <DateFieldInput
            name="date"
            type={!dateFocus ? "text" : "date"}
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
    </Container>
  );
}

const Container = styled.div`
  height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
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
`;

const Label = styled.label`
  padding-top: 0.5rem;
  position: absolute;
`;

const SelectField = styled(Select)``;

const ChartWrapper = styled.div`
  margin-top: 2rem;
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
