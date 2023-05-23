import {
  GraphQLSchema,
  isInterfaceType,
  isObjectType,
  isEnumType,
  isInputObjectType,
} from 'graphql';
import { Field, Types } from './Schema.interface';

export const getTypes = (schema: GraphQLSchema): Types[] => {
  const typeMap = schema.getTypeMap();
  const types = Object.keys(typeMap)
    .filter((typeName) => !typeName.startsWith('__'))
    .map((typeName) => {
      const type = typeMap[typeName];
      let typeFields: Field[] | undefined;

      if (isObjectType(type)) {
        const fields = type.getFields();
        typeFields = Object.keys(fields).map((fieldName) => {
          const field = fields[fieldName];
          return {
            name: field.name,
            type: field.type.toString(),
            args:
              field.args.map((arg) => {
                return {
                  name: arg.name,
                  type: arg.type.toString(),
                };
              }) || [],
            description: field.description || '',
          };
        });
      }

      if (isInterfaceType(type) || isInputObjectType(type)) {
        const fields = type.getFields();
        typeFields = Object.keys(fields).map((fieldName) => {
          const field = fields[fieldName];
          return {
            name: field.name,
            type: field.type.toString(),
            args: [],
            description: field.description || '',
          };
        });
      }

      if (isEnumType(type)) {
        const values = type.getValues();
        typeFields = values.map((value) => {
          return {
            name: value.name,
            type: value.value,
            args: [],
            description: value.description || '',
          };
        });
      }

      return {
        name: type.name,
        description: type.description as string,
        fields: typeFields || null,
      };
    });

  return types;
};
