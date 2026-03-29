import type { Category, Manufacturer, ModelItem } from '@/types/data';

export const getManufacturers: () => Promise<Manufacturer[]> = async () => {
	const response = await fetch('https://static.my.ge/myauto/js/mans.json');
	const data = await response.json();
	return data as Manufacturer[];
};

export const getCategoires = async () => {
	const response = await fetch('https://api2.myauto.ge/ka/cats/get');
	const data = await response.json();
	return data as {
		data: Category[];
	};
};

export const getManufacturerModels = async (manufacturerId: number) => {
	const response = await fetch(
		`https://api2.myauto.ge/ka/getManModels?man_id=${manufacturerId}`
	);
	const data = await response.json();
	return data as {
		data: ModelItem[];
	};
};
