import React, { useEffect, useState } from "react";
import {
  Select,
  Space,
  Form,
  InputNumber,
  Input,
  Button,
  Modal,
  message,
} from "antd";

import {
  crypto,
  portfolio,
  wallet,
  getWalletValue,
  updateWalletValue,
} from "../data";
const coins = crypto.result;

export default function BuyCoin(props) {
  const [disabled, setDisabled] = useState(true);
  const [selectCoin, setSelectCoin] = useState();
  const [amount, setAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //МОДАЛКА
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //ВЫБОР МОНЕТЫ И КОЛИЧЕСТВО
  function handleSelect(value) {
    console.log(amount);
    const selectedCoin = coins.find((coin) => coin.id === value);
    const price = selectedCoin ? selectedCoin.price : 0;
    amount >= 0.01 && setTotalPrice(price * amount);
    setSelectCoin(value);
    setDisabled(false);
  }

  function handleAmountChange(value) {
    setAmount(value);
    if (selectCoin) {
      const selectedCoin = coins.find((coin) => coin.id === selectCoin);
      const price = selectedCoin ? selectedCoin.price : 0;
      setTotalPrice(price * value);
    }
  }

  // ПОКУПКА МОНЕТ
  function AddCoin() {
    const currentBalance = getWalletValue();
    if (currentBalance >= totalPrice) {
      const buyOjb = {
        id: selectCoin,
        amount: amount,
        totalPrice: totalPrice,
      };

      const newBalance = updateWalletValue(currentBalance - totalPrice);
      props.setBalance(newBalance);

      if (portfolio.find((coin) => coin.id === buyOjb.id)) {

        const index = portfolio.findIndex((coin) => coin.id === buyOjb.id);
        portfolio[index].amount += buyOjb.amount
        portfolio[index].totalPrice += buyOjb.totalPrice;
      } else {
        portfolio.push(buyOjb);
      }

      message.success(`Coin(s) have been added to your portfolio `);
    } else setIsModalOpen(true);
  } 

  return (
    <>
      <Modal
        footer={null}
        onCancel={handleCancel}
        open={isModalOpen}
        onOk={handleOk}
      >
        {" "}
        Не достаточно средств!{" "}
      </Modal>
      <Form>
        <Select
          onSelect={handleSelect}
          style={{
            width: "50%",
            marginBottom: 10,
          }}
          placeholder={"choise the coin"}
          optionLabelProp="label"
          options={coins.map((coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space>
              <img style={{ width: 25 }} src={option.data.icon} alt="" />{" "}
              <span>{option.data.label}</span>
            </Space>
          )}
        />
        <Form.Item label="Amount">
          <InputNumber
            min={0.01}
            defaultValue={0}
            disabled={disabled}
            onChange={handleAmountChange}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            style={{
              width: "50%",
            }}
            disabled
            value={
              selectCoin ? coins.find((c) => c.id === selectCoin).price : ""
            }
          />
        </Form.Item>
        <p>Total Price: </p> <h2>{totalPrice.toFixed(2)} $</h2>
        <Form.Item>
          <Button onClick={AddCoin} disabled={disabled}>
            Buy
          </Button>
        </Form.Item>
      </Form>
      </>
  );
}
