export interface Product {
  brand: string
  brandId: number
  cacheId: string
  categories?: string[]
  clusterHighlights?: Array<{ id: string; name: string }>
  categoryTree?: Array<{ slug: string }>
  description?: string
  items: SKU[]
  link: string
  linkText: string
  priceRange: ProductPriceRange
  productClusters?: Array<{ id: string; name: string }>
  productId: string
  productName: string
  productReference: string
  properties?: Array<{ name: string; values: string[] }>
  sku?: SKU
  specificationGroups: SpecificationGroup[]
}

export interface ProductPriceRange {
  sellingPrice: PriceRange
  listPrice: PriceRange
}

export interface IPriceRange {
  highPrice: number
  lowPrice: number
}

export interface ISpecificationGroupProperty {
  originalName: string
  name: string
  values: string[]
}

export interface ISpecificationGroup {
  name?: string
  originalName?: string
  specifications?: SpecificationGroupProperty[]
}

export interface IItem {
  quantity: number
  product: Product
  selectedItem: SKU
}

export interface ICartItem {
  id: string
  productId: string
  quantity: number
  uniqueId: string
  detailUrl: string
  name: string
  brand: string
  category: string
  productRefId: string
  seller: string
  variant: string
  skuName: string
  price: number
  listPrice: number
  sellingPrice: number
  sellingPriceWithAssemblies: number
  measurementUnit: string
  skuSpecifications: any[]
  imageUrl: string
  options: any[]
  assemblyOptions: {
    added: any[]
    removed: any[]
    parentPrice: number
  }
  referenceId: Array<{
    Key: string
    Value: string
  }> | null
}

export interface ISKU {
  complementName?: string
  ean?: string
  image?: Image
  images: Image[]
  itemId: string
  measurementUnit: string
  name: string
  nameComplete?: string
  referenceId: Array<{
    Key: string
    Value: string
  }> | null
  seller?: Seller
  sellers: Seller[]
  unitMultiplier?: number
  variations: Array<{ name: string; values: string[] }>
}

export interface IImage {
  cacheId?: string
  imageId?: string
  imageLabel: string | null
  imageTag?: string
  imageUrl: string
  imageText?: string | null
}

export interface ISeller {
  addToCartLink?: string
  commertialOffer: CommertialOffer
  sellerId: string
  sellerDefault?: boolean
  sellerName?: string
}

export interface ICommertialOffer {
  AvailableQuantity: number
  Installments: Installment[]
  ListPrice: number
  Price: number
  PriceWithoutDiscount: number
  RewardValue?: number
  Tax: number
  discountHighlights?: Array<{ name: string }>
  spotPrice?: number
  taxPercentage: number
  teasers?: Array<{ name: string }>
}

export interface IInstallment {
  InterestRate: number
  Name: string
  NumberOfInstallments: number
  PaymentSystemName?: string
  TotalValuePlusInterestRate: number
  Value: number
}

export interface ISpecificationFilter {
  id: string
  value: string
}

export interface ISuggestedProductsList {
  baseProductId: string
  suggestedProductsIds?: string
  category?: string
  specificationFilters?: SpecificationFilter[]
  collection?: string
  orderBy?: string
  hideUnavailableItems?: boolean
  maxItems?: number
  skusFilter?: string
  installmentCriteria?: string
}

export interface IRecommendedList {
  base: Product[]
  recommended: Product[]
}

export interface ISuggestedList {
  products: Product[]
  hidden: boolean
  current: number
}
