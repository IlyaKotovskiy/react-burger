import s from './modal.module.css';
import { IModalProps } from '../../types/modal.t';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const Modal: React.FC<IModalProps> = ({
	title,
	children,
	onClose,
}): React.JSX.Element | null => {
	const modalRoot = document.body;

	if (!modalRoot) {
		console.error('Modal root element not found!');
		return null;
	}

	return createPortal(
		<AnimatePresence mode='wait' onExitComplete={onClose}>
			<motion.div
				initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
				animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
				exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
				onClick={onClose}
				className={s.popup}>
				<motion.div
					className={s.modal}
					initial={{ opacity: 0, translateY: 35, scale: 0.9 }}
					animate={{ opacity: 1, translateY: 0, scale: 1 }}
					exit={{ opacity: 0, translateY: 35, scale: 0.9 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
					onClick={(e) => e.stopPropagation()}>
					{title && <h2 className={s.title}>{title}</h2>}
					<button type='button' className={s.closeBtn} onClick={onClose}>
						<span></span>
						<span></span>
					</button>
					{children}
				</motion.div>
			</motion.div>
		</AnimatePresence>,
		modalRoot
	);
};
