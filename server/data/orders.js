const orders = [
  {
    customerId: {
      $oid: '62a755e1fc13ae1717000067',
    },
    shipingAddressId: {
      $oid: '62a755e1fc13ae1717000068',
    },
    billingAddressId: {
      $oid: '62a755e1fc13ae1717000069',
    },
    orderDate: '2021-11-16',
    orderStatus: 'preparing',
    products: {
      name: 'False Indian Plantain',
      qty: 1,
      price: 56,
      product: {
        $oid: '62a755e1fc13ae171700006a',
      },
    },
    delivery: {
      deliveryCompany: 'Pollich LLC',
      deliveryType: 'slow',
      traceNo: '5245357186',
    },
    payment: {
      method: 'CreditCard',
      date: '2021-08-20',
      amount: 665,
      status: 105,
    },
  },
  {
    customerId: {
      $oid: '62a755e1fc13ae171700006b',
    },
    shipingAddressId: {
      $oid: '62a755e1fc13ae171700006c',
    },
    billingAddressId: {
      $oid: '62a755e1fc13ae171700006d',
    },
    orderDate: '2022-05-07',
    orderStatus: 'delivering',
    products: {
      name: 'Littleflower Alumroot',
      qty: 2,
      price: 14,
      product: {
        $oid: '62a755e1fc13ae171700006e',
      },
    },
    delivery: {
      deliveryCompany: 'Feil-Klocko',
      deliveryType: 'fast',
      traceNo: '0765364522',
    },
    payment: {
      method: 'CreditCard',
      date: '2021-11-13',
      amount: 202,
      status: 161,
    },
  },
  {
    customerId: {
      $oid: '62a755e1fc13ae171700006f',
    },
    shipingAddressId: {
      $oid: '62a755e1fc13ae1717000070',
    },
    billingAddressId: {
      $oid: '62a755e1fc13ae1717000071',
    },
    orderDate: '2022-02-21',
    orderStatus: 'received',
    products: {
      name: 'Tripterocladium Moss',
      qty: 3,
      price: 47,
      product: {
        $oid: '62a755e1fc13ae1717000072',
      },
    },
    delivery: {
      deliveryCompany: 'Johns, Treutel and Will',
      deliveryType: 'fast',
      traceNo: '6820950365',
    },
    payment: {
      method: 'WechatPay',
      date: '2021-09-13',
      amount: 666,
      status: 334,
    },
  },
];

export default orders;
