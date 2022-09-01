const products = [
  {
    _id: '62a99e173c1942691d27c2b4',
    name: 'Echeveria Dark Ice',
    postDate: '2/22/2022',
    size: {
      width: 3,
      length: 14,
      height: 37,
      radius: 81,
    },
    stock:[
      {
        totl: 10,
        action: 'add',
        actionAmount: 10,
        actionDate: '2021-9-11',
        actionPrice: 50,
      },
      {
        total: 20,
        action: 'add',
        actionAmount: 10,
        actionDate: '2021-9-12',
        actionPrice: 50,
      },
      {
        total: 28,
        action: 'buy',
        actionAmount: 2,
        actionDate: '2021-9-13',
        actionPrice: 20,
      }
    ],
    category: 'Succulents',
    rare: false,
    description: 'Dark Ice is a compact rosettes succulent which has spoon-shaped leaves. The greyish blue leaves can turn to reddish and deep purple when stressed, which is very charming',
    productStatus: 'In Stock',
    priceLists: [
      {
        price: 10,
        postDate: '2021-9-11',
      },
      {
        price: 13,
        postDate: '2021-3-11',
      },
    ],
    quantity:10,
    colors: ['Mauv', 'Purple', 'Indigo', 'Orange', 'Fuscia'],
    reviewIds: ['62a994a78e7fe122350e1d0d', '62a994a78e7fe122350e1d06'],
    stockIds: ['62a99eb18b5abb7c51972214', '62a99eb18b5abb7c51972213'],
    imageIds: ['62c699029493c7a44f46fb89']
  },
  {
    _id: '62a99e173c1942691d27c2b8',
    name: 'Echeveria Baby Finger',
    postDate: '3/6/2022',
    size: {
      width: 12,
      length: 28,
      height: 46,
      radius: 78,
    },
    stock: [
      {
        total: 10,
        action: 'add',
        actionAmount: 10,
        actionDate: '2021-9-11',
        actionPrice: 100,
      },
      {
        total: 20,
        action: 'add',
        actionAmount: 10,
        actionDate: '2021-9-12',
        actionPrice: 100,
      }
    ],
    category: 'Succulent',
    rare: false,
    description: 'Baby finger is rare Korean Succulent. Its leaves are chubby like babys fingers, typically soft to vivid lavendar color, will turn bright mangos and pink color when they grow well, such as insufficient light and the leaves will be grayish green.The leaves are covered in a powdery wax called farina that protects them in full sun and gives a nice, matte finish.',
    productStatus: 'In Stock',
    priceLists: [
      {
        price: 5.99,
        postDate: '2021-9-11',
      },
      {
        price: 2.99,
        postDate: '2021-3-11',
      },
    ],
    quantity:12,
    colors: ['Red', 'Khaki', 'Aquamarine', 'Maroon'],
    reviewIds: ['62a994a78e7fe122350e1d02', '62a994a78e7fe122350e1d01'],
    stockIds: ['62a99eb18b5abb7c51972215'],
    imageIds: ['62c699029493c7a44f46fb88']
  },
  {
    _id: '62a99e173c1942691d27c2bf',
    name: 'Graptoveria Lovely Rose',
    postDate: '10/13/2021',
    size: {
      width: 81,
      length: 62,
      height: 98,
      radius: 87,
    },
    category: 'Succulents',
    rare: false,
    description:
      'Lovely Rose is a small, attractive succulent plant with tightly compacted, plump, gray-green leaves that form a beautiful, rose-like cluster on the top of a bare stem. This mini succulent is easy to grow, and branch.',
    productStatus: 'In Stock',
    priceLists: [
      {
        price: 5.99,
        postDate: '2021-9-11',
      },
      {
        price: 2.99,
        postDate: '2021-3-11',
      },
    ],
    quantity:14,
    colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
    reviewIds: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
    stockIds: ['62a99eb18b5abb7c51972216'],
    imageIds: ['62c699029493c7a44f46fb87']
  },
  {

    name: 'Graptoveria Biante',
    postDate: '10/13/2021',
    size: {
      width: 81,
      length: 62,
      height: 98,
      radius: 87,
    },
    category: 'Succulents',
    rare: false,
    description:
      'Lovely Rose is a small, attractive succulent plant with tightly compacted, plump, gray-green leaves that form a beautiful, rose-like cluster on the top of a bare stem. This mini succulent is easy to grow, and branch.',
    productStatus: 'In Stock',
    priceLists: [
      {
        price: 5.99,
        postDate: '2021-9-11',
      },
      {
        price: 2.99,
        postDate: '2021-3-11',
      },
    ],
    quantity:15,
    colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
    reviewIds: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
    stockIds: ['62a99eb18b5abb7c51972216'],
    imageIds: ['62c699029493c7a44f46fb86']
  },
  {

    name: 'Echeveria Alba Beauty',
    postDate: '10/13/2021',
    size: {
      width: 81,
      length: 62,
      height: 98,
      radius: 87,
    },
    category: 'Succulents',
    rare: false,
    description:
      'Echeveria alba beauty features pointy fleshy blueish-green leaves. When stressed, the leaves turn lovely vibrant orange to pink color on the tips. They arent as vibrant in the summer, but they are still really pretty with leaves symmetrically formed.',
    productStatus: 'In Stock',
    priceLists: [
      {
        price: 5.99,
        postDate: '2021-9-11',
      },
      {
        price: 2.99,
        postDate: '2021-3-11',
      },
    ],
    quantity:16,
    colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
    reviewIds: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
    stockIds: ['62a99eb18b5abb7c51972216'],
    imageIds: ['62c699029493c7a44f46fb85']
  },
  {

    name: 'Echeveria Mebina',
    postDate: '10/13/2021',
    size: {
      width: 81,
      length: 62,
      height: 98,
      radius: 87,
    },
    category: 'Succulents',
    rare: false,
    description:
      'due to its red edge leaves, also called red edge echeveria. Its leaves are long and thin, formed close to a rosette, blooming in spring. Mebina is easy to grow to cluster, which is suitable for making small pot combinations.',
    productStatus: 'In Stock',
    priceLists: [
      {
        price: 4.99,
        postDate: '2021-9-11',
      },
      {
        price: 1.99,
        postDate: '2021-3-11',
      },
    ],
    quantity:17,
    colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
    reviewIds: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
    stockIds: ['62a99eb18b5abb7c51972216'],
    imageIds: ['62c699029493c7a44f46fb84']
  },
];

export default products;