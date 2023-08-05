// TODO: Update Backend API to use random string instead of number for id

export type ColumnType = {
  id: string;
  userId: string;
  type: string;
  name: string;
  cards: CardDetailType[];
};

export type CardDetailType = {
  id: string;
  categoryId: string;
  cardPosition: number;
  companyName: string;
  companyIndustry: string;
  occupation: string;
  ranking: string;
  isInternship: boolean;
  internshipDuration: number;
  internshipPeriod: string;
  internshipStartDate: string;
  internshipEndDate: string;
  url: string;
  description: string;
  applicationStatus: ApplicationStatusType;
  selectionFlows: SelectionFlowType[];
};

export type ApplicationStatusType = {
  id: string;
  job_id: string;
  process: string;
  date: string;
};

export type SelectionFlowType = {
  id: string;
  job_id: string;
  step: number;
  process: string;
};
