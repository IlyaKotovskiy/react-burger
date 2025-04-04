import { useState } from 'react';
import { IUseModal } from '../types/modal.t';

export const useModal = (): IUseModal => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return { isOpen, openModal, closeModal };
};
