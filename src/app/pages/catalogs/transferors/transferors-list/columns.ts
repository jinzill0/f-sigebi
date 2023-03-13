export const TRANSFERENT_STATE_COLUMNS = {
  id: {
    title: 'No.',
    sort: false,
    width: '25px',
  },
  keyTransferent: {
    title: 'Clave',
    sort: false,
  },
  nameTransferent: {
    title: 'Nombre',
    sort: false,
    filter: {
      config: {},
    },
  },
  typeTransferent: {
    title: 'Tipo',
    sort: false,
    valuePrepareFunction: (value: string) => {
      if (value == 'NO') return 'No obligatorio ';
      if (value == 'CE') return 'Asegurado';

      return value;
    },
    filter: {
      type: 'list',
      config: {
        selectText: 'Seleccionar',
        list: [
          { value: 'NO', title: 'No obligatorio' },
          { value: 'CE', title: 'Asegurado' },
        ],
      },
    },
  },
};

export const STATE_COLUMS = {
  nametransferent: {
    title: 'Transferente',
    sort: false,
  },
  statekey: {
    title: 'Estado',
    sort: false,
  },
};
