import React from "react";
import { useOrderItems } from 'vtex.order-items/OrderItems';
import { usePixel } from 'vtex.pixel-manager';
import { formatPrice } from "../../utils";
import { baseClass } from "../../utils/baseClass";
import { useDevice } from "vtex.device-detector";

function isDivisibleByTwo(number: number) {
  return number % 2 === 0;
}

export const BuyBoxTogether = ({
  productList,
  selectedItems,
}: any) => {
  const { isMobile } = useDevice();
  const { addItems } = useOrderItems();
  const { push } = usePixel();

  const selectedItemsQuantity = productList.length + 1;

  const { totalPrice, totalListPrice } = selectedItems.reduce((acc: any, obj: any) => {
    acc.totalPrice += obj.price;
    acc.totalListPrice += obj.listPrice;
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
      <li
        className={`${baseClass}buyBox-together`}
        style={ isMobile && isDivisibleByTwo(selectedItemsQuantity) ? { gridColumn: 'span 2 '} : {}}
        >
          <div className={`${baseClass}buyBox-together-container`}>
            { totalListPrice > totalPrice
            ?
            <div className={`${baseClass}buyBox-listPrice`}>
              <span className={`${baseClass}buyBox-listPrice-label`}>De:</span>

              <span className={`${baseClass}buyBox-listPrice-currency`}>
                R$ {formatPrice(totalListPrice)}
              </span>
            </div>
            :
              <></>
            }
            <div className={`${baseClass}buyBox-priceBuy`}>
              <span className={`${baseClass}buyBox-priceBuy-label`}>Total:</span>
              <span className={`${baseClass}buyBox-priceBuy-currency`}>
                R$ {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={() => handleClick(selectedItems)}
              style={{ borderRadius: '0', cursor: 'pointer' }}
              className={`${baseClass}buyBox-buyButton`}
            >
              {
                selectedItemsQuantity > 1
                ?
                `Adicionar ${selectedItemsQuantity} produtos`
                :
                `Adicionar ${selectedItemsQuantity} produto`
              }
              <span>
                <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_5600_1608)">
                  <g clip-path="url(#clip1_5600_1608)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.56452 0.899414C1.26336 0.899414 1.01953 1.14574 1.01953 1.44897C1.01953 1.7522 1.26336 1.99894 1.56452 1.99894H3.00175L5.79479 13.1541H15.5293C15.8305 13.1541 16.0743 12.9082 16.0743 12.6045C16.0743 12.3013 15.8305 12.055 15.5293 12.055H6.64425L6.45359 11.2948H14.6915C15.4276 11.2948 16.0905 10.8205 16.2467 10.079L17.5963 4.73591L17.5984 4.72635C17.8056 3.75975 17.1136 2.75909 16.0415 2.75909H4.31644L3.85121 0.899829H1.5641L1.56452 0.899414ZM4.59184 3.85778L6.17861 10.1953H14.6915C14.9744 10.1953 15.1455 10.0254 15.1817 9.84638L15.1841 9.83268L16.5341 4.48543C16.6006 4.15395 16.363 3.85778 16.0411 3.85778H4.59184ZM5.2091 14.9282C5.20888 14.7342 5.24688 14.542 5.32093 14.3626C5.39499 14.1833 5.50364 14.0203 5.64068 13.8829C5.77773 13.7456 5.94049 13.6366 6.11966 13.5621C6.29884 13.4877 6.49093 13.4492 6.68496 13.449C7.07675 13.4495 7.45233 13.6055 7.7291 13.8828C8.00586 14.1601 8.16115 14.536 8.16082 14.9278C8.1611 15.1218 8.12314 15.3141 8.04911 15.4935C7.97508 15.6729 7.86644 15.8359 7.72939 15.9733C7.59234 16.1107 7.42956 16.2198 7.25036 16.2942C7.07115 16.3687 6.87903 16.4072 6.68496 16.4074C6.49093 16.4072 6.29884 16.3687 6.11966 16.2943C5.94049 16.2198 5.77773 16.1108 5.64068 15.9735C5.50364 15.8361 5.39499 15.6731 5.32093 15.4937C5.24688 15.3144 5.20888 15.1222 5.2091 14.9282ZM6.68496 14.5481C6.63463 14.5477 6.58471 14.5572 6.53805 14.576C6.49139 14.5949 6.44891 14.6228 6.41303 14.6581C6.37715 14.6934 6.34858 14.7354 6.32896 14.7818C6.30933 14.8281 6.29903 14.8779 6.29865 14.9282C6.29865 15.133 6.46689 15.3083 6.68496 15.3083C6.90345 15.3083 7.07127 15.133 7.07127 14.9282C7.07089 14.8779 7.06059 14.8281 7.04097 14.7818C7.02134 14.7354 6.99277 14.6934 6.9569 14.6581C6.92102 14.6228 6.87853 14.5949 6.83187 14.576C6.78521 14.5572 6.73529 14.5477 6.68496 14.5481ZM14.5985 13.449C14.2067 13.4495 13.8311 13.6055 13.5543 13.8828C13.2776 14.1601 13.1223 14.536 13.1226 14.9278C13.1223 15.1218 13.1603 15.3141 13.2343 15.4935C13.3083 15.6729 13.417 15.8359 13.554 15.9733C13.6911 16.1107 13.8539 16.2198 14.0331 16.2942C14.2123 16.3687 14.4044 16.4072 14.5985 16.4074C14.7925 16.4072 14.9846 16.3687 15.1638 16.2943C15.3429 16.2198 15.5057 16.1108 15.6427 15.9735C15.7798 15.8361 15.8884 15.6731 15.9625 15.4937C16.0365 15.3144 16.0745 15.1222 16.0743 14.9282C16.0745 14.7342 16.0365 14.542 15.9625 14.3626C15.8884 14.1833 15.7798 14.0203 15.6427 13.8829C15.5057 13.7456 15.3429 13.6366 15.1638 13.5621C14.9846 13.4877 14.7925 13.4492 14.5985 13.449ZM14.2121 14.9278C14.2121 14.7234 14.38 14.5481 14.5985 14.5481C14.8165 14.5481 14.9848 14.7234 14.9848 14.9282C14.9844 14.9785 14.9741 15.0283 14.9545 15.0746C14.9348 15.121 14.9063 15.163 14.8704 15.1983C14.8345 15.2336 14.792 15.2615 14.7454 15.2804C14.6987 15.2992 14.6488 15.3087 14.5985 15.3083C14.5481 15.3087 14.4982 15.2992 14.4515 15.2804C14.4049 15.2615 14.3624 15.2336 14.3265 15.1983C14.2906 15.163 14.2621 15.121 14.2424 15.0746C14.2228 15.0283 14.2125 14.9781 14.2121 14.9278Z" fill="white"/>
                  </g>
                  </g>
                  <defs>
                  <clipPath id="clip0_5600_1608">
                  <rect width="18" height="16" fill="white" transform="translate(0.328125 0.65332)"/>
                  </clipPath>
                  <clipPath id="clip1_5600_1608">
                  <rect width="18" height="16.6154" fill="white" transform="translate(0.328125 0.345703)"/>
                  </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
      </li>
    </>
  )
}
