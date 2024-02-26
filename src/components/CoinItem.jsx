import { useEffect, useState } from "react";
import { getWalletValue, portfolio, updateWalletValue, crypto } from "../data";
import { Card, Button, Modal, Slider, InputNumber } from "antd";

export default function CoinItem({ coin, setBalance }) {
  const [inputValue, setInputValue] = useState(0.01);
  const [disabled, setDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const result = crypto.result.find(({ id }) => id === coin.id);
  const sellPrice = (inputValue * result.price).toFixed(2);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleOk = () => {
    const currentBalance = getWalletValue();
    const coinIndex = portfolio.findIndex((c) => c.id === coin.id);
    portfolio[coinIndex].amount -= inputValue;
    portfolio[coinIndex].totalPrice -= parseFloat(sellPrice);

    if (portfolio[coinIndex].amount <= 0) {
      portfolio.splice(coinIndex, 1);
    }

    const newBalance = updateWalletValue(+currentBalance + parseFloat(sellPrice));
    setBalance(newBalance);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        title={result?.name}
        bordered={true}
        style={{
          width: 300,
          marginRight: 15,
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <img style={{ width: 55 }} src={result?.icon} alt="" />
          </div>
          <div>
            <p>
              Amount: <span style={{ fontWeight: 700 }}>{(coin.amount).toFixed(2)}</span>
            </p>
            <p>
              Total $:{" "}
              <span style={{ fontWeight: 700 }}>
                {(coin.amount * result?.price).toFixed(2)}
              </span>
            </p>
          </div>
          <Button onClick={showModal}>Sell</Button>
        </div>
      </Card>

      <Modal
        title="Sell Coin"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputNumber
          value={inputValue}
          onChange={onChange}
          min={0.01}
          max={coin.amount}
          step={0.01}
        />
        <Slider
          value={typeof inputValue === "number" ? inputValue : 0}
          onChange={onChange}
          min={0.01}
          max={coin.amount}
          step={0.01}
          disabled={disabled}
        />
        <p>Sell for: {sellPrice}</p>
      </Modal>
    </>
  );
}
