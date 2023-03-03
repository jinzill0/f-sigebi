import { IDelegation } from 'src/app/core/models/catalogs/delegation.model';
import { IDepartment } from 'src/app/core/models/catalogs/department.model';
import { IMinpub } from 'src/app/core/models/catalogs/minpub.model';
import { ISubdelegation } from 'src/app/core/models/catalogs/subdelegation.model';
export interface INotification {
  wheelNumber: number;
  receiptDate: Date;
  captureDate: Date;
  officeExternalKey: string;
  externalOfficeDate: Date;
  externalRemitter: string;
  protectionKey: string;
  touchPenaltyKey: string;
  circumstantialRecord: string;
  preliminaryInquiry: string;
  criminalCase: string;
  addressee?: string;
  expedientNumber: number;
  crimeKey: string;
  affairKey: string;
  entFedKey: string;
  viaKey: string;
  consecutiveNumber: number;
  observations: string;
  delegationNumber: number;
  subDelegationNumber: number;
  institutionNumber: IInstitutionNumber | number;
  indiciadoNumber: number;
  delDestinyNumber: number;
  subDelDestinyNumber: number;
  departamentDestinyNumber: number;
  officeNumber: number;
  minpubNumber: number | IMinpub;
  cityNumber: number;
  courtNumber: number;
  registerNumber?: number;
  dictumKey: string;
  identifier: string;
  observationDictum?: string;
  wheelStatus: string;
  transference: number;
  expedientTransferenceNumber: string;
  priority: string;
  wheelType: string;
  reserved: string;
  entryProcedureDate: Date;
  userInsert?: string;
  originNumber: number;
  stationNumber: number;
  autorityNumber: number;
  endTransferNumber: number;
  dailyEviction: number;
  hcCaptureDate?: Date;
  hcEntryProcedureDate?: Date;
  desKnowingDate?: Date;
  addressGeneral: number;
  affair?: IAffair | null;
  delegation?: null | IDelegation;
  subDelegation?: null | ISubdelegation;
  departament?: null | IDepartment;
  numberProperty?: number;
  notificationDate?: any;
  userCorrectsKey?: any;
}

export interface IAffair {
  id: number;
  description: string;
  referralNoteType: string;
  creationUser: string;
  creationDate: Date;
  editionUser: string;
  modificationDate: Date;
  versionUser: string;
  status: string;
  registerNumber: number;
  version: string;
  processDetonate: string;
  clv: string;
}

export interface IInstitutionNumber {
  id: number;
  name: string;
  description: string;
  manager: string;
  street: string;
  numInside: string;
  numExterior: string;
  cologne: string;
  zipCode: string;
  delegMunic: string;
  phone: string;
  numClasif: number;
  numCity: string;
  idCity: number;
  numRegister: string;
  numTransference: string;
}

export interface INotificationInquiry {
  protectionKey: string;
  touchPenaltyKey: string;
  circumstantialRecord: string;
  preliminaryInquiry: string;
  criminalCase: string;
  entFedKey: string;
  indiciadoNumber: number;
  minpubNumber: number;
  cityNumber: number;
  courtNumber: number;
  transference: number;
  stationNumber: number;
  autorityNumber: number;
}
