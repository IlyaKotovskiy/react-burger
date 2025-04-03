import s from './app.module.scss';
import { AppHeader } from '@components/app-header';
import { BurgerConstructor } from '@components/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients';
import { useEffect, useState } from 'react';
import { IIngredientData } from '../types/data.t';

export const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
	const [bun, setBun] = useState<IIngredientData | null>(null);
	const [ingredients, setIngredients] = useState<IIngredientData[]>([]);
	const [constructorIngredients, setConstructorIngredients] = useState<
		IIngredientData[]
	>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const handleIngredientClick = (ingredient: IIngredientData): void => {
		if (ingredient.type === 'bun') {
			setBun(ingredient);
			setTotalPrice((prevPrice) => prevPrice + ingredient.price);
		} else {
			setConstructorIngredients([...constructorIngredients, ingredient]);
			setTotalPrice((prevPrice) => prevPrice + ingredient.price);
		}
	};

	const moveIngredient = (fromIndex: number, toIndex: number): void => {
		const newIngredients = [...constructorIngredients];
		const [removed] = newIngredients.splice(fromIndex, 1);
		newIngredients.splice(toIndex, 0, removed);
		setConstructorIngredients(newIngredients);
	};

	useEffect(() => {
		fetch(BASE_URL)
			.then((res) => res.json())
			.then((data) => setIngredients([...data.data]));
	}, []);

	return (
		<>
			<AppHeader />
			<section>
				<div className='container'>
					<div className={s.wrap}>
						<BurgerIngredients
							ingredients={ingredients}
							onIngredientClick={handleIngredientClick}
						/>
						<BurgerConstructor
							bun={bun}
							constructorIngredients={constructorIngredients}
							totalPrice={totalPrice}
							moveIngredient={moveIngredient}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
