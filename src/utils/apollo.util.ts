import { TOKEN_KEY } from '@/apollo';
import { FetchResult } from 'apollo-link/lib/types';
import { DollarApollo } from 'vue-apollo/types/vue-apollo';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { FetchPolicy } from 'apollo-client/core/watchQueryOptions';

export default class ApolloUtil<V> {
	private apollo: DollarApollo<V>;

	constructor(apollo: DollarApollo<V>) {
		this.apollo = apollo;
	}

	public mutate<T>(literals: string | DocumentNode, data?: any): Promise<FetchResult<T>> {
		if (literals instanceof String) {
			literals = gql(literals as string);
		}
		const token = localStorage.getItem(TOKEN_KEY);
		return this.apollo.mutate<T>({
			mutation: literals as DocumentNode,
			context: {
				headers: { Authorization: token ? `Bearer ${token}` : '' },
			},
			variables: data,
		});
	}

	public query<T>(
		literals: string | DocumentNode,
		data?: any,
		fetchPolicy: FetchPolicy = 'network-only'
	): Promise<FetchResult<T>> {
		if (literals instanceof String) {
			literals = gql(literals as string);
		}
		const token = localStorage.getItem(TOKEN_KEY);
		console.log(token);
		return this.apollo.query<T>({
			query: literals as DocumentNode,
			fetchPolicy,
			context: {
				headers: { Authorization: token ? `Bearer ${token}` : '' },
			},
			variables: data,
		});
	}
}
