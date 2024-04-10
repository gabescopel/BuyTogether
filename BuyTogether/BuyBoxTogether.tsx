import React from "react";
import { useOrderItems } from 'vtex.order-items/OrderItems';
import { usePixel } from 'vtex.pixel-manager';

export const BuyBoxTogether = ({
  selectedItems,
}: any) => {
  const { addItems } = useOrderItems();
  const { push } = usePixel();

  const { totalPrice, totalListPrice } = selectedItems.reduce((acc: any, objeto: any) => {
    acc.totalPrice += objeto.price;
    acc.totalListPrice += objeto.listPrice;
    return acc;
  }, { totalPrice: 0, totalListPrice: 0 });

  function handleClick(arr: any) {
    if (!arr || arr.length === 0) return;

    addItems(arr);
    push({
      event: "addToCart",
      id: "add-to-cart-button"
    });
  };

  return (
    <>
      <li>
        { totalListPrice > totalPrice ? <span>{totalListPrice}</span> : <></> }
        <span> {totalPrice} </span>
        <button
          onClick={() => handleClick(selectedItems)}
          style={{ borderRadius: '0' }}
        >
          ADICIONAR
        </button>
      </li>
    </>
  )
}
