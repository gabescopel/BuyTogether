import React from 'react';
import { useDevice } from 'vtex.device-detector';
import { formatPrice } from '../../utils';
import { baseClass } from '../../utils/baseClass';
import { Product, ICartItem } from '../../typings/global';
interface ProductSummaryTogether {
  productItem: Product,
  setProductList?: any,
  selectedItems: ICartItem[],
  setSelectedItems: any,
}

function updateProductLists(hasItemList: any, selectedItems: any, item: any, setSelectedItems: any) {

  if(hasItemList) {
    const toUpdateList = selectedItems.filter((el: any) => el.productId !== hasItemList.productId)
    setSelectedItems(toUpdateList)
  } else {
    setSelectedItems([...selectedItems, item])
  }
}

export const ProductSummaryTogether = ({
  productItem,
  selectedItems,
  setSelectedItems
}: ProductSummaryTogether) => {
  const { isMobile } = useDevice();

  const items = productItem.items;
  let itemImages = items.find((el: any) => el.images).images ?? [];
  let summaryImage = itemImages.find((el: any) => el.imageUrl)?.imageUrl ?? '';

  let sellers = items.find((el: any) => el.sellers)?.sellers ?? [];
  let commertialOffer = sellers.find((el: any) => el.commertialOffer)?.commertialOffer ?? [];

  const listPrice = commertialOffer && commertialOffer.ListPrice;
  const priceBuy = commertialOffer && commertialOffer.Price;

  const item = {
    id: items && items.length > 0 ? items[0]?.itemId : '',
    productId: productItem?.productId,
    ean: items && items.length > 0 ? items[0]?.ean : '',
    imageUrl: items && items.length > 0 ? items[0]?.images[0].imageUrl : '',
    skuName: items && items.length > 0 ? items[0]?.name : '',
    name: productItem?.productName,
    quantity: 1,
    seller: items && items.length > 0 ? items[0]?.sellers[0].sellerId.toString() : '',
    listPrice: listPrice,
    price: priceBuy,
  };

  const hasItemList = selectedItems && selectedItems?.find((el: any) => el.productId === item.productId);

  return (
    <>
      <li
        className={`${baseClass}together-card`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ededed'
        }}
      >
        <div style={{ borderBottom: '1px solid #ededed' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
            onClick={() => updateProductLists(hasItemList, selectedItems, item, setSelectedItems)}
          >
            { hasItemList ?
              <span>
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="4" fill="#4A9796"/>
                  <rect width="32" height="32" rx="2" transform="matrix(1 0 0 -1 0 32)" fill="#4A9796"/>
                  <path d="M8.5332 17.4932L12.6814 23.4665L23.4665 8.5332" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              :
              <span>
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="14" height="14" rx="1.5" fill="white"/>
                  <rect x="0.5" y="0.5" width="14" height="14" rx="1.5" stroke="#BBBBBB"/>
                </svg>
              </span>
            }
          </button>
          <img
            width={isMobile ? '179' : '218'}
            height='auto'
            src={summaryImage}
            alt={productItem.productName}
            />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '.5rem',
          backgroundColor: '#f7f7f7',
          height: '100%'
        }}>
          <h3 style={isMobile ? {fontSize: '.75rem', marginTop: 0,} : {fontSize: '1rem', marginTop: 0,}}>
            <span>
              {productItem.productName}
            </span>
          </h3>
          <div>
            { listPrice > priceBuy &&
              <span style={{textDecoration: 'line-through'}}>
                R$ {formatPrice(listPrice)}
              </span> }
            <span>
              R$ {formatPrice(priceBuy)}
            </span>
          </div>
        </div>
      </li>
    </>
  )
}
