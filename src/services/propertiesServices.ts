import { IPropertyRequest } from "../interfaces/properties";
import {
  addressRepo,
  categoriesRepo,
  propertyRepo,
} from "../repositories/allRespositories";

export const createPropertiesService = async (
  dataProperty: IPropertyRequest
) => {
  const { value, size, categoryId, address } = dataProperty;

  const getAddress = await addressRepo.findOneBy({
    number: Number(address.number),
  });

  const category = await categoriesRepo.findOneBy({ id: categoryId });

  if (!category) {
    return [404, { message: "category not found" }];
  }

  if (
    getAddress?.city === address.city &&
    getAddress?.state === address.state &&
    getAddress.district === address.district &&
    getAddress.zipCode === address.zipCode
  ) {
    return [409, { message: "address already exists" }];
  }

  if (address.state.length > 2) {
    return [400, { message: "status cannot exceed 2 characters" }];
  }

  if (address.zipCode.length > 8) {
    return [400, { message: "zip code cannot exceed 8 characters" }];
  }

  const newAddress = addressRepo.create({
    city: address.city,
    district: address.district,
    number: Number(address.number),
    state: address.state,
    zipCode: address.zipCode,
  });

  await addressRepo.save(newAddress);

  const property = propertyRepo.create({
    value,
    size,
    address: { ...newAddress },
    category: { ...category },
  });

  await propertyRepo.save(property);

  return [201, property];
};

export const getPropertiesService = async () => {
  const properties = await propertyRepo.find({
    relations: {
      address: true,
      category: true,
    },
  });

  return [200, properties];
};

export const getPropertiesFromCategoryService = async (id: string) => {
  const category = await categoriesRepo.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    return [404, { message: "Propertie not found" }];
  }

  return [200, category];
};
