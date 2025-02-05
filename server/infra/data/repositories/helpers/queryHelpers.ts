import { Knex } from 'knex';

export default abstract class QueryHelpers {
  static parseQueryOptions(queryOptions: Record<string, unknown>, mappedProperties: Record<string, string>) {
    return Object.entries(queryOptions).reduce((acc, [key, value]) => {
      const [prefix, suffix] = key.split('_');

      if (!mappedProperties[prefix]) return acc;

      acc = { ...acc, [`${mappedProperties[prefix]}_${suffix}`]: value };

      return acc;
    }, {});
  }

  static queryBuilder(builder: Knex.QueryBuilder, queryOptions: Record<string, string>) {
    Object.entries(queryOptions).forEach(([key, value]) => {
      const [prefix, suffix] = key.split('_');

      if (suffix === 'contains') {
        builder.andWhere(prefix, 'like', `%${value}%`);
      }
    });
  }
}
