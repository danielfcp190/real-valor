import { Select } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../App";

export default function Simulation() {
  const { data, setCrypto, setDateRange } = useContext(DataContext);
  const [dateFocus, setDateFocus] = useState(false);
  const [amountFocus, setAmountFocus] = useState(false);
  const [results, setResults] = useState(false);

  const [info, setInfo] = useState({
    date: "",
    amount: "",
  });

  function handleChange(e) {
    setInfo((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    setDateRange(
      Math.floor((new Date() - new Date(info.date)) / (1000 * 3600 * 24)) - 1
    );
  }

  const totalAmountToday =
    info.amount !== ""
      ? data.reduce((a, b) => a * b.rentability, info.amount).toFixed(2)
      : null;

  const accumulatedProfitability =
    totalAmountToday !== null
      ? (totalAmountToday - info.amount).toFixed(2)
      : null;

  function handleClear() {
    setInfo({
      date: "",
      amount: "",
    });
    setResults(!results);
  }

  function handleInfo(e) {
    setResults(!results);
    e.preventDefault();
  }

  return (
    <FormContainer onSubmit={handleInfo} onReset={handleClear}>
      <Title>Simulate your Crypto Investment:</Title>
      <Field>
        <Label
          htmlFor="date"
          style={
            dateFocus || info.date.length > 0
              ? {
                  fontSize: "0.9rem",
                  marginTop: "-0.6rem",
                  transition: "linear 0.1s",
                }
              : { transition: "linear 0.1s" }
          }
        >
          Investment Date
        </Label>
        <InputDate
          type={dateFocus || info.date.length > 0 ? "date" : "text"}
          name="date"
          value={info.date}
          onChange={handleChange}
          onFocus={() => setDateFocus(true)}
          onBlur={() => setDateFocus(false)}
          required
          max={new Date().toISOString().slice(0, -14)}
        />
      </Field>

      <Field>
        <Label
          htmlFor="amount"
          style={
            amountFocus || info.amount.length > 0
              ? {
                  fontSize: "0.9rem",
                  marginTop: "-0.6rem",
                  transition: "linear 0.1s",
                }
              : { transition: "linear 0.1s" }
          }
        >
          Initial amount
        </Label>
        <CurrencySymbol
          style={
            amountFocus || info.amount !== ""
              ? { display: "block" }
              : { display: "none" }
          }
        />
        <InputField
          type="number"
          name="amount"
          value={info.amount}
          onChange={handleChange}
          onFocus={() => setAmountFocus(true)}
          onBlur={() => setAmountFocus(false)}
          required
        />
      </Field>

      <Field>
        <DropDown
          placeholder="Crypto"
          onChange={(e) => setCrypto(e.target.value)}
        >
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="LUNA">Terra</option>
          <option value="XRP">XRP</option>
          <option value="BNB">Binance Coin</option>
        </DropDown>
      </Field>

      {results && (
        <Field>
          <Label
            htmlFor="totalToday"
            style={{
              fontSize: "0.9rem",
              marginTop: "-0.6rem",
              transition: "linear 0.1s",
            }}
          >
            Total Amount Today
          </Label>
          <CurrencySymbol />
          <InputField
            type="number"
            name="totalToday"
            value={totalAmountToday}
            readOnly
          />
        </Field>
      )}

      {results && (
        <Field>
          <Label
            htmlFor="accumulated"
            style={{
              fontSize: "0.9rem",
              marginTop: "-0.6rem",
              transition: "linear 0.1s",
            }}
          >
            Accumulated Profitability
          </Label>
          <CurrencySymbol />
          <InputField
            type="number"
            name="accumulated"
            value={accumulatedProfitability}
            readOnly
          />
        </Field>
      )}

      <Param>All the fields are required.</Param>

      {results ? (
        <SubmitButton type="reset" value="CLEAR" />
      ) : (
        <SubmitButton type="submit" value="SIMULATE" />
      )}
    </FormContainer>
  );
}

const FormContainer = styled.form`
  max-width: 60rem;
  height: auto;
  margin: 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #4081ec;
  border: 1px solid black;
  /* box-shadow: inset 0 0 5px black; */
  font-family: "Montserrat", sans-serif;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  margin-left: 1rem;
  @media (max-width: 425px) {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 1rem;
  }
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
`;

const InputDate = styled.input`
  width: 100%;
  height: 3rem;
  background-color: transparent;
  border: 1px solid black;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 1rem 0;
  padding-left: 0.9rem;
  padding-inline-end: 0.4rem;
  padding-top: 1.2rem;
  z-index: 1;
  display: block;
  &:focus {
    outline: none;
    border: 2px solid #ffcc00;
  }
`;
const InputField = styled.input`
  width: 100%;
  height: 3rem;
  background-color: #4081ec;
  background-color: transparent;
  border: 1px solid black;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 1rem 0;
  padding-left: 2.3rem;
  padding-top: 1.2rem;
  z-index: 1;
  display: block;
  &:focus {
    outline: none;
    border: 2px solid #ffcc00;
  }
`;

const DropDown = styled(Select)`
  cursor: pointer;
  width: 100% !important;
  height: 48px !important;
  color: #ffcc00 !important;
  border: 1px solid black !important;
  border-radius: 0 !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 400 !important;
  font-size: 1.5rem !important;
  line-height: 1.5rem !important;

  padding-left: 0.9rem !important;
  margin: 1rem 0 !important;
  &:focus {
    outline: none !important;
    border: 2px solid #ffcc00 !important;
  }
  option {
    color: black;
  }
`;

const CurrencySymbol = styled.span`
  position: relative;
  &:before {
    position: absolute;
    top: 2.4rem;
    padding-left: 0.4rem;
    content: "R$";
    left: 5px;
  }
`;

const Label = styled.label`
  position: absolute;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5px;
  color: #ffcc00;
  padding: 2.5rem 1rem;
`;

const Param = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0 auto;
`;

const SubmitButton = styled.input`
  width: 15rem;
  height: 3rem;
  margin: 1rem auto;
  background-color: #ffcc00;
  border-radius: 5rem;
  font-weight: 500;
  font-size: 1.3rem;
  cursor: pointer;
  &:active {
    transform: scale(0.95, 0.95);
    transition: linear 0.1s;
  }
`;
