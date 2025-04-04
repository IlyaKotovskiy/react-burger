import s from './burger-constructor.module.css';
import { data } from '@utils/data';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useModal } from '../../hooks/useModal';
import { Modal } from '@components/modal';
import DoneIcon from '../../app/assets/done.png';

export const BurgerConstructor: React.FC = (): React.JSX.Element => {
	const { isOpen, openModal, closeModal } = useModal();

	return (
		<div className={s.block}>
			<>
				<div className={s.burgerConstructor}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={'Краторная булка N-200i (верх)'}
						price={data[0].price}
						thumbnail={data[0].image}
					/>
					<div className={s.overflowWrap}>
						<div className={s.dragitem}>
							<DragIcon type='primary' className={s.dragIcon} />
							<ConstructorElement
								text={data[5].name}
								price={data[5].price}
								thumbnail={data[5].image}
							/>
						</div>
						<div className={s.dragitem}>
							<DragIcon type='primary' className={s.dragIcon} />
							<ConstructorElement
								text={data[4].name}
								price={data[4].price}
								thumbnail={data[4].image}
							/>
						</div>
						<div className={s.dragitem}>
							<DragIcon type='primary' className={s.dragIcon} />
							<ConstructorElement
								text={data[7].name}
								price={data[7].price}
								thumbnail={data[7].image}
							/>
						</div>
						<div className={s.dragitem}>
							<DragIcon type='primary' className={s.dragIcon} />
							<ConstructorElement
								text={data[8].name}
								price={data[8].price}
								thumbnail={data[8].image}
							/>
						</div>
						<div className={s.dragitem}>
							<DragIcon type='primary' className={s.dragIcon} />
							<ConstructorElement
								text={data[8].name}
								price={data[8].price}
								thumbnail={data[8].image}
							/>
						</div>
					</div>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={'Краторная булка N-200i (низ)'}
						price={data[0].price}
						thumbnail={data[0].image}
					/>
				</div>
				<div className={s.orderWrap}>
					<span className={s.totalPrice}>
						610 <CurrencyIcon type='primary' />
					</span>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={openModal}>
						Оформить заказ
					</Button>
				</div>
				{isOpen && (
					<Modal onClose={closeModal}>
						<div className={s.modalWrapper}>
							<h2 className={s.modalIdTitle}>034536</h2>
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
