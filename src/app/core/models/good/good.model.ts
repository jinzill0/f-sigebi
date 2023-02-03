import { ILabelOKey } from '../catalogs/label-okey.model';
import { IWarehouse } from '../catalogs/warehouse.model';

export interface IGood {
  id: string;
  noInventoey?: any;
  idGood: string;
  description: string;
  complianceLeaveDate?: string;
  quantity?: number;
  goodStatus?: string;
  cant: string;
  notifyDate?: string | Date;
  dateEntry: string;
  dateExit?: any;
  dateVencim?: any;
  typeUbucation: string;
  status: string;
  classificationGood?: any;
  remarksOrien?: any;
  solIncripRegister?: any;
  fecOpinion?: any;
  proficientOpinion?: any;
  appraiserOpinion?: any;
  worthApraisal: string;
  Nodrawer?: any;
  NoVault?: any;
  NoGoodReference: string;
  cveCurrencyAppraisal: string;
  fecAppraisalVig: string;
  approvedDestLegal?: any;
  usrApprovedDestLegal?: any;
  fecApprovedDestLegal?: any;
  fecComplianceAbandonment?: any;
  fecNotificationAbandonment?: any;
  observationAbandoment?: any;
  fecConfAbandoment?: any;
  fecNotification?: any;
  notificationA?: any;
  placeNotification?: any;
  fecResdiscardRecRev?: any;
  fecResissueRecRev?: any;
  fecResAgreementRecRev?: any;
  fecResAudienceRecRev?: any;
  observationRecRev?: any;
  reasonAbandonment?: any;
  resolution?: any;
  fecUnaffordability?: any;
  Unaffordability?: any;
  usrApprovedUtilization?: any;
  fecApprovedUtilization?: any;
  observationUtilization?: any;
  fecSoliChangeNumerary?: any;
  userSolicChangeNumerary?: any;
  reasonChangeNumerary?: any;
  requestChangeNumerary?: any;
  fecAuthorizesChangeNumerary?: any;
  userAuthorizesChangeNumera?: any;
  AuthorizesChangeNumerary?: any;
  fecRatifiesChangeNumerary?: any;
  userRatifiesChange?: any;
  fecNotificationRecRev?: any;
  reasonRecRev?: any;
  agreementInitial?: any;
  observation: string;
  NoProceedings: string;
  NoexpAssociated: string;
  NoRack: string;
  NoStore: string;
  NoBatch: string;
  NoClasifGood: string;
  NoSubdelegation: string;
  Nodelegation: string;
  fecReceptionPhysical: string;
  statusResourseRevision?: any;
  fecJudicial?: any;
  fecExpirationAbandonment?: any;
  fecApproveDestruction?: any;
  usrApproveDestruction?: any;
  observationDestruction?: any;
  NoDestiny?: any;
  NoRegister: string;
  fecAgreementAseg: string;
  state: string;
  typOpinion?: any;
  fecPresentation?: any;
  fecSubsanaRecRev?: any;
  statusReception?: any;
  userPromoterDecoDevo?: any;
  fecProgramerXDecoDevo?: any;
  noGoogDadBias?: any;
  declarationAbnSera?: any;
  identifier: string;
  idInventarySiabi?: any;
  idPropertyCisi?: any;
  idInvactualSiabi?: any;
  fectesofe?: any;
  InvoiceTesofe?: any;
  situation?: any;
  noLabel: string;
  nowheel: string;
  fecRegInsert: string;
  visit?: any;
  unit: string;
  worthReference?: any;
  fecRegInsertHc?: any;
  processExtDom: string;
  extDomProcess?: string;
  idRequest?: any;
  idTypeGood?: any;
  idSubtypeGood?: any;
  stateGood: string;
  idGoodPropety?: any;
  invoceRequest?: any;
  type?: any;
  fecEntry?: any;
  idUbication?: any;
  clvUnique?: any;
  noProceedings?: any;
  descriptionGood?: any;
  statePhysical?: any;
  unitMeasure?: any;
  unitLigie?: any;
  cantt?: any;
  destiny?: any;
  avaluo?: any;
  notesEntityTransferente?: any;
  idFraction?: any;
  entityFederative?: any;
  stateConservation?: any;
  armor?: any;
  brand?: any;
  subbrand?: any;
  model?: any;
  numEje?: any;
  engine?: any;
  enrollment?: any;
  serie?: any;
  chassis?: any;
  cabin?: any;
  volume?: any;
  procedence?: any;
  typeUse?: any;
  anioManufacturer?: any;
  capacity?: any;
  stateOperative?: any;
  numEngine?: any;
  registerDgac?: any;
  typePlane?: any;
  flag?: any;
  fretwork?: any;
  eslora?: any;
  sleeve?: any;
  nameEmbarkation?: any;
  regPublic?: any;
  embarkation?: any;
  karat?: any;
  material?: any;
  weight?: any;
  satRecord?: any;
  satIdClasification?: any;
  satIdSubclasification?: any;
  satGuideMaster?: any;
  satGuideHouse?: any;
  satNoPartida?: any;
  satAlmDirection?: any;
  satAlmColony?: any;
  satAlmCityPopulation?: any;
  satAlmMunicipalityDelegation?: any;
  satAlmEntityFederetive?: any;
  satDirectionDelivery?: any;
  satBreak?: any;
  userCreation?: any;
  fecCreation?: any;
  userModification?: any;
  fecModification?: any;
  ligieSection?: any;
  ligieChapter?: any;
  ligieLevel1?: any;
  ligieLevel2?: any;
  ligieLevel3?: any;
  ligieLevel4?: any;
  satKeyUnique?: any;
  unfair?: any;
  numPlate?: any;
  aclaration?: any;
  numRescheduling?: any;
  reasonCancReprog?: any;
  idStore?: any;
  fecInstance?: any;
  statusProcess: string;
  version?: any;
  observations?: any;
  idHome?: any;
  complyRule?: any;
  descriptionGoodSae?: any;
  cantSae?: any;
  unitMeasureSae?: any;
  statePhysicalSae?: any;
  stateConversationSae?: any;
  stateProgramation?: any;
  stateExecution?: any;
  duplicity?: any;
  goodDuplicate?: any;
  compensation?: any;
  valideGood?: any;
  stateEbs?: any;
  noConcurrent?: any;
  msgConcurrent?: any;
  suitableCircular?: any;
  reportTheft?: any;
  destinyTranferent?: any;
  destinySae?: any;
  rejectionAclaration?: any;
  idGoodResdev?: any;
  indAclaration: string;
  msgSatSae?: any;
  color?: any;
  numClow?: any;
  destinyCompensation?: any;
  val1: string;
  val2: string;
  val3: string;
  val4: string;
  val5: string;
  val6?: any;
  val7: string;
  val8: string;
  val9: string;
  val10: string;
  val11: string;
  val12?: any;
  val13?: any;
  val14: string;
  val15: string;
  val16: string;
  val17: string;
  val18?: any;
  val19?: any;
  val20?: any;
  val21?: any;
  val22?: any;
  val23?: any;
  val24?: any;
  val25?: any;
  val26?: any;
  val27?: any;
  val28?: any;
  val29?: any;
  val30?: any;
  val31?: any;
  val32?: any;
  val33?: any;
  val34?: any;
  val35?: any;
  val36?: any;
  val37?: any;
  val38?: any;
  val39?: any;
  val40?: any;
  val41?: any;
  val42?: any;
  val43?: any;
  val44?: any;
  val45?: any;
  val46?: any;
  val47?: any;
  val48?: any;
  val49?: any;
  val50?: any;
  val51?: any;
  val52?: any;
  val53?: any;
  val54?: any;
  val55?: any;
  val56?: any;
  val57?: any;
  val58?: any;
  val59?: any;
  val60?: any;
  val61?: any;
  val62?: any;
  val63?: any;
  val64?: any;
  val65?: any;
  val66?: any;
  val67?: any;
  val68?: any;
  val69?: any;
  val70?: any;
  val71?: any;
  val72?: any;
  val73?: any;
  val74?: any;
  val75?: any;
  val76?: any;
  val77?: any;
  val78?: any;
  val79?: any;
  val80?: any;
  val81?: any;
  val82?: any;
  val83?: any;
  val84?: any;
  val85?: any;
  val86?: any;
  val87?: any;
  val88?: any;
  val89?: any;
  val90?: any;
  val91?: any;
  val92?: any;
  val93?: any;
  val94?: any;
  val95?: any;
  val96?: any;
  val97?: any;
  val98?: any;
  val99?: any;
  val100?: any;
  val101?: any;
  val102?: any;
  val103?: any;
  val104?: any;
  val105?: any;
  val106?: any;
  val107?: any;
  val108?: any;
  val109?: any;
  val110?: any;
  val111?: any;
  val112?: any;
  val113?: any;
  val114?: any;
  val115?: any;
  val116?: any;
  val117?: any;
  val118?: any;
  val119?: any;
  val120?: any;
  no_almacen: IWarehouse;
  no_boveda?: any;
  no_etiqueta: ILabelOKey;
  estatus: Estatus;
  no_expediente: NoExpediente;
}

