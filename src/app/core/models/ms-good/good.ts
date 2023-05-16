import { ILabelOKey } from '../catalogs/label-okey.model';
import { IWarehouse } from '../catalogs/warehouse.model';
import { IExpedient } from '../ms-expedient/expedient';
import { IFraccion } from './fraccion';

export interface IGoodSami {
  goodNumber: {
    id?: number;
    inventoryNumber?: number;
    goodId?: number;
    description?: string;
    quantity?: number;
    dateIn?: Date;
    dateOut?: Date;
    expireDate?: Date;
    ubicationType?: string;
    status?: string;
    goodCategory?: string;
    originSignals?: string;
    registerInscrSol?: string;
    dateOpinion?: Date;
    proficientOpinion?: string;
    valuerOpinion?: string;
    opinion?: string;
    appraisedValue?: number;
    drawerNumber?: number;
    vaultNumber?: number;
    goodReferenceNumber?: number;
    appraisalCurrencyKey?: string;
    appraisalVigDate?: Date;
    legalDestApprove?: string;
    legalDestApproveUsr?: string;
    legalDestApproveDate?: string;
    complianceLeaveDate?: Date;
    complianceNotifyDate?: Date;
    leaveObservations?: string;
    judicialLeaveDate?: Date;
    notifyDate?: Date;
    notifyA?: string;
    placeNotify?: string;
    discardRevRecDate?: Date;
    resolutionEmissionRecRevDate?: Date;
    admissionAgreementDate?: Date;
    audienceRevRecDate?: Date;
    revRecObservations?: string;
    leaveCause?: string;
    resolution?: string;
    fecUnaffordability?: string;
    unaffordabilityJudgment?: string;
    userApproveUse?: string;
    useApproveDate?: Date;
    useObservations?: string;
    dateRequestChangeNumerary?: string;
    numberChangeRequestUser?: number;
    causeNumberChange?: number;
    changeRequestNumber?: number;
    authNumberChangeDate?: number;
    authChangeNumberUser?: number;
    authChangeNumber?: number;
    numberChangeRatifiesDate?: Date;
    numberChangeRatifiesUser?: string;
    notifyRevRecDate?: Date;
    revRecCause?: string;
    initialAgreement?: string;
    observations?: string;
    fileNumber?: number;
    associatedFileNumber?: number;
    rackNumber?: number;
    storeNumber?: number;
    lotNumber?: number;
    goodClassNumber?: number | string;
    subDelegationNumber?: number;
    delegationNumber?: number;
    physicalReceptionDate?: Date;
    statusResourceReview?: string;
    judicialDate?: Date;
    abandonmentDueDate?: Date;
    destructionApproveDate?: Date;
    destructionApproveUser?: string;
    observationDestruction?: string;
    destinyNumber?: number;
    registryNumber?: number;
    agreementDate?: Date;
    state?: string;
    opinionType?: string;
    presentationDate?: Date;
    revRecRemedyDate?: Date;
    receptionStatus?: string;
    promoterUserDecoDevo?: string;
    scheduledDateDecoDev?: string;
    goodsPartializationFatherNumber?: number;
    seraAbnDeclaration?: string;
    identifier?: string;
    siabiInventoryId?: string;
    cisiPropertyId?: string;
    siabiInvalidId?: string;
    tesofeDate?: string;
    tesofeFolio?: string;
    situation?: number;
    labelNumber?: number;
    flyerNumber?: number;
    insertRegDate?: Date;
    visportal?: number;
    unit?: string;
    referenceValue?: number;
    insertHcDate?: Date;
    extDomProcess?: string;
    requestId?: number | number;
    goodTypeId?: number | string;
    subTypeId?: number;
    goodStatus?: string;
    idGoodProperty?: number;
    requestFolio?: string;
    type?: string | number;
    admissionDate?: Date;
    locationId?: number;
    uniqueKey?: string;
    fileeNumber?: string;
    goodDescription?: string;
    physicalStatus?: number | string;
    unitMeasure?: string;
    ligieUnit?: string;
    quantityy?: number;
    destiny?: number | string;
    appraisal?: string;
    notesTransferringEntity?: string;
    fractionId?: number;
    federalEntity?: string;
    stateConservation?: number | string;
    armor?: string;
    brand?: string;
    subBrand?: string;
    model?: string;
    axesNumber?: number;
    engineNumber?: number;
    tuition?: string;
    serie?: string;
    chassis?: string;
    cabin?: string;
    volume?: string;
    origin?: string;
    useType?: string;
    fraccion?: IFraccion;
    manufacturingYear?: string;
    capacity?: string;
    operationalState?: string;
    enginesNumber?: string;
    dgacRegistry?: string;
    airplaneType?: string;
    flag?: string;
    openwork?: string;
    length?: string;
    sleeve?: string;
    shipName?: string;
    publicRegistry?: string;
    ships?: string;
    caratage?: string;
    material?: string;
    weight?: string;
    satFile?: string;
    satClassificationId?: number;
    satSubclassificationId?: number;
    satGuideMaster?: string;
    satGuideHouse?: string;
    satDepartureNumber?: number;
    satAlmAddress?: string;
    satAlmColony?: string;
    satAlmCityPopulation?: string;
    satAlmMunicipalityDelegation?: string;
    satAlmFederativeEntity?: string;
    satAddressDelivery?: string;
    satBreaches?: number;
    userCreation?: string;
    creationDate?: string;
    userModification?: string;
    modificationDate?: Date;
    ligieSection?: number;
    ligieChapter?: number;
    ligieLevel1?: number;
    ligieLevel2?: number;
    ligieLevel3?: number;
    ligieLevel4?: number;
    satUniqueKey?: string;
    unfair?: string;
    platesNumber?: string;
    clarification?: string;
    reprogrammationNumber?: number;
    reasonCancReprog?: number;
    storeId?: number;
    instanceDate?: Date;
    processStatus?: string;
    version?: number;
    observationss?: string;
    addressId?: number;
    compliesNorm?: string;
    descriptionGoodSae?: string;
    quantitySae?: number;
    saeMeasureUnit?: string;
    saePhysicalState?: number;
    stateConservationSae?: number;
    programmationStatus?: string;
    executionStatus?: string;
    duplicity?: string;
    duplicatedGood?: number;
    compensation?: string;
    validateGood?: string;
    ebsStatus?: string;
    concurrentNumber?: number;
    concurrentMsg?: string;
    fitCircular?: string;
    theftReport?: string;
    transferentDestiny?: number;
    saeDestiny?: number;
    rejectionClarification?: number;
    goodResdevId?: number;
    indClarification?: string;
    msgSatSae?: string;
    color?: string;
    doorsNumber?: number;
    destinationRedress?: number;
    val1?: string;
    val2?: string;
    val3?: string;
    val4?: string;
    val5?: string;
    val6?: string;
    val7?: string;
    val8?: string;
    val9?: string;
    val10?: string;
    val11?: string;
    val12?: string;
    val13?: string;
    val14?: string;
    val15?: string;
    val16?: string;
    val17?: string;
    val18?: string;
    val19?: string;
    val20?: string;
    val21?: string;
    val22?: string;
    val23?: string;
    val24?: string;
    val25?: string;
    val26?: string;
    val27?: string;
    val28?: string;
    val29?: string;
    val30?: string;
    val31?: string;
    val32?: string;
    val33?: string;
    val34?: string;
    val35?: string;
    val36?: string;
    val37?: string;
    val38?: string;
    val39?: string;
    val40?: string;
    val41?: string;
    val42?: string;
    val43?: string;
    val44?: string;
    val45?: string;
    val46?: string;
    val47?: string;
    val48?: string;
    val49?: string;
    val50?: string;
    val51?: string;
    val52?: string;
    val53?: string;
    val54?: string;
    val55?: string;
    val56?: string;
    val57?: string;
    val58?: string;
    val59?: string;
    val60?: string;
    val61?: string;
    val62?: string;
    val63?: string;
    val64?: string;
    val65?: string;
    val66?: string;
    val67?: string;
    val68?: string;
    val69?: string;
    val70?: string;
    val71?: string;
    val72?: string;
    val73?: string;
    val74?: string;
    val75?: string;
    val76?: string;
    val77?: string;
    val78?: string;
    val79?: string;
    val80?: string;
    val81?: string;
    val82?: string;
    val83?: string;
    val84?: string;
    val85?: string;
    val86?: string;
    val87?: string;
    val88?: string;
    val89?: string;
    val90?: string;
    val91?: string;
    val92?: string;
    val93?: string;
    val94?: string;
    val95?: string;
    val96?: string;
    val97?: string;
    val98?: string;
    val99?: string;
    val100?: string;
    val101?: string;
    val102?: string;
    val103?: string;
    val104?: string;
    val105?: string;
    val106?: string;
    val107?: string;
    val108?: string;
    val109?: string;
    val110?: string;
    val111?: string;
    val112?: string;
    val113?: string;
    val114?: string;
    val115?: string;
    val116?: string;
    val117?: string;
    val118?: string;
    val119?: string;
    val120?: string;
    expediente?: IExpedient;
    no_almacen?: IWarehouse;
    no_boveda?: any;
    no_etiqueta?: ILabelOKey;
    estatus?: Estatus;
    no_expediente?: NoExpediente;
    promoter?: string;
    dateRenderDecoDev?: Date | string;
    //TODO: Implement Promoter Interface
    //TODO?: Implement Promoter Interface
    userPromoterDecoDevo?: any;
  };
}

