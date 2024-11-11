import { create } from 'zustand';

type UseBtnFloatingExpansible = {
	isChildrenVisible: boolean;
	onChangeChildrenVisible: (isChildrenVisible: boolean) => void;
};

export const useBtnFloatingExpansible = create<UseBtnFloatingExpansible>((set) => ({
	isChildrenVisible: false,
	onChangeChildrenVisible: (isChildrenVisible: boolean) => set(() => ({ isChildrenVisible })),
}));
