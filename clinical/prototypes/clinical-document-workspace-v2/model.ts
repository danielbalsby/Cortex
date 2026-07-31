/**
 * UX experiment v2 reuses the clinical document workspace fact model unchanged.
 * Presentation may change; clinical meaning of facts must not.
 */
export {
  CLINICAL_DOCUMENT_CONTEXT,
  CLINICAL_DOCUMENT_SECTIONS,
  NORMAL_BASIC_FINDINGS,
  createEmptyClinicalDocumentState,
  setPrototypeMode,
  type ClinicalDocumentPrototypeState,
  type ClinicalDocumentSectionDefinition,
  type ImagingAction,
  type ImagingModality,
  type ImagingPlan,
  type ImagingStatus,
  type ListFactKey,
  type NormalFindingDefinition,
  type NormalFindingKey,
  type NormalGroupState,
  type Onset,
  type PainLocation,
  type PainPattern,
  type PlanAction,
  type PrecipitatingFactor,
  type PrototypeFactKey,
  type PrototypeFacts,
  type PrototypeMode,
  type Side,
  type Swelling,
  type TraumaMechanism,
  type WorkingDiagnosis,
  type FunctionStatus
} from "../clinical-document-workspace/model";
