// TODO: Update Backend API to use random string instead of number for id

export interface ColumnType {
  id: string;
  user_id: string;
  type: string;
  name: string;
  jobs: CardDetailType[];
}

export interface CardDetailBase {
  category_id: string;
  card_position: number;
  company_name: string;
  company_industry: string;
  occupation: string;
  ranking: string;
  is_internship: boolean;
  internship_duration: string;
  internship_start_date: string;
  internship_end_date: string;
  url: string;
  description: string;
}

export type CompanyDetailType = {
  id: string;
};

export interface ApplicationStatusBase {
  status: string;
  process: string;
  date: string;
}

export interface SelectionFlowBase {
  step: number;
  process: string;
}

export interface FullJobBase {
  job: CardDetailBase;
  application_status: ApplicationStatusBase;
  selection_flows: SelectionFlowBase[];
}

export interface CardDetailType extends CardDetailBase {
  id: string;
}

export interface ApplicationStatusType extends ApplicationStatusBase {
  id: string;
  job_id: string;
}

export interface SelectionFlowType extends SelectionFlowBase {
  id: string;
  job_id: string;
}