export interface IGood {
  protection?: string;
  id?: number;
  inventoryNumber?: number;
  goodId?: number;
  description?: string;
  quantity?: number;
  dateIn?: Date;
  dateOut?: Date;
  expireDate?: Date;
  ubicationType?: string;
  status?: string;
  goodCategory?: string;
  originSignals?: string;
  registerInscrSol?: string;
  dateOpinion?: Date;
  proficientOpinion?: string;
  valuerOpinion?: string;
  opinion?: string;
  appraisedValue?: number;
  drawerNumber?: number;
  vaultNumber?: number;
  goodReferenceNumber?: number;
  appraisalCurrencyKey?: string;
  appraisalVigDate?: Date;
  legalDestApprove?: string;
  legalDestApproveUsr?: string;
  legalDestApproveDate?: string;
  complianceLeaveDate?: Date;
  complianceNotifyDate?: Date;
  leaveObservations?: string;
  judicialLeaveDate?: Date;
  notifyDate?: Date;
  notifyA?: string;
  placeNotify?: string;
  discardRevRecDate?: Date;
  resolutionEmissionRecRevDate?: Date;
  admissionAgreementDate?: Date;
  audienceRevRecDate?: Date;
  revRecObservations?: string;
  leaveCause?: string;
  resolution?: string;
  fecUnaffordability?: string;
  unaffordabilityJudgment?: string;
  userApproveUse?: string;
  useApproveDate?: Date;
  useObservations?: string;
  dateRequestChangeNumerary?: string;
  numberChangeRequestUser?: number;
  causeNumberChange?: number;
  changeRequestNumber?: number;
  authNumberChangeDate?: number;
  authChangeNumberUser?: number;
  authChangeNumber?: number;
  numberChangeRatifiesDate?: Date;
  numberChangeRatifiesUser?: string;
  notifyRevRecDate?: Date;
  revRecCause?: string;
  initialAgreement?: string;
  observations?: string;
  fileNumber?: number;
  associatedFileNumber?: number;
  rackNumber?: number;
  storeNumber?: number;
  lotNumber?: number;
  goodClassNumber?: number | string;
  subDelegationNumber?: number;
  delegationNumber?: number;
  physicalReceptionDate?: Date;
  statusResourceReview?: string;
  judicialDate?: Date;
  abandonmentDueDate?: Date;
  destructionApproveDate?: Date;
  destructionApproveUser?: string;
  observationDestruction?: string;
  destinyNumber?: number;
  registryNumber?: number;
  agreementDate?: Date;
  state?: string;
  opinionType?: string;
  presentationDate?: Date;
  revRecRemedyDate?: Date;
  receptionStatus?: string;
  promoterUserDecoDevo?: string;
  scheduledDateDecoDev?: string;
  goodsPartializationFatherNumber?: number;
  seraAbnDeclaration?: string;
  identifier?: string;
  siabiInventoryId?: string;
  cisiPropertyId?: string;
  siabiInvalidId?: string;
  tesofeDate?: string;
  tesofeFolio?: string;
  situation?: number;
  labelNumber?: number;
  flyerNumber?: number;
  insertRegDate?: Date;
  visportal?: number;
  unit?: string;
  referenceValue?: number;
  insertHcDate?: Date;
  extDomProcess?: string;
  requestId?: number | number;
  goodTypeId?: number | string;
  subTypeId?: number;
  goodStatus?: string;
  idGoodProperty?: number;
  requestFolio?: string;
  type?: string | number;
  admissionDate?: Date | string;
  locationId?: number;
  uniqueKey?: string;
  fileeNumber?: string;
  goodDescription?: string;
  physicalStatus?: number | string;
  unitMeasure?: string;
  ligieUnit?: string;
  quantityy?: number;
  destiny?: number | string;
  appraisal?: string;
  notesTransferringEntity?: string;
  fractionId?: number;
  federalEntity?: string;
  stateConservation?: number | string;
  armor?: string;
  brand?: string;
  subBrand?: string;
  model?: string;
  axesNumber?: number;
  engineNumber?: number;
  tuition?: string;
  serie?: string;
  chassis?: string;
  cabin?: string;
  volume?: string;
  origin?: string;
  useType?: string;
  fraccion?: IFraccion;
  manufacturingYear?: string;
  capacity?: string;
  operationalState?: string;
  enginesNumber?: string;
  dgacRegistry?: string;
  airplaneType?: string;
  flag?: string;
  openwork?: string;
  length?: string;
  sleeve?: string;
  shipName?: string;
  publicRegistry?: string;
  ships?: string;
  caratage?: string;
  material?: string;
  weight?: string;
  satFile?: string;
  satClassificationId?: number;
  satSubclassificationId?: number;
  satGuideMaster?: string;
  satGuideHouse?: string;
  satDepartureNumber?: number;
  satAlmAddress?: string;
  satAlmColony?: string;
  satAlmCityPopulation?: string;
  satAlmMunicipalityDelegation?: string;
  satAlmFederativeEntity?: string;
  satAddressDelivery?: string;
  satBreaches?: number;
  userCreation?: string;
  creationDate?: string;
  userModification?: string;
  modificationDate?: Date;
  ligieSection?: number;
  ligieChapter?: number;
  ligieLevel1?: number;
  ligieLevel2?: number;
  ligieLevel3?: number;
  ligieLevel4?: number;
  satUniqueKey?: string;
  unfair?: string;
  platesNumber?: string;
  clarification?: string;
  reprogrammationNumber?: number;
  reasonCancReprog?: number;
  storeId?: number;
  instanceDate?: Date;
  processStatus?: string;
  version?: number;
  observationss?: string;
  addressId?: number;
  compliesNorm?: string;
  descriptionGoodSae?: string;
  quantitySae?: number;
  saeMeasureUnit?: string;
  saePhysicalState?: number;
  stateConservationSae?: number;
  programmationStatus?: string;
  executionStatus?: string;
  duplicity?: string;
  duplicatedGood?: number;
  compensation?: string;
  validateGood?: string;
  ebsStatus?: string;
  concurrentNumber?: number;
  concurrentMsg?: string;
  fitCircular?: string;
  theftReport?: string;
  transferentDestiny?: number;
  saeDestiny?: number;
  rejectionClarification?: number;
  goodResdevId?: number;
  indClarification?: string;
  msgSatSae?: string;
  color?: string;
  doorsNumber?: number;
  destinationRedress?: number;
  fractionCode?: string;
  val1?: string;
  val2?: string;
  val3?: string;
  val4?: string;
  val5?: string;
  val6?: string;
  val7?: string;
  val8?: string;
  val9?: string;
  val10?: string;
  val11?: string;
  val12?: string;
  val13?: string;
  val14?: string;
  val15?: string;
  val16?: string;
  val17?: string;
  val18?: string;
  val19?: string;
  val20?: string;
  val21?: string;
  val22?: string;
  val23?: string;
  val24?: string;
  val25?: string;
  val26?: string;
  val27?: string;
  val28?: string;
  val29?: string;
  val30?: string;
  val31?: string;
  val32?: string;
  val33?: string;
  val34?: string;
  val35?: string;
  val36?: string;
  val37?: string;
  val38?: string;
  val39?: string;
  val40?: string;
  val41?: string;
  val42?: string;
  val43?: string;
  val44?: string;
  val45?: string;
  val46?: string;
  val47?: string;
  val48?: string;
  val49?: string;
  val50?: string;
  val51?: string;
  val52?: string;
  val53?: string;
  val54?: string;
  val55?: string;
  val56?: string;
  val57?: string;
  val58?: string;
  val59?: string;
  val60?: string;
  val61?: string;
  val62?: string;
  val63?: string;
  val64?: string;
  val65?: string;
  val66?: string;
  val67?: string;
  val68?: string;
  val69?: string;
  val70?: string;
  val71?: string;
  val72?: string;
  val73?: string;
  val74?: string;
  val75?: string;
  val76?: string;
  val77?: string;
  val78?: string;
  val79?: string;
  val80?: string;
  val81?: string;
  val82?: string;
  val83?: string;
  val84?: string;
  val85?: string;
  val86?: string;
  val87?: string;
  val88?: string;
  val89?: string;
  val90?: string;
  val91?: string;
  val92?: string;
  val93?: string;
  val94?: string;
  val95?: string;
  val96?: string;
  val97?: string;
  val98?: string;
  val99?: string;
  val100?: string;
  val101?: string;
  val102?: string;
  val103?: string;
  val104?: string;
  val105?: string;
  val106?: string;
  val107?: string;
  val108?: string;
  val109?: string;
  val110?: string;
  val111?: string;
  val112?: string;
  val113?: string;
  val114?: string;
  val115?: string;
  val116?: string;
  val117?: string;
  val118?: string;
  val119?: string;
  val120?: string;
  expediente?: IExpedient;
  no_almacen?: IWarehouse;
  no_boveda?: any;
  no_etiqueta?: ILabelOKey;
  estatus?: Estatus;
  no_expediente?: NoExpediente;
  promoter?: string;
  dateRenderDecoDev?: Date | string;
  //TODO: Implement Promoter Interface
  //TODO?: Implement Promoter Interface
  userPromoterDecoDevo?: any;
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
  id?: string;
}

