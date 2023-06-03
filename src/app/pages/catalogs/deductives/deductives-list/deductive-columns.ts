export const DEDUCTIVE_COLUMNS = {
  id: {
    title: 'Registro',
    type: 'number',
    sort: false,
  },
  serviceType: {
    title: 'Tipo de servicio',
    type: 'string',
    sort: false,
  },
  weightedDeduction: {
    title: 'Ponderación',
    type: 'number',
    sort: false,
  },
  startingRankPercentage: {
    title: 'Porcentaje inicial',
    type: 'number',
    sort: false,
  },
  finalRankPercentage: {
    title: 'Porcentaje final',
    type: 'number',
    sort: false,
  },
  creationUser: {
    title: 'Creado por',
    type: 'string',
    sort: false,
  },
  editionUser: {
    title: 'Modificado por',
    type: 'string',
    sort: false,
  },
  version: {
    title: 'Versión',
    type: 'number',
    sort: false,
  },
  status: {
    title: 'Estatus',
    type: 'html',
    valuePrepareFunction: (value: string) => {
      if (value === '1') {
        return '<strong><span class="badge badge-pill badge-success">Activo</span></strong>';
      } else if (value === '0') {
        return '<strong><span class="badge badge-pill badge-warning">Inactivo</span></strong>';
      } else {
        return '<strong><span class="badge badge-pill badge-secondary">Desconocido</span></strong>';
      }
    },
    sort: false,
  },
  contractNumber: {
    title: 'No. de contrato',
    type: 'number',
    sort: false,
  },
};
