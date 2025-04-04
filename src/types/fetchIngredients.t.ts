import { IIngredientData } from './data.t';

export interface IResponseServer {
	success: boolean;
	data: IIngredientData[];
}