export interface IVban {
  array: [
    {
      screenKey: string;
      goodNumber: number;
      identificador: string;
      typeAct: string;
    }
  ];
}

export interface IValidaCambioEstatus {
  p2: number | string | null;
  p1: number | string | null;
  p3: string | number | null;
  p4: string | number | null;
}

export interface IValNumeOtro {
  pc_pantalla: string;
  no_bien: number;
  identificador: string;
  proceso_ext_dom: string;
}

export interface GoodGetData {
  goodNumber: number;
  subDelegationNumber: number;
  clasifGoodNumber: number;
  expedientNumber: number;
  delegationNumber: number;
  dateElaboration: string | Date;
  identificator: string;
  processExt: string;
  statusGood: string;
  screenKey: string;
}

export interface ILvlPrograma {
  no_bien: string | number;
  no_expediente: string | number;
}

export interface IGoodAndDetailProceeding {
  pTiNumberDeleg: number;
  pTiNumberSubdel: number;
}

export interface IAcceptGoodStatus {
  pNumberGood: number | string;
  pExpedients: number | string;
}

export interface IAcceptGoodActa {
  pNumberGood: number | string;
  pIdentify: string;
  pVcScreen: string;
}

export interface IAcceptGoodStatusScreen {
  pNumberGood: number | string;
  pVcScreen: string;
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
