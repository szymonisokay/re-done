import { create } from 'zustand'

type ModalType = 'createTask'

type ModalStore = {
	open: boolean
	type: ModalType | null
	onOpen: (type: ModalType) => void
	onClose: () => void
}

export const useModalState = create<ModalStore>((set) => ({
	open: false,
	type: null,
	onOpen: (type: ModalType) => set({ open: true, type }),
	onClose: () => set({ open: false, type: null }),
}))
