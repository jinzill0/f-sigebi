export interface IAuthority {
  idAuthority: string;
  idTransferer: string;
  idStation: string;
  authorityName: string;
  idCity: string;
  cveStatus: string;
  codeStatus: string;
  creationUser: string;
  creationDate: string;
  editionUser: string;
  modificationDate: string;
  version: string;
  cveUnique: string;
  status: string;
  idAuthorityIssuerTransferor: string;
  Station: any;
}
export interface INoCityByAsuntoSAT {
  no_ciudad: string;
}
export interface IAuthorityIssuingParams {
  expedientSat: string;
  transferent: number;
  city: number;
}
export interface IAuthorityIssuingResponse {
  no_emisora: string;
  no_autoridad: string;
}
