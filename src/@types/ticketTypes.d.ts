interface CustomerInfo {
  userId: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhone: string;
  clientEmail: string;
}

interface ProductInfo {
  product: {
    productName: string;
    productPrice: string;
    productCount: string;
    amount: string;
  };
}

type FullTicketInfo = CustomerInfo & ProductInfo;

type ResponseWithSignature = {
  merchantAccount: string;
  merchantAuthType: string;
  merchantDomainName: string;
  orderReference: string;
  orderDate: string;
  amount: string;
  currency: string;
  orderTimeout: string;
  holdTimeout: string;
  product: {
    productName: string;
    productPrice: string;
    productCount: string;
    amount: string;
  };
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  defaultPaymentSystem: 'VISA';
  serviceUrl: string;
  merchantSignature: string;
};

type BuyTicketUser = Pick<
  User,
  'id' | 'name' | 'surname' | 'email' | 'phoneNumber'
>;

type Ticket = {
  id: 'string';
  orderReference: 'string';
  orderDate: 'string';
  productCount: 'string';
  amount: 'string';
  event: Event;
  status: 'string';
};
