import s from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useModal } from '../../hooks/useModal';
import { Modal } from '@components/modal';
import DoneIcon from '../../app/assets/done.png';
import { SyntheticEvent, useMemo } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createOrder } from '@services/actions/order';
import { useSelector } from 'react-redux';
import { RootState } from '../..';
import { useDrop } from 'react-dnd';
import {
	moveIngredientAction,
	setBunAction,
	setConstructorItemsAction,
} from '@services/actions/ingredients';
import { v4 as uuidv4 } from 'uuid';
import { DraggableConstructorIngredient } from './draggable-constructor-ingredient';

export const BurgerConstructor: React.FC = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const orderNumber = useSelector(
		(store: RootState) => store.order.order.number
	);
	const ingredients = useSelector(
		(store: RootState) => store.ingredients.allItems
	);
	const { items, bun } = useSelector(
		(store: RootState) => store.ingredients.constructor
	);

	const { isOpen, openModal, closeModal } = useModal();

	const [, drop] = useDrop({
		accept: 'ingredient',
		drop: (item: { _id: string; type: string }) => {
			const ingredient = ingredients.find((ing) => ing._id === item._id);
			if (!ingredient) return;

			if (item.type === 'bun') {
				dispatch(setBunAction(ingredient));
			} else {
				dispatch(
					setConstructorItemsAction({ ...ingredient, uniqueId: uuidv4() })
				);
			}
		},
	});

	const removeIngredient = (uniqueId: string) => {
		items.filter((item) => item.uniqueId !== uniqueId);
	};

	const calculateTotal = useMemo(() => {
		const ingredientsSum = items.reduce((sum, item) => sum + item.price, 0);
		const bunsSum = bun ? bun.price * 2 : 0;
		return ingredientsSum + bunsSum;
	}, [items, bun]);

	const handleSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		const ingredients = [...items, bun];

		dispatch(createOrder([...ingredients]));
		openModal();
	};

	const moveItem = (fromIndex: number, toIndex: number) => {
		dispatch(moveIngredientAction(fromIndex, toIndex));
	};

	return (
		<div ref={drop} className={s.block}>
			<>
				<div className={s.burgerConstructor}>
					{bun && (
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					)}
					<div className={s.overflowWrap}>
						{items.map((item, index) => (
							<DraggableConstructorIngredient
								key={item.uniqueId}
								item={item}
								index={index}
								onRemove={() => removeIngredient(item.uniqueId)}
								moveItem={moveItem}
							/>
						))}
					</div>
					{bun && (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					)}
				</div>
				<div className={s.orderWrap}>
					<span className={s.totalPrice}>
						{calculateTotal} <CurrencyIcon type='primary' />
					</span>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={handleSubmitForm}>
						Оформить заказ
					</Button>
				</div>
				{isOpen && (
					<Modal onClose={closeModal}>
						<div className={s.modalWrapper}>
							<h2 className={s.modalIdTitle}>{orderNumber}</h2>
							<p className={s.modalIdText}>идентификатор заказа</p>
							<img
								className={s.modalImage}
								src={DoneIcon}
								alt='Картинка с галочкой'
							/>
							<div className={s.modalInfo}>
								<p className='text text_type_main-default mb-2'>
									Ваш заказ начали готовить
								</p>
								<p className='text text_type_main-default text_color_inactive'>
									Дождитесь готовности на орбитальной станции
								</p>
							</div>
						</div>
					</Modal>
				)}
			</>
		</div>
	);
};
