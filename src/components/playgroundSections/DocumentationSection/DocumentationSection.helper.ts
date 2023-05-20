import {
  buildClientSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  IntrospectionQuery,
} from 'graphql';
import { Field, Types } from './DocumentationSection.interface';

export const getTypes = (data: IntrospectionQuery): Types[] => {
  const schema = buildClientSchema(data);
  const type = schema.getTypeMap();
  const types = Object.keys(type)
    .filter((typeName) => !typeName.startsWith('__'))
    .map((typeName) => {
      const tName = type[typeName];
      let typeFields: Field[] | undefined;

      if (
        tName instanceof GraphQLObjectType ||
        tName instanceof GraphQLInterfaceType ||
        tName instanceof GraphQLInputObjectType
      ) {
        const fields = tName.getFields();
        typeFields = Object.keys(fields).map((fieldName) => {
          const field = fields[fieldName];
          return {
            name: field.name,
            type: field.type.toString(),
            description: field.description || '',
          };
        });
      }

      if (tName instanceof GraphQLEnumType) {
        const values = tName.getValues();
        typeFields = values.map((value) => {
          return {
            name: value.name,
            type: value.value,
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
