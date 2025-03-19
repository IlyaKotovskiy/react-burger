import s from './draggable-element.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { motion } from 'framer-motion';
import { IDraggableElementProps } from '../../../types/burger-constructor.t';
import { useState } from 'react';

export const DraggableElement: React.FC<IDraggableElementProps> = ({
	ingredient,
	index,
	moveIngredient,
}): React.JSX.Element => {
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		index: number
	): void => {
		e.dataTransfer.setData('text/plain', index.toString());
		setIsDragging(true);
	};
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
		e.preventDefault();
	};
	const handleDragEnd = (): void => {
		setIsDragging(false);
	};
	const handleDrop = (
		e: React.DragEvent<HTMLDivElement>,
		targetIndex: number
	): void => {
		const fromIndex = Number(e.dataTransfer.getData('text/plain'));
		moveIngredient(fromIndex, targetIndex);
	};
	return (
		<motion.div
			style={{ pointerEvents: 'auto' }}
			className={isDragging ? s.dragging : s.dragitem}
			draggable
			onDragStart={(e) =>
				handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, index)
			}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDrop={(e) => handleDrop(e, index)}
			layout
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 20,
				duration: 0.3,
			}}>
			<DragIcon type='primary' className={s.dragIcon} />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
			/>
		</motion.div>
	);
};
