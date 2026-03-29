import type { UseFetchReturn } from '@/hooks/useFetch';
import type {
	Category,
	Manufacturer,
	ManufacturersGroupedByVechile,
	ModelItem,
	ModelsGroupedByManufacturerAndVechile,
	ProductsResponse,
} from '@/types/data';
import type { FilterForm } from '@/types/filter';
import type { FetchStatus } from '@/types/general';

export type ApiDataContextValue = {
	manufacturers: Manufacturer[] | null;
	manufacturersGroupedByVechile: ManufacturersGroupedByVechile | undefined;
	categories: Category[] | null;
	categoriesGroupedByVehicleType: Record<string, Category[]> | null;
	models: ModelItem[] | null;
	fetchModels: UseFetchReturn<ModelItem[], [number]>['execute'];
	modelsGroupedByManufacturerAndVechile: ModelsGroupedByManufacturerAndVechile | null;
	modelsStatus: FetchStatus;
	products: ProductsResponse | null;
	fetchProducts: (data?: Partial<FilterForm>) => Promise<void>;
};
