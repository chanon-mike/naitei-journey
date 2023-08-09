import type { Category } from '@/types/board';
import { atom } from 'jotai';

export const columnsAtom = atom<Category[]>([]);
