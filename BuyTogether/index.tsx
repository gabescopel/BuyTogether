import React, { useEffect, useState } from "react";
import { useProduct } from "vtex.product-context";
import { useDevice } from "vtex.device-detector";
import { ProductSummaryTogether } from "./ProductSummaryTogether";
import { BuyBoxTogether } from "./BuyBoxTogether";
import { Product } from "../../typings/global";
import { formatPrice } from "../../utils";
import { baseClass } from "../../utils/baseClass";

function mapSKUItems(products: Product[] | any) {
  const productsFilter = products.map((el: Product) => {
    const items = el.items
    if(!items.length) return;

    const sellers = items[0].sellers;
    if(!sellers.length) return;

    const listPrice = sellers[0].commertialOffer.ListPrice;
    const price = sellers[0].commertialOffer.Price;

    const item = {
      id: items[0]?.itemId,
      productId: el?.productId,
      ean: items[0]?.ean,
      imageUrl: items[0]?.images[0].imageUrl,
      skuName: items[0]?.name,
      name: el?.productName,
      quantity: 1,
      seller: items[0]?.sellers[0].sellerId.toString(),
      listPrice: listPrice,
      price: price,
    };

    return item;
  });

  return productsFilter;
}

export const CompreJunto = () => {
  const [productList, setProductList] = useState<Product[] | any>([]);
  const [selectedItems, setSelectedItems] = useState<Product[] | any>([]);

  const { product } = useProduct() as any;

  const { isMobile } = useDevice();

  const productItems = product.items;
  let itemImages = productItems.find((el: any) => el.images).images ?? [];
  let summaryImage = itemImages.find((el: any) => el.imageUrl)?.imageUrl ?? '';

  let sellers = productItems.find((el: any) => el.sellers)?.sellers ?? [];
  let commertialOffer = sellers.find((el: any) => el.commertialOffer)?.commertialOffer ?? [];

  const listPrice = commertialOffer && commertialOffer.ListPrice;
  const priceBuy = commertialOffer && commertialOffer.Price;

  const item = {
    id: productItems && productItems.length > 0 ? productItems[0]?.itemId : '',
    productId: product?.productId,
    ean: productItems && productItems.length > 0 ? productItems[0]?.ean : '',
    imageUrl: productItems && productItems.length > 0 ? productItems[0]?.images[0].imageUrl : '',
    skuName: productItems && productItems.length > 0 ? productItems[0]?.name : '',
    name: product?.productName,
    quantity: 1,
    seller: productItems && productItems.length > 0 ? productItems[0]?.sellers[0].sellerId.toString() : '',
    listPrice: listPrice,
    price: priceBuy,
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!product?.productId) return;
      try {
        const response =
          await fetch(`/api/catalog_system/pub/products/crossselling/showtogether/${product.productId}`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
          data.length && setProductList(data);

        const filterItemsSku = mapSKUItems(data);
          filterItemsSku.push(item);

        filterItemsSku && setSelectedItems(filterItemsSku);
      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [product?.productId]);

  if(!productList.length) return <></>;

  const styleDevice = isMobile ? {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '0',
    margin: '0',
    gap: '.5rem',
    listStyle: 'none',
  } : {
    display: 'flex',
    gap: '.5rem',
    padding: '0',
    margin: '0',
    listStyle: 'none',
  };

  return (
    <ul className={`${baseClass}BuyTogheter`} style={styleDevice}>
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
            disabled
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              filter: 'grayscale(.5)',
              padding: 0,
            }}
          >
            <span>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" fill="#4A9796"/>
                <rect width="32" height="32" rx="2" transform="matrix(1 0 0 -1 0 32)" fill="#4A9796"/>
                <path d="M8.5332 17.4932L12.6814 23.4665L23.4665 8.5332" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <img
            width={isMobile ? '179' : '218'}
            height='auto'
            src={summaryImage}
            alt={product.productName}
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
              {product.productName}
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

      {productList && productList.map((el: Product) => (
        <ProductSummaryTogether
          key={el.productId}
          productItem={el}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ))}

      <BuyBoxTogether productList={productList} selectedItems={selectedItems}/>
    </ul>
  );
};

export default CompreJunto;
