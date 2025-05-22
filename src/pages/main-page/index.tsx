import s from './main-page.module.css';
import { BurgerConstructor } from '@components/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const MianPage: React.FC = (): React.JSX.Element => {
	return (
		<section>
			<div className='container'>
				<div className={s.wrap}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				</div>
			</div>
		</section>
	);
};
