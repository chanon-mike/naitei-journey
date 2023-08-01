import type { ColumnType } from '@/components/board/Board';

export const data: ColumnType[] = [
  {
    id: 'board1',
    title: '気になる',
    cards: [
      {
        id: 'card0',
        title: 'SMBC',
        rank: 'S',
        state: 'ES未完了',
      },
      {
        id: 'card1',
        title: '三菱UFJ',
        rank: 'A',
        state: '1次面接結果待ち',
      },
    ],
  },
  {
    id: 'board2',
    title: '選考中',
    cards: [
      {
        id: 'card3',
        title: 'りそな銀行',
        rank: 'B',
        state: '1次面接結果待ち',
      },
      {
        id: 'card4',
        title: 'みずほ銀行',
        rank: 'A',
        state: '1次面接通過',
      },
    ],
  },
  {
    id: 'board3',
    title: '内定',
    cards: [
      {
        id: 'card5',
        title: 'ゆうたむ銀行',
        rank: 'S',
        state: '内定',
      },
    ],
  },
  {
    id: 'board4',
    title: '不通過',
    cards: [],
  },
];
