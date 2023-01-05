import AppDataSource from "../data-source";
import { CategoriesEntity } from "../Entities/categories.entity";
import { ICategoryRequest } from "../interfaces/categories";
import { categoriesRepo } from "../repositories/allRespositories";

export const createCategoriesService = async (
  dataCategory: ICategoryRequest
) => {
  const categoryExists = await categoriesRepo.findOneBy({
    name: dataCategory.name,
  });

  if (categoryExists) {
    return [409, { message: "Category already exists" }];
  }

  const category = categoriesRepo.create(dataCategory);

  await categoriesRepo.save(category);

  return [201, category];
};

export const getCategoriesService = async () => {
  const categories = await categoriesRepo.find();

  return [200, categories];
};
