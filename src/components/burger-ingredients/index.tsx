import s from './burger-ingredients.module.css';
import { useMemo, useState } from 'react';
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

export const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({
	ingredients,
}): React.JSX.Element => {
	const [currentTab, setCurrentTab] = useState<string>(EIngredientTypes.BUNS);
	const [currentIngredient, setCurrentIngredient] =
		useState<IIngredientData | null>(null);
	const { isOpen, openModal, closeModal } = useModal();

	const buns = useMemo(
		() => filteredIngredientsByType(ingredients)('bun'),
		[ingredients]
	);
	const sauces = useMemo(
		() => filteredIngredientsByType(ingredients)('sauce'),
		[ingredients]
	);
	const main = useMemo(
		() => filteredIngredientsByType(ingredients)('main'),
		[ingredients]
	);

	const handleTabClick = (type: EIngredientTypes): void => {
		setCurrentTab(type);
		document.getElementById(type)?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleIngredientClick = (ingredient: IIngredientData) => {
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
								onClick={() => handleIngredientClick(elem)}
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
								onClick={() => handleIngredientClick(elem)}
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
								onClick={() => handleIngredientClick(elem)}
								{...elem}
							/>
						))}
					</div>
				</li>
			</ul>
			{isOpen && currentIngredient && (
				<Modal title={'Детали ингредиента'} onClose={closeModal}>
					<div>
						<img
							src={currentIngredient.image}
							alt={currentIngredient.name}
							className={s.modalImage}
						/>
						<h3 className={s.modalIngredientTitle}>{currentIngredient.name}</h3>
						<ul className={s.modalIngredientListInfo}>
							<li className={s.modalIngredientListItem}>
								<p>Калории,ккал</p>
								<span className={s.modalDigits}>
									{currentIngredient.calories}
								</span>
							</li>
							<li className={s.modalIngredientListItem}>
								<p>Белки, г</p>
								<span className={s.modalDigits}>
									{currentIngredient.proteins}
								</span>
							</li>
							<li className={s.modalIngredientListItem}>
								<p>Жиры, г</p>
								<span className={s.modalDigits}>{currentIngredient.fat}</span>
							</li>
							<li className={s.modalIngredientListItem}>
								<p>Углеводы, г</p>
								<span className={s.modalDigits}>
									{currentIngredient.carbohydrates}
								</span>
							</li>
						</ul>
					</div>
				</Modal>
			)}
		</div>
	);
};
