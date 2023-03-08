export enum ExpedientEndpoints {
  Base = 'expedient',
  GetIntegratedExpedients = 'integrated-exp',
  BasePath = 'expedient',
  GetCountByKey = `expedient/get-count-by-id`,
  FindIdentificator = `expedient/find-identificator`,
  GetNextVal = 'expedient/get-nextval',
  CreateExpedient = `expedient/create-expedient`,
  // GetTempExpedient = 'expedient/get-temp-expedient',
  TmpExpedients = 'tmp-expedients',
  CreateTempExpedient = 'expedient/create-temp-expedient',
  DeleteTempExpedient = 'expedient/delete-temp-expedient',
}
