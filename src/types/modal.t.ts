export interface IUseModal {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export interface IModalProps {
	title?: string;
	children: React.ReactNode;
	onClose: () => void;
}
