import s from './burger-constructor.module.css';
import { IBurgerConstructorProps } from '../../types/burger-constructor.t';
import { DraggableElement } from './draggable-element';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({
	bun,
	constructorIngredients,
	totalPrice,
	moveIngredient,
}): React.JSX.Element => {
	return (
		<div className={s.block}>
			{constructorIngredients.length || bun ? (
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
							{constructorIngredients.map((ingredient, index) => (
								<DraggableElement
									key={ingredient._id}
									ingredient={ingredient}
									index={index}
									moveIngredient={moveIngredient}
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
							{totalPrice} <CurrencyIcon type='primary' />
						</span>
						<Button htmlType='button' type='primary' size='large'>
							Оформить заказ
						</Button>
					</div>
				</>
			) : (
				<div className={s.noneIngredientsWrap}>
					<p className='text text_type_main-default text_color_inactive'>
						Выберите любые ингридиенты и соберите из них бургер!
					</p>
				</div>
			)}
		</div>
	);
};
