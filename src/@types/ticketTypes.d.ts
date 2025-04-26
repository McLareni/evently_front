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
