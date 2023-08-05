// TODO: Update Backend API to use random string instead of number for id

export type ColumnType = {
  id: string;
  user_id: string;
  type: string;
  name: string;
  jobs: CardDetailType[];
};

export type CardDetailType = {
  id: string;
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
  application_status: ApplicationStatusType;
  selection_flows: SelectionFlowType[];
};

export type ApplicationStatusType = {
  id: string;
  job_id: string;
  status: string;
  process: string;
  date: string;
};

export type SelectionFlowType = {
  id: string;
  job_id: string;
  step: number;
  process: string;
};
