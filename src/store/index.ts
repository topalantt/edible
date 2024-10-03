import { create } from 'zustand';
import { edibleList, inedibleList } from './data';

interface EdibleState {
  edibleList: string[];
  inedibleList: string[];
  history: { word: string; result: string; timestamp: string }[];
  getEdibleStatus: (word: string) => string;
  addEdible: (word: string) => void;
  removeEdible: (word: string) => void;
  addInedible: (word: string) => void;
  removeInedible: (word: string) => void;
  setHistory: (newHistory: EdibleState['history']) => void;
}

const getHistory = () => {
  const savedHistory = localStorage.getItem('history');
  return savedHistory ? JSON.parse(savedHistory) : [];
};

export const useStore = create<EdibleState>()((set) => ({
  edibleList,
  inedibleList,
  history: getHistory(),
  getEdibleStatus: (word) => {
    let status;
    if (edibleList.includes(word)) {
      status = 'edible';
    } else if (inedibleList.includes(word)) {
      status = 'inedible';
    } else {
      status = 'unknown';
    }

    return status;
  },
  addEdible: (word) => set((state) => ({ ...state, edibleList: [...state.edibleList, word] })),
  removeEdible: (word) => set((state) => ({ ...state, edibleList: state.edibleList.filter((item) => item !== word) })),
  addInedible: (word) => set((state) => ({ ...state, inedibleList: [...state.inedibleList, word] })),
  removeInedible: (word) => set((state) => ({ ...state, inedibleList: state.inedibleList.filter((item) => item !== word) })),
  setHistory: (newHistory) => set((state) => ({ ...state, history: newHistory }))
}));

export default useStore;
