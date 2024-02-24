import { Collapse, Statistic, Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default function CoinInfo({ coin }) {

    function getColor(num) {
        if (num >= 0) {
            true
        } else false
    }
  const items = [
    {
      key: coin.id,
      label: (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img style={{width: 30,}} src={coin.icon} alt="" /> <span style={{margin: '0px 15px', fontWeight: 700, fontSize: 15, }}>{coin.name}</span>
        </div>
      ),
      children: (
        <>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img style={{width: 25,}} src={coin.icon} alt="" /> <span style={{marginLeft: 10, fontSize: 27}}>{coin.symbol}</span>
        </div>
        <div>
            <p style={{fontSize: 20}}> Price: <span style={{fontWeight: 700}}>{(coin.price).toFixed(2)} $</span> </p>
        </div>
        <Card size="default" style={{display: 'inline-block'}} bordered={true}>
        <Statistic
          title="Changes in 1 day"
          value={coin.priceChange1d}
          precision={2}
          valueStyle={{ color: getColor(coin.priceChange1d) ? '#3f8600' :  '#cf1322' }}
          prefix={ getColor(coin.priceChange1d) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        />
        </Card>

        <Card size="default" style={{display: 'inline-block'}} bordered={true}>
        <Statistic
          title="Changes in 1 hour"
          value={coin.priceChange1h}
          precision={2}
          valueStyle={{ color: coin.priceChange1h > 0 ? '#3f8600' :  '#cf1322' }}
          prefix={ coin.priceChange1h > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        />
        </Card>
        <Card size="default" style={{display: 'inline-block'}} bordered={true}>
        <Statistic
          title="Changes in 1 week"
          value={coin.priceChange1w}
          precision={2}
          valueStyle={{ color: coin.priceChange1w > 0 ? '#3f8600' :  '#cf1322' }}
          prefix={coin.priceChange1w > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        />
        </Card>
        </>

      ),
    },
  ];
  console.log(coin);
  return (
    <div style={{margin: '15px 5px'}}>
      <Collapse items={items} />
    </div>
  );
}
