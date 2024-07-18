/* INPUT */

import { ShopifyCustomerInput } from '@ecommerce/customer/services/shopify/types';
import { ShopifyFulfillmentInput } from '@ecommerce/fulfillment/services/shopify/types';
import { ShopifyFulfillmentOrdersInput } from '@ecommerce/fulfillmentorders/services/shopify/types';
import { ShopifyOrderInput } from '@ecommerce/order/services/shopify/types';
import { ShopifyProductInput } from '@ecommerce/product/services/shopify/types';

/* product */
export type OriginalProductInput = ShopifyProductInput;

/* order */
export type OriginalOrderInput = ShopifyOrderInput;

/* fulfillmentorders */
export type OriginalFulfillmentOrdersInput = ShopifyFulfillmentOrdersInput;

/* customer */
export type OriginalCustomerInput = ShopifyCustomerInput;

/* fulfillment */
export type OriginalFulfillmentInput = ShopifyFulfillmentInput;

export type EcommerceObjectInput =
  | OriginalProductInput
  | OriginalOrderInput
  | OriginalFulfillmentOrdersInput
  | OriginalCustomerInput
  | OriginalFulfillmentInput;

/* OUTPUT */

/* product */
export type OriginalProductOutput = ShopifyProductInput;

/* order */
export type OriginalOrderOutput = ShopifyOrderInput;

/* fulfillmentorders */
export type OriginalFulfillmentOrdersOutput = ShopifyFulfillmentOrdersInput;

/* customer */
export type OriginalCustomerOutput = ShopifyCustomerInput;

/* fulfillment */
export type OriginalFulfillmentOutput = ShopifyFulfillmentInput;

export type EcommerceObjectOutput =
  | OriginalProductOutput
  | OriginalOrderOutput
  | OriginalFulfillmentOrdersOutput
  | OriginalCustomerOutput
  | OriginalFulfillmentOutput;