// TODO: Checar a que interfaz pertenece
export interface Estatus {
  status: string;
  noPhasePart: string;
  descriptionStatus: string;
  active: string;
  fecVilidityIni: string;
  fecVilidityFin?: any;
  observationShortStatus?: any;
  destiny: string;
}

// TODO: Checar si la interfaz es la del modelo:
// ? src\app\core\models\administrative-processes\record.model.ts
export interface NoExpediente {
  id: string;
  dateAgreementAssurance: Date;
  foresight?: any;
  dateForesight?: any;
  articleValidated: string;
  ministerialDate?: any;
  ministerialActOfFaith?: any;
  date_Dictamines?: any;
  batteryNumber?: any;
  lockerNumber?: any;
  shelfNumber?: any;
  courtNumber: string;
  observationsForecast?: any;
  insertedBy?: any;
  observations?: any;
  insertMethod: string;
  insertDate: Date;
  receptionDate: Date;
  criminalCase: string;
  preliminaryInquiry: string;
  protectionKey: string;
  crimeKey: string;
  circumstantialRecord?: any;
  keyPenalty?: any;
  nameInstitution: string;
  courtName: string;
  keySaveValue?: any;
  indicatedName: string;
  authorityOrdersDictum?: any;
  notificationDate?: any;
  notifiedTo?: any;
  placeNotification?: any;
  confiscateDictamineDate: Date;
  dictaminationReturnDate: Date;
  alienationDate?: any;
  federalEntityKey: string;
  dictaminationDate?: any;
  registerNumber: string;
  destructionDate?: any;
  donationDate?: any;
  initialAgreementDate?: any;
  initialAgreement?: any;
  fileStatus?: any;
  identifier: string;
  crimeStatus?: any;
  transferNumber: string;
  expTransferNumber?: any;
  fileType: string;
  stationNumber: string;
  authorityNumber: string;
  insertionDatehc?: any;
}
