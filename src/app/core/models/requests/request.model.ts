import { IAuthority } from '../catalogs/authority.model';
import { IRegionalDelegation } from '../catalogs/regional-delegation.model';
import { IStation } from '../catalogs/station.model';
import { ITransferente } from '../catalogs/transferente.model';

export interface IRequest {
  id?: number;
  idRecord?: number;
  applicationDate?: string;
  receptionDate?: string;
  nameOfOwner?: string;
  holderCharge?: string;
  phoneOfOwner?: string;
  emailOfOwner?: string;
  transferenceId?: number | string;
  transferent?: ITransferente;
  stationId?: number | string;
  emisora?: IStation;
  authorityId?: number | string;
  regionalDelegationId?: number | string;
  regionalDelegation?: IRegionalDelegation;
  sender?: string;
  observations?: string;
  targetUser?: string;
  urgentPriority?: string;
  indicatedTaxpayer?: string;
  transferenceFile?: string;
  transferEntNotes?: string;
  idAddress?: number;
  originInfo?: number;
  circumstantialRecord?: string;
  previousInquiry?: string;
  lawsuit?: string;
  protectNumber?: string;
  tocaPenal?: string;
  paperNumber?: string;
  paperDate?: string;
  indicated?: string;
  publicMinistry?: string;
  court?: string;
  crime?: string;
  receiptRoute?: string;
  destinationManagement?: string;
  affair?: number;
  satDeterminant?: string;
  satDirectory?: string;
  authority?: IAuthority;
  satZoneCoordinator?: string;
  userCreated?: string;
  creationDate?: string;
  userModification?: string;
  modificationDate?: string;
  typeOfTransfer?: string;
  domainExtinction?: string;
  version?: string;
  targetUserType?: string;
  trialType?: string;
  typeRecord?: string;
  requestStatus?: string;
  fileLeagueType?: string;
  fileLeagueDate?: string;
  rejectionComment?: string;
  authorityOrdering?: string;
  instanceBpm?: string;
  trial?: string;
  compensationType?: string;
  stateRequestId?: number;
  searchSiab?: number;
  priorityDate?: string;
  ofRejectionsNumber?: number;
  rulingDocumentId?: string;
  reportSheet?: string;
  nameRecipientRuling?: string;
  postRecipientRuling?: string;
  paragraphOneRuling?: string;
  paragraphTwoRuling?: string;
  nameSignatoryRuling?: string;
  postSignatoryRuling?: string;
  ccpRuling?: string;
  rulingCreatorName?: string;
  rulingSheetNumber?: number;
  registrationCoordinatorSae?: string;
  emailNotification?: string;
  keyStateOfRepublic?: number;
  instanceBpel?: number;
  verificationDateCump?: string;
  recordTmpId?: number;
  coordregsae_ktl?: string;
}
