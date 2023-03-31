export const FINANCIAL_INFORMATION_COLUMNS1 = {
  idGoodNumber: {
    type: 'list',
    goodId: {
      title: 'Bien',
      type: 'number',
      sort: false,
      valuePrepareFunction: (cell: any, row: any) => {
        return row.idGoodNumber.goodId;
      },
    },
    description: {
      title: 'Descripción',
      type: 'string',
      sort: true,
      valuePrepareFunction: (cell: any, row: any) => {
        return row.idGoodNumber.description;
      },
    },
    quantity: {
      title: 'Valor',
      type: 'number',
      sort: false,
      valuePrepareFunction: (cell: any, row: any) => {
        return row.idGoodNumber.quantity;
      },
    },
  },
};

export const FINANCIAL_INFORMATION_COLUMNS2 = {
  idGoodNumber: {
    title: 'Bien',
    type: 'number',
    sort: true,
  },
  description: {
    title: 'Descripción',
    type: 'number',
    sort: true,
  },
  value: {
    title: 'Valor',
    type: 'number',
    sort: true,
  },
};
