
import type { CardDetailType, ColumnType } from '@/types/board';


// 新しいカード詳細を追加する関数
export const addCardDetail = (detail: CardDetailType) => {
  data[0].cards.push(detail);
};

// すべてのカード詳細を取得する関数
/*export const getCardDetails = (): CardDetailType[] => {
  return data2
};*/

export const data: ColumnType[] = [
  {
    id: '1',
    userId: 'google-oauth2|216163639553786874428',
    type: 'インターンシップ',
    name: '気になる',
    cards: [
      {
        id: 'card00',
        categoryId: '1',
        cardPosition: 1,
        companyName: 'Test00',
        companyIndustry: 'IT',
        occupation: 'SE',
        ranking: 'S',
        isInternship: true,
        internshipDuration: 3,
        internshipPeriod: 'months',
        internshipStartDate: '2023-04-01',
        internshipEndDate: '2023-06-30',
        url: 'https://test.com',
        description: 'test',
        applicationStatus: {
          id: 1,
          job_id: 'card00',
          process: 'ES',
          date: '2023-04-01',
        },
        selectionFlows: [
          {
            id: 1,
            job_id: 'card00',
            step: 1,
            process: 'ES',
          },
        ],
      },
      {
        id: 'card01',
        categoryId: '1',
        cardPosition: 2,
        companyName: 'Test01',
        companyIndustry: 'IT',
        occupation: 'SE',
        ranking: 'S',
        isInternship: true,
        internshipDuration: 3,
        internshipPeriod: 'months',
        internshipStartDate: '2023-04-01',
        internshipEndDate: '2023-06-30',
        url: 'https://test.com',
        description: 'memo01',
        applicationStatus: {
          id: 2,
          job_id: 'card01',
          process: 'ES',
          date: '2023-04-01',
        },
        selectionFlows: [],
      },
    ],
  },
  {
    id: '2',
    userId: 'google-oauth2|216163639553786874428',
    type: 'インターンシップ',
    name: '選考中',
    cards: [
      {
        id: 'card02',
        categoryId: '2',
        cardPosition: 1,
        companyName: 'Test02',
        companyIndustry: 'IT',
        occupation: 'SE',
        ranking: 'S',
        isInternship: true,
        internshipDuration: 3,
        internshipPeriod: 'months',
        internshipStartDate: '2023-04-01',
        internshipEndDate: '2023-06-30',
        url: 'https://test.com',
        description: 'memo02',
        applicationStatus: {
          id: 3,
          job_id: 'card02',
          process: 'ES',
          date: '2023-04-01',
        },
        selectionFlows: [],
      },
    ],
  },
  {
    id: '3',
    userId: 'google-oauth2|216163639553786874428',
    type: 'インターンシップ',
    name: '内定',
    cards: [
      {
        id: 'card03',
        categoryId: '3',
        cardPosition: 1,
        companyName: 'Test03',
        companyIndustry: 'IT',
        occupation: 'SE',
        ranking: 'S',
        isInternship: true,
        internshipDuration: 3,
        internshipPeriod: 'months',
        internshipStartDate: '2023-04-01',
        internshipEndDate: '2023-06-30',
        url: 'https://test.com',
        description: 'memo04',
        applicationStatus: {
          id: 4,
          job_id: 'card03',
          process: 'ES',
          date: '2023-04-01',
        },
        selectionFlows: [],
      },
      {
        id: 'card04',
        categoryId: '3',
        cardPosition: 2,
        companyName: 'Test04',
        companyIndustry: 'IT',
        occupation: 'SE',
        ranking: 'A',
        isInternship: true,
        internshipDuration: 1,
        internshipPeriod: '月',
        internshipStartDate: '2023-04-01',
        internshipEndDate: '2023-06-30',
        url: 'https://test04.com',
        description: 'memo04',
        applicationStatus: {
          id: 5,
          job_id: 'card04',
          process: 'ES',
          date: '2023-04-01',
        },
        selectionFlows: [],
      },
    ],
  },
  {
    id: '4',
    userId: 'google-oauth2|216163639553786874428',
    type: 'インターンシップ',
    name: '不通過',
    cards: [
      {
        id: 'card05',
        categoryId: '4',
        cardPosition: 1,
        companyName: 'Test05',
        companyIndustry: 'IT',
        occupation: 'SE',
        ranking: 'S',
        isInternship: true,
        internshipDuration: 3,
        internshipPeriod: 'months',
        internshipStartDate: '2023-04-01',
        internshipEndDate: '2023-06-30',
        url: 'https://test05.com',
        description: 'memo05',
        applicationStatus: {
          id: 6,
          job_id: 'card05',
          process: 'ES',
          date: '2023-04-01',
        },
        selectionFlows: [],
      },
    ],
  },
];