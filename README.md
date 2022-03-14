// Introduction:

This application aims to help investors analyze the profitability of the top 5 cryptocurrencies based on their history.

The investor can choose the graphical analysis ("chart" route), in which he chooses the cryptocurrency, the initial value of the portfolio (R$ 2000 or R$ 10,000) or price of the currency and the initial date of the investment. The inline chart automatically updates according to your choices.

The investor can also choose to simulate an investment ("Simulation" route), in which he informs the date the investment was made, the initial amount and the chosen currency.

// Technical information:

This application was made in React, using the Node version v14.19.0.
Responsive for different screen sizes.

Date input of HTML5 is not supported for Safari in IOS, so I used useWindowSize hook from "https://usehooks.com/useWindowSize/" to discovery the screen size of the user and switch between input type date for desktop and input type text with placeholder and pattern for devices under or equal 1024 pixels.

// Libraries used:

chakra-ui;
apexcharts;
axios;
react-router-dom;
styled-components;
