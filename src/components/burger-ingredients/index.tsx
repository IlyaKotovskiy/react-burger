import s from './burger-ingredients.module.css';
import { useState } from 'react';
import { filteredIngredientsByType } from '@utils/filteredIngredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from './ingredient-card';
import {
	EIngredientTypes,
	IBurgerIngredientsProps,
} from '../../types/burger-ingredients.t';

export const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({
	onIngredientClick,
}): React.JSX.Element => {
	const [currentTab, setCurrentTab] = useState<string>(EIngredientTypes.BUNS);

	const buns = filteredIngredientsByType('bun');
	const sauces = filteredIngredientsByType('sauce');
	const main = filteredIngredientsByType('main');

	const handleTabClick = (type: EIngredientTypes): void => {
		setCurrentTab(type);
		document.getElementById(type)?.scrollIntoView({ behavior: 'smooth' });
	};

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
								onClick={() => onIngredientClick(elem)}
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
								onClick={() => onIngredientClick(elem)}
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
								onClick={() => onIngredientClick(elem)}
								{...elem}
							/>
						))}
					</div>
				</li>
			</ul>
		</div>
	);
};
