// Type end with Base is the type that is not included id
// Type end with Create is the type that is used for create new data
// Type end with Update is the type that is used for update data
// Type that is not end with Base, Create or Update is the type that is used for get data

export interface Category {
  id: string;
  user_id: string;
  type: string;
  name: string;
  jobs: Job[];
}

export interface JobBase {
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

export interface ApplicationStatusBase {
  status: string;
  process: string;
  date: string;
}

export interface SelectionFlowBase {
  step: number;
  process: string;
}

export interface Job extends JobBase {
  id: string;
}

export interface ApplicationStatus extends ApplicationStatusBase {
  id: string;
  job_id: string;
}

export interface SelectionFlow extends SelectionFlowBase {
  id: string;
  job_id: string;
}

// FullJob is the type of the data included job, application_status and selection_flows

export interface FullJobCreate {
  job: JobBase;
  application_status: ApplicationStatusBase;
  selection_flows: SelectionFlowBase[];
}

export interface FullJobUpdate {
  job: JobBase;
  application_status: ApplicationStatusBase;
  selection_flows: SelectionFlow[];
}
