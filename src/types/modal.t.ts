import { IIngredientData } from './data.t';

export interface IUseModal {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export interface IModalProps {
	onClose: () => void;
	ingredient: IIngredientData;
}
