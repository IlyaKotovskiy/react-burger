import { ChangeEvent, useRef, useState } from 'react';
import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useOutletContext } from 'react-router-dom';
import s from './profile-form.module.css';

type FormDataType = {
	name: string;
	login: string;
	password: string;
};

type OutletContextType = {
	formData: FormDataType;
};

export const ProfileForm: React.FC = () => {
	const { formData: initialData } = useOutletContext<OutletContextType>();

	const [formData, setFormData] = useState<FormDataType>(initialData);
	const [disabledNameInput, setDisabledNameInput] = useState(true);
	const nameInputRef = useRef<HTMLInputElement>(null);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onIconClick = (): void => {
		setTimeout(() => nameInputRef.current?.focus(), 0);
		setDisabledNameInput(false);
	};

	return (
		<form>
			<Input
				extraClass={s.input}
				onChange={handleOnChange}
				value={formData.name}
				name='name'
				placeholder='Имя'
				icon='EditIcon'
				disabled={disabledNameInput}
				onBlur={() => setDisabledNameInput(true)}
				onIconClick={onIconClick}
				ref={nameInputRef}
			/>
			<EmailInput
				extraClass={s.input}
				onChange={handleOnChange}
				value={formData.login}
				name='login'
				placeholder='Логин'
				isIcon
			/>
			<PasswordInput
				extraClass={s.input}
				onChange={handleOnChange}
				value={formData.password}
				name='password'
				placeholder='Пароль'
				icon='EditIcon'
			/>
		</form>
	);
};
