import s from './modal.module.css';
import { IModalProps } from '../../types/modal.t';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const Modal: React.FC<IModalProps> = ({
	onClose,
	ingredient,
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
					<h2 className={s.title}>Детали ингредиента</h2>
					<button type='button' className={s.closeBtn} onClick={onClose}>
						<span></span>
						<span></span>
					</button>
					<div className={s.wrapper}>
						<img
							src={ingredient.image}
							alt={ingredient.name}
							className={s.image}
						/>
						<h3 className='text text_type_main-medium'>{ingredient.name}</h3>
						<ul className={s.ingredientInfo}>
							<li className='text text_type_main-default text_color_inactive'>
								<p>Калории,ккал</p>
								<span className={s.digits}>{ingredient.calories}</span>
							</li>
							<li className='text text_type_main-default text_color_inactive'>
								<p>Белки, г</p>
								<span className={s.digits}>{ingredient.proteins}</span>
							</li>
							<li className='text text_type_main-default text_color_inactive'>
								<p>Жиры, г</p>
								<span className={s.digits}>{ingredient.fat}</span>
							</li>
							<li className='text text_type_main-default text_color_inactive'>
								<p>Углеводы, г</p>
								<span className={s.digits}>{ingredient.carbohydrates}</span>
							</li>
						</ul>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>,
		modalRoot
	);
};
