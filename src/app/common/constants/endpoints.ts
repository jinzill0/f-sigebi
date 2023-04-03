export enum ENDPOINT_LINKS {
  Affair = 'catalog/affair',
  Authority = 'catalog/authority',
  appraiser = 'catalog/appraisers',
  Appraisers = 'appraise/appraisal-x-good', // ? Agregado para el nuevo MS agregado el 20/02/23
  Bank = 'catalog/bank',
  Batch = 'catalog/batch',
  Battery = 'catalog/battery',
  City = 'catalog/city-sera',
  calendar = 'catalog/calendar',
  calendarId = 'catalog/api/v1/calendar',
  ClaimConclusion = 'catalog/claim-conclusion',
  ClaimStatus = 'catalog/claims-status',
  Clarification = 'catalog/clarification',
  Court = 'catalog/court',
  CourtByCity = 'catalog/court-by-city',
  Customer = 'catalog/', // ? Checar si se implementa este catalogo
  DeductiveVerification = 'catalog/deductive-verification',
  Deductive = 'catalog/deductive',
  DelegationState = 'catalog/delegation-state',
  Delegation = 'catalog/delegation',
  Departament = 'catalog/departament',
  DetailDelegation = 'catalog/detail-delegation',
  Dictamen = 'catalog/opinion',
  DocCompensationSatXML = 'catalog/doc-resarcimientos-sat-xml',
  DocCompensation = 'catalog/doc-resarcimientos',
  DocCompensationSAT = 'catalog/doc-resarcimientos-sat',
  Domicile = 'catalog/domicile',
  Drawer = 'catalog/drawer',
  EdosXCoor = 'catalog/edos-x-coor',
  EntFed = 'catalog/entfed',
  EstRepuve = 'catalog/est-repuve',
  File = 'catalog/expedientes',
  Fraction = 'catalog/fractions',
  GeneralStatus = 'catalog/general-status',
  Generic = 'catalog/generics',
  GoodSituation = 'catalog/good-situacion',
  GoodSssubtype = 'catalog/good-sssubtype',
  GoodSsubtype = 'catalog/good-ssubtype',
  GoodSubtype = 'catalog/good-subtype',
  GoodType = 'catalog/good-type',
  GoodsSubtype = 'catalog/goods-subtype-sae',
  Grantee = 'catalog/grantees',
  HalfImage = 'catalog/half-image',
  Holiday = 'catalog/holiday',
  HistoryGood = 'historygood/historicalStatusGood',
  Identifier = 'catalog/identifier',
  IfaiSerie = 'catalog/series',
  IndicatorDeadline = 'catalog/indicator-deadlines',
  Indiciados = 'catalog/indiciados',
  IndicatorReport = 'catalog/indicator-report',
  InstitutionClasification = 'catalog/institution-classification',
  IssuingInstitution = 'catalog/issuing-institution',
  LabelOkey = 'catalog/label-good',
  Lawyer = 'catalog/lawyer',
  LegalSupport = 'catalog/legal-supports',
  Legend = 'catalog/official-legends',
  Locality = 'catalog/locality-sera',
  Locker = 'catalog/locker',
  MailBox = 'catalog/mailbox-status',
  Management = 'catalog/management',
  MediumPhotography = 'catalog/medium-photography',
  MinPub = 'catalog/minpub',
  Municipality = 'catalog/municipality-sera',
  NonDeliveryReason = 'catalog/non-delivery-reasons',
  Norm = 'catalog/norms',
  Notary = 'catalog/notary',
  Office = 'catalog/offices',
  Opinion = 'catalog/opinion',
  OriginCisi = 'catalog/origin-cisi',
  Origin = 'catalog/origin',
  Paragraph = 'catalog/cat-paragraphs',
  Parameter = 'catalog/parameter',
  ParametersIndicators = 'catalog/parameters-indicators',
  PaymentConcept = 'payments-concept',
  Penalty = 'catalog/penalty',
  Person = 'catalog/person',
  Proeficient = 'catalog/proficient',
  Protection = 'catalog/protection',
  QAccumulatedGoods = 'catalog/q-accumulated-goods',
  Question = 'catalog/question',
  RAsuntDic = 'catalog/r-asunt-dic',
  Rack = 'catalog/rack',
  RegionalDelegation = 'catalog/regional-delegation',
  Regulatory = 'catalog/regulatory',
  ResponseRepuve = 'catalog/response-repuve',
  Response = 'catalog/response',
  RevisionReason = 'catalog/revision-reason',
  Safe = 'catalog/safe',
  SATClasification = 'catalog/sat-classification',
  SATSubclasification = 'catalog/sat-subclassification',
  SATSAEClasification = 'catalog/satsae-classification',
  SaveValue = 'catalog/save-values',
  Score = 'catalog/score',
  ServiceCat = 'catalog/service-cat',
  Settlement = 'catalog/settlement',
  Shelves = 'catalog/shelves',
  SIABClasification = 'catalog/siab-clasification',
  Sinister = 'catalog/', // ? Checar si se implementa este catalogo
  SiseProcess = 'catalog/sise-process',
  Stage = 'catalog/stage',
  StateOfRepublic = 'catalog/state-of-republic',
  Station = 'catalog/station',
  StatusCode = 'catalog/status-code',
  StatusProcess = 'catalog/status-process',
  StatusTransfer = 'catalog/status-transfer',
  Storehouse = 'catalog/storehouse',
  Subcategory = 'catalog/', // ? Checar si se implementa este catalogo
  Subdelegation = 'catalog/subdelegation',
  ThirdParty = 'catalog/third-party-company',
  Transferente = 'catalog/transferent',
  TypeDocto = 'catalog/type-docto',
  TypeGoods = 'catalog/type-state',
  TypeRelevant = 'catalog/type-relevant',
  TypeSettelement = 'catalog/type-settlement',
  TypeSiniester = 'catalog/type-sinister',
  TypeWarehouse = 'catalog/type-warehouses',
  TypeOrderServices = 'catalog/type-order-service',
  TypeServices = 'catalog/type-services',
  Warehouse = 'catalog/warehouse',
  ZipCode = 'catalog/zip-code', //
  IndicatorsParameter = 'parametergood/indicators-parameter',
  DetailIndParameter = 'parametergood/detalle-ind-parametro',
  parametergood = 'parametergood/tmp-max-cierre-acta-dev',
  parametergoodActa = 'proceeding/proceedings-validators',
  parametergoodCat = 'parametergood/cat-motivosrev',
  WarehouseTypeWarehouse = 'parametergood/warehouse-types-warehouse',
  WarehouseClassifyCosts = 'parametergood/warehouse-classif-costs',
  parameterComer = 'parametercomer/api/v1/bank-accounts',
  Document = 'documents',
  documents = 'documents/api/v1/documents-dictum-x-state-m',
  ZoneGeographic = 'catalog/zone-geographic',
  DocumentsForDictum = 'documents-for-dictum',
  DocumentsForDictumType = 'documents/api/v1/documents-for-dictum',
  DocumentSeparators = 'documents/document-separator',
  DocumentsType = 'documents-types/',
  DinamicTables = 'dynamiccatalog/api/v1/dinamic-tables',
  DinamicTablesType = 'dynamiccatalog/api/v1/dinamic-tables/get-tables-by-type-of-tdesccve',
  DinamicTablesName = 'dynamiccatalog/api/v1/dinamic-tables/get-tvaltable1-by-name',
  DinamicTablesTable = 'dynamiccatalog/api/v1/dinamic-tables/get-tvaltable5-by-table',
  DinamicTable = 'dinamic-tables/get-tvaltable5-by-table',
  DinamicTable1 = 'dinamic-tables/tavaltable1',

  AffairType = 'affair-type',
  FinancialInformation = 'parameterfinantial/financial-information',
  FinancialIndicators = 'financial-indicators',
  AttributesFinancialInfo = 'attributes-financial-information',
  BankConcepts = 'concept-movis-bank',
  NumeraryCategories = 'numerary-categories',
  NumeraryCategoriesAutom = 'categorization-autom-numerary',
  tevents = 'event/comer-tevents',
  usuxtpevents = 'event/application/paComerUsuxtpevents',
  security = 'security/seg-profile',

  //request
  request = 'request',
  //Verificar Cumplimiento
  VerificationCompliance = 'verification-compliance',
  RequestDocumentation = 'request-documentation',

  //expedient
  Expedient = 'expedient',
  //goodsQuery//
  GoodsQuery = 'goodsquery',
  ProgrammingGood = 'ProgrammingGood',
  DinamicTablesSelect = 'dynamiccatalog/dinamic-tables',
  StrategyContract = 'contract/strategy-contract',
  ZoneContract = 'catalog/zones-contract',
  Process = 'strategy/strategy-process',
}
