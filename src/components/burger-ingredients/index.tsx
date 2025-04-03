import s from './burger-ingredients.module.css';
import { useState } from 'react';
import { filteredIngredientsByType } from '@utils/filteredIngredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from './ingredient-card';
import {
	EIngredientTypes,
	IBurgerIngredientsProps,
} from '../../types/burger-ingredients.t';
import { Modal } from '@components/modal';
import { IIngredientData } from '../../types/data.t';
import { useModal } from '../../hooks/useModal';
import { data } from '@utils/data';

export const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({
	ingredients,
	// onIngredientClick,
}): React.JSX.Element => {
	const [currentTab, setCurrentTab] = useState<string>(EIngredientTypes.BUNS);
	const [currentIngredient, setCurrentIngredient] = useState<IIngredientData>(
		data[0]
	);
	const { isOpen, openModal, closeModal } = useModal();

	const buns = filteredIngredientsByType(ingredients)('bun');
	const sauces = filteredIngredientsByType(ingredients)('sauce');
	const main = filteredIngredientsByType(ingredients)('main');

	const handleTabClick = (type: EIngredientTypes): void => {
		setCurrentTab(type);
		document.getElementById(type)?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleClick = (ingredient: IIngredientData) => {
		setCurrentIngredient(ingredient);
		openModal();
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
								onClick={() => handleClick(elem)}
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
								onClick={() => handleClick(elem)}
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
								onClick={() => handleClick(elem)}
								{...elem}
							/>
						))}
					</div>
				</li>
			</ul>
			{isOpen && <Modal ingredient={currentIngredient} onClose={closeModal} />}
		</div>
	);
};
