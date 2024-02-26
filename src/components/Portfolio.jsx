import { portfolio, crypto } from "../data";
import CoinItem from "./CoinItem";
import EmptyPotrfolio from "./EmptyPortfolio";
import PortfolioChart from "./PortfolioChart";

export default function Portfolio(props) {
  return (
    <>
      <div>
        <h2>
          PORTFOLIO: {portfolio
            .map((portfolioCoin) => {
              const coin = crypto.result.find((c) => c.id === portfolioCoin.id);
              return portfolioCoin.amount * coin.price;
            })
            .reduce((acc, v) => acc + v, 0)
            .toFixed(2)}
          ${" "}
        </h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        { portfolio.length === 0 ? <EmptyPotrfolio/> : portfolio.map((coin) => (
          <CoinItem key={coin.id} coin={coin} setBalance={props.setBalance} />
        )) }
       
      </div>
      <PortfolioChart />
    </>
  );
}
