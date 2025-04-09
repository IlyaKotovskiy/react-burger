import s from './app.module.scss';
import { AppHeader } from '@components/app-header';
import { BurgerConstructor } from '@components/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const App = () => {
	return (
		<>
			<AppHeader />
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
		</>
	);
};
