interface FieldTrainee {
  application_id: number;
  student_gcn: string;
  student_name: string;
  start_date: string;
  end_date: string;
}

interface Acceptance {
  acceptance_id: number;
  student_gcn: string;
  student_name: string;
  contract_date: string;
}

export interface AcceptanceDetailResponse {
  field_trainees_response: FieldTrainee[];
  acceptances_response: Acceptance[];
}

export interface UpdateFieldTrainRequest {
  application_ids: number[];
  start_date: string;
  end_date: string;
}

export interface UpdateContractDateRequest {
  acceptance_ids: number[];
  contract_date: string;
}

export interface CreateEmploymentRequest {
  code_keywords: string[];
  application_ids: number[];
}

export interface DeleteAcceptanceRequest {
  application_ids: number[];
}
