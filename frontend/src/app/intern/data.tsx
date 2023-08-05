import type { ColumnType } from '@/components/board/Board';

export type CardDetailType = {
  id: string;
  companyName: string;
  rank: string;
  industry: string;
  role: string;
  date: string;
  period: string;
  start: string;
  end: string;
  URL: string;
  memo: string;
};

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
    id: 'board1',
    title: '気になる',
    cards: [
      {
        id: 'card00',
        companyName: 'Test00',
        rank: 'S',
        industry: 'IT',
        role: 'SE',
        date: '3',
        period: 'months',
        start: '4/1',
        end: '6/30',
        URL: 'https://test.com',
        memo: 'test',
      },
      {
        id: 'card01',
        companyName: 'Test01',
        rank: 'S',
        industry: 'IT',
        role: 'SE',
        date: '3',
        period: 'months',
        start: '4/1',
        end: '6/30',
        URL: 'https://test.com',
        memo: 'memo01',
      },
    ],
  },
  {
    id: 'board2',
    title: '選考中',
    cards: [
      {
        id: 'card02',
        companyName: 'Test02',
        rank: 'S',
        industry: 'IT',
        role: 'SE',
        date: '3',
        period: 'months',
        start: '4/1',
        end: '6/30',
        URL: 'https://test.com',
        memo: 'memo02',
      },
    ],
  },
  {
    id: 'board3',
    title: '内定',
    cards: [
      {
        id: 'card03',
        companyName: 'Test03',
        rank: 'S',
        industry: 'IT',
        role: 'SE',
        date: '3',
        period: 'months',
        start: '4/1',
        end: '6/30',
        URL: 'https://test.com',
        memo: 'memo04',
      },
      {
        id: 'card04',
        companyName: 'Test04',
        rank: 'A',
        industry: 'IT',
        role: 'SE',
        date: '1',
        period: '月',
        start: '4/1',
        end: '6/30',
        URL: 'https://test04.com',
        memo: 'memo04',
      },
    ],
  },
  {
    id: 'board4',
    title: '不通過',
    cards: [
      {
        id: 'card05',
        companyName: 'Test05',
        rank: 'S',
        industry: 'IT',
        role: 'SE',
        date: '3',
        period: 'months',
        start: '4/1',
        end: '6/30',
        URL: 'https://test05.com',
        memo: 'memo05',
      },
    ],
  },
];
