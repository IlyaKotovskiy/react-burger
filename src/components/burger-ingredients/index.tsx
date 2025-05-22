import s from './burger-ingredients.module.css';
import { useEffect, useMemo } from 'react';
import { filteredIngredientsByType } from '@utils/filteredIngredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from './ingredient-card';
import { EIngredientTypes } from '../../types/burger-ingredients.t';
import { IIngredientData } from '../../types/data.t';
import { useSelector } from 'react-redux';
import { RootState } from '../..';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
	getIngredients,
	setCurrentIngredientAction,
	setCurrentTabAction,
} from '@services/actions/ingredients';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerIngredients: React.FC = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const ingredients: Array<IIngredientData> = useSelector(
		(store: RootState) => store.ingredients.allItems
	);
	const currentTab = useSelector(
		(store: RootState) => store.ingredients.currentTab
	);

	const constructorIngredients = useSelector(
		(store: RootState) => store.ingredients.constructor.items
	);
	const bun = useSelector(
		(store: RootState) => store.ingredients.constructor.bun
	);

	const buns = useMemo<Array<IIngredientData>>(
		() => filteredIngredientsByType(ingredients)('bun'),
		[ingredients]
	);
	const sauces = useMemo<Array<IIngredientData>>(
		() => filteredIngredientsByType(ingredients)('sauce'),
		[ingredients]
	);
	const main = useMemo<Array<IIngredientData>>(
		() => filteredIngredientsByType(ingredients)('main'),
		[ingredients]
	);

	const countIngredients = useMemo<Record<string, number>>(() => {
		const counts: Record<string, number> = {};

		if (bun) {
			counts[bun._id] = 2;
		}

		constructorIngredients.forEach((item) => {
			counts[item._id] = (counts[item._id] || 0) + 1;
		});

		return counts;
	}, [constructorIngredients, bun]);

	const handleTabClick = (type: EIngredientTypes): void => {
		dispatch(setCurrentTabAction(type));
		document.getElementById(type)?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleIngredientClick = (ingredient: IIngredientData, id: string) => {
		dispatch(setCurrentIngredientAction(ingredient));
		navigate(`/ingredients/${id}`, { state: { background: location } });
	};

	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	return (
		<div className={s.block}>
			<h1 className={s.title}>Соберите бургер</h1>
			<div className={s.tabs}>
				<Tab
					value={EIngredientTypes.BUNS}
					active={currentTab === EIngredientTypes.BUNS}
					onClick={() => handleTabClick(EIngredientTypes.BUNS)}>
					Булки
				</Tab>
				<Tab
					value={EIngredientTypes.SAUCES}
					active={currentTab === EIngredientTypes.SAUCES}
					onClick={() => handleTabClick(EIngredientTypes.SAUCES)}>
					Соусы
				</Tab>
				<Tab
					value={EIngredientTypes.MAIN}
					active={currentTab === EIngredientTypes.MAIN}
					onClick={() => handleTabClick(EIngredientTypes.MAIN)}>
					Начинки
				</Tab>
			</div>
			<ul className={s.list}>
				<li className={s.listItem} id={EIngredientTypes.BUNS}>
					<h2 className={s.subTitle}>Булки</h2>
					<div className={s.ingredients}>
						{buns.map((elem) => (
							<IngredientCard
								key={elem._id}
								onClick={() => handleIngredientClick(elem, elem._id)}
								count={countIngredients[elem._id || 0]}
								{...elem}
							/>
						))}
					</div>
				</li>
				<li className={s.listItem} id={EIngredientTypes.SAUCES}>
					<h2 className={s.subTitle}>Соусы</h2>
					<div className={s.ingredients}>
						{sauces.map((elem) => (
							<IngredientCard
								key={elem._id}
								onClick={() => handleIngredientClick(elem, elem._id)}
								count={countIngredients[elem._id || 0]}
								{...elem}
							/>
						))}
					</div>
				</li>
				<li className={s.listItem} id={EIngredientTypes.MAIN}>
					<h2 className={s.subTitle}>Начинки</h2>
					<div className={s.ingredients}>
						{main.map((elem) => (
							<IngredientCard
								key={elem._id}
								onClick={() => handleIngredientClick(elem, elem._id)}
								count={countIngredients[elem._id || 0]}
								{...elem}
							/>
						))}
					</div>
				</li>
			</ul>
		</div>
	);
};
