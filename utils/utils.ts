import {IItem} from '../typings/global';
import {ICartItem} from '../typings/global';
import {ISuggestedList} from '../typings/global';

export const mapSKUItemsToCartItems = (
  skuItems: IItem[]
): Array<ICartItem | null> =>
  skuItems.map(item => {
    const {
      selectedItem: {
        itemId,
        name,
        measurementUnit,
        images,
        referenceId,
        seller,
        sellers,
      },
      product: {
        productId,
        linkText,
        productName,
        brand,
        categories,
        productReference,
      },
    } = item
    const selectedSeller = seller ?? sellers[0]

    if (!selectedSeller) {
      return null
    }

    return {
      id: itemId,
      productId,
      quantity: 1,
      uniqueId: '',
      detailUrl: `/${linkText}/p`,
      name: productName,
      brand,
      category: categories && categories.length > 0 ? categories[0] : '',
      productRefId: productReference,
      seller: selectedSeller.sellerId,
      variant: name,
      skuName: name,
      price: selectedSeller.commertialOffer.PriceWithoutDiscount * 100,
      listPrice: selectedSeller.commertialOffer.ListPrice * 100,
      sellingPrice: selectedSeller.commertialOffer.Price * 100,
      sellingPriceWithAssemblies: selectedSeller.commertialOffer.Price * 100,
      measurementUnit,
      skuSpecifications: [],
      imageUrl: images[0]?.imageUrl,
      options: [],
      assemblyOptions: {
        added: [],
        removed: [],
        parentPrice: selectedSeller.commertialOffer.Price,
      },
      referenceId,
    }
  })

  export const sortItemsByLists = (
    items: IItem[],
    suggestedLists: ISuggestedList[]
  ) => {
    const ids = suggestedLists.map(list => list.products[list.current].productId)
    const copyItems: IItem[] = Object.assign([], items)
    return copyItems.sort(
      (a: IItem, b: IItem) =>
        ids.indexOf(a.product.productId) - ids.indexOf(b.product.productId)
    )
  }

  export function formatPrice(value: number) {
    let price =
      Math.round(value).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    return price;
  }
