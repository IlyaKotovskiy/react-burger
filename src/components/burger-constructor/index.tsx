import s from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useModal } from '../../hooks/useModal';
import { Modal } from '@components/modal';
import DoneIcon from '../../app/assets/done.png';
import { SyntheticEvent, useEffect } from 'react';
import { createOrder } from '../../services/actions/order';
import { RootState } from '../..';
import { useDrop } from 'react-dnd';
import {
	getTotalConstructorSumAction,
	moveIngredientAction,
	removeIngredientAction,
	setBunAction,
	setConstructorItemsAction,
} from '../../services/actions/ingredients';
import { v4 as uuidv4 } from 'uuid';
import { DraggableConstructorIngredient } from './draggable-constructor-ingredient';
import { checkUserTokenAction } from '../../services/actions/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';

export const BurgerConstructor: React.FC = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const orderNumber = useSelector(
		(store: RootState) => store.order.order.number
	);
	const ingredients = useSelector(
		(store: RootState) => store.ingredients.allItems
	);
	const { items, bun, totalSum } = useSelector(
		(store: RootState) => store.ingredients.constructor
	);

	const { isOpen, openModal } = useModal();

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

	const removeIngredient = (uniqueId: string): void => {
		dispatch(removeIngredientAction(uniqueId));
	};

	const handleSubmitForm = async (e: SyntheticEvent): Promise<void> => {
		e.preventDefault();
		const isAuthenticated = await dispatch(checkUserTokenAction());

		if (!isAuthenticated) {
			navigate('/login', { state: { from: location } });
		}

		const ingredients = [...items, bun];
		dispatch(createOrder([...ingredients]));
		openModal();
	};

	const moveItem = (fromIndex: number, toIndex: number) => {
		dispatch(moveIngredientAction(fromIndex, toIndex));
	};

	useEffect(() => {
		dispatch(getTotalConstructorSumAction());
	}, [bun, items]);

	return (
		<div ref={drop} className={s.block} data-testid='constructor-drop-area'>
			<>
				<div className={s.burgerConstructor}>
					{bun && (
						<ConstructorElement
							type='top'
							data-testid='constructor-bun-top'
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
								uniqueId={item.uniqueId}
								onRemove={removeIngredient}
								moveItem={moveItem}
							/>
						))}
					</div>
					{bun && (
						<ConstructorElement
							type='bottom'
							data-testid='constructor-bun-bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					)}
				</div>
				<div className={s.orderWrap}>
					<span className={s.totalPrice}>
						{totalSum} <CurrencyIcon type='primary' />
					</span>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						data-testid='order-button'
						onClick={handleSubmitForm}>
						Оформить заказ
					</Button>
				</div>
				{isOpen && (
					<Modal dataTestId='order-modal'>
						<div className={s.modalWrapper}>
							<h2 className={s.modalIdTitle} data-testid='order-number'>
								{orderNumber}
							</h2>
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
