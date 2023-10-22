import { print } from 'graphql'
import type { DocumentNode } from 'graphql'
import StrapiGraphqlVariables from "@nuxtjs/strapi/dist/types"

import type { FetchOptions } from 'ofetch';




type graphVars = typeof StrapiGraphqlVariables;
export const useStrapiQL = () => {
  const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public

  return async <T>(query: string|DocumentNode, variables?: graphVars): Promise<T|null> => {
    const queryAsString = typeof query === 'string' ? query : print(query)
    
    const res = await fetch(config.strapiBaseUrl + '/graphql', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${config.strapiToken}`,
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: queryAsString,
        variables
      }),
    });

    const result = await res.json();
    
    if(result !== null){
      return result['data'];
    }

    return result;
  }
}