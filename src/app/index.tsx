import s from './app.module.scss';
import { AppHeader } from '@components/app-header';
import { BurgerConstructor } from '@components/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients';
import { useState } from 'react';
import { IIngredientData } from '../types/data.t';

export const App = () => {
	const [bun, setBun] = useState<IIngredientData | null>(null);
	const [ingredients, setIngredients] = useState<IIngredientData[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const handleIngredientClick = (ingredient: IIngredientData): void => {
		if (ingredient.type === 'bun') {
			setBun(ingredient);
			setTotalPrice((prevPrice) => prevPrice + ingredient.price);
		} else {
			setIngredients([...ingredients, ingredient]);
			setTotalPrice((prevPrice) => prevPrice + ingredient.price);
		}
	};

	const moveIngredient = (fromIndex: number, toIndex: number): void => {
		const newIngredients = [...ingredients];
		const [removed] = newIngredients.splice(fromIndex, 1);
		newIngredients.splice(toIndex, 0, removed);
		setIngredients(newIngredients);
	};

	return (
		<>
			<AppHeader />
			<section>
				<div className='container'>
					<div className={s.wrap}>
						<BurgerIngredients onIngredientClick={handleIngredientClick} />
						<BurgerConstructor
							bun={bun}
							ingredients={ingredients}
							totalPrice={totalPrice}
							moveIngredient={moveIngredient}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
