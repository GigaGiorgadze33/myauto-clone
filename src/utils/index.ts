import { FUEL_TYPES } from '@/config/constants';
import type { ProductItem } from '@/types/data';
import type { SelectOption } from '@/types/filter';

export const getAllCarPhotos = (product: {
	photo: string;
	car_id: number;
	photo_ver: number;
	pic_number: number;
}): string[] => {
	const { photo, car_id, photo_ver, pic_number } = product;
	const urls: string[] = [];

	for (let i = 1; i <= pic_number; i++) {
		urls.push(
			`https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_${i}.jpg?v=${photo_ver}`
		);
	}

	return urls;
};

export const timeAgo = (date: string) => {
	const seconds = Math.floor(
		(Number(new Date()) - Number(new Date(date))) / 1000
	);

	const intervals = [
		{ label: 'წლის', seconds: 31536000 },
		{ label: 'თვის', seconds: 2592000 },
		{ label: 'დღის', seconds: 86400 },
		{ label: 'საათის', seconds: 3600 },
		{ label: 'წუთის', seconds: 60 },
	];

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label} წინ`;
		}
	}

	return 'ახლახანს';
};

export const getEngineSpec = (data: ProductItem): string => {
	const liters = (data.engine_volume / 1000).toFixed(1);
	const fuelLabel =
		FUEL_TYPES[data.fuel_type_id as keyof typeof FUEL_TYPES] || '';

	return `${liters} ${fuelLabel}`;
};

/**
 * This prices are a bit off but im not sure how to calculate taxes correctly,
 * this is based on AI suggestions
 */
const getExciseRate = (year: number): number => {
	const age = 2026 - year;
	if (age <= 3) return 1.5;
	if (age <= 6) return 2.1;
	return 4.5;
};

export const getCustomsPrice = (car: ProductItem) => {
	const age = new Date().getFullYear() - car.prod_year;
	const volume = car.engine_volume;

	const exciseRate = getExciseRate(car.prod_year);
	const excise = volume * exciseRate;

	const importTax = volume * 0.05 + volume * age * 0.0025;

	const serviceFees = 318;

	const total = Math.round(excise + importTax + serviceFees);
	return total;
};

export const formatSearchForModels = (
	models: Record<number, SelectOption[]>
) => {
	let string = '';

	for (const manId in models) {
		if (string) {
			string += '-';
		}
		string += `${manId}`;
		if (!models[manId].length) {
			continue;
		} else {
			string += '.';
		}
		const modelIds = models[manId].map((model) => model.value).join('.');
		string += modelIds;
	}
	return string;
};

export const formatModelsOrManufacturers = (
	models: SelectOption[],
	manufacturers: SelectOption[]
) => {
	if (models.length) {
		return models.reduce((acc, model) => {
			const group = acc[model.groupValue as number];
			if (group) {
				group.push(model);
			} else {
				acc[model.groupValue as number] = [model];
			}
			return acc;
		}, {} as Record<number, SelectOption[]>);
	}
	return manufacturers.reduce((acc, manufacturer) => {
		acc[manufacturer.value as number] = [];
		return acc;
	}, {} as Record<number, SelectOption[]>);
};

export const generateModelsCacheKey = (models: SelectOption[]) => {
	return models.map((m) => m.value).join('.');
};
