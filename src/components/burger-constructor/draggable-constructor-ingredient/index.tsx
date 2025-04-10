import s from './draggable-constructor-ingredient.module.css';
import { useDrag, useDrop } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IConstructorIngredient } from '../../../types/store/ingredients.t';

interface IDraggableConstructorIngredientProps {
	index: number;
	item: IConstructorIngredient;
	uniqueId: string;
	onRemove: (uniqueId: string) => void;
	moveItem: (fromIndex: number, toIndex: number) => void;
}

export const DraggableConstructorIngredient: React.FC<
	IDraggableConstructorIngredientProps
> = (props): React.JSX.Element => {
	const { index, item, uniqueId, onRemove, moveItem } = props;

	const [, drag] = useDrag({
		type: 'constructorItem',
		item: { index },
	});

	const [, drop] = useDrop({
		accept: 'constructorItem',
		hover: (draggedItem: { index: number }) => {
			if (draggedItem.index !== index) {
				moveItem(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
	});

	return (
		<div ref={(node) => drag(drop(node))} className={s.dragItem}>
			<DragIcon type='primary' className={s.dragIcon} />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				handleClose={() => onRemove(uniqueId)}
			/>
		</div>
	);
};
