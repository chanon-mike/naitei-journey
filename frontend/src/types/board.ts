// TODO: Update Backend API to use random string instead of number for id

export type ColumnType = {
  id: string; // Should be number, but react-beautiful-dnd requires string
  userId: string;
  type: string;
  name: string;
  cards: CardDetailType[];
};

export type CardDetailType = {
  id: string; // Should be number, but react-beautiful-dnd requires string
  categoryId: string; // Should be number, but react-beautiful-dnd requires string
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
  id: number;
  job_id: string; // Should be number, but react-beautiful-dnd requires string
  process: string;
  date: string;
};

export type SelectionFlowType = {
  id: number;
  job_id: string; // Should be number, but react-beautiful-dnd requires string
  step: number;
  process: string;
};
