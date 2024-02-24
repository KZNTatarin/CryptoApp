import { crypto } from "../data"
import CoinInfoItem from "./CoinInfoItem"

const coins = crypto.result

export default function Info() {
    return (
        <>
            <div style={{}}>
            {coins.map((coin) => (<CoinInfoItem key={coin.id} coin={coin}/>))}
            </div>
        </>
    )
}