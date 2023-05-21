import {
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLSchema,
} from 'graphql';
import { Field, Types } from './Schema.interface';

export const getTypes = (schema: GraphQLSchema): Types[] => {
  const type = schema.getTypeMap();
  const types = Object.keys(type)
    .filter((typeName) => !typeName.startsWith('__'))
    .map((typeName) => {
      const tName = type[typeName];
      let typeFields: Field[] | undefined;

      if (tName instanceof GraphQLObjectType) {
        const fields = tName.getFields();
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
      } else if (tName instanceof GraphQLInterfaceType || tName instanceof GraphQLInputObjectType) {
        const fields = tName.getFields();
        typeFields = Object.keys(fields).map((fieldName) => {
          const field = fields[fieldName];
          return {
            name: field.name,
            type: field.type.toString(),
            args: [],
            description: field.description || '',
          };
        });
      } else if (tName instanceof GraphQLEnumType) {
        const values = tName.getValues();
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
        name: tName.name,
        description: tName.description as string,
        fields: typeFields || null,
      };
    });

  return types;
};
