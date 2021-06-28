import gql from 'graphql-tag';
import { TOKEN_KEY } from '@/apollo';
import { FetchResult } from 'apollo-link/lib/types';
import { DollarApollo } from 'vue-apollo/types/vue-apollo';

export default class ApolloUtil<V> {
	private apollo: DollarApollo<V>;

	constructor(apollo: DollarApollo<V>) {
		this.apollo = apollo;
	}

	public mutate<T>(literals: string, data?: any): Promise<FetchResult<T>> {
		const token = localStorage.getItem(TOKEN_KEY);
		return this.apollo.mutate<T>({
			mutation: gql(literals),
			context: {
				headers: { Authorization: token ? `Bearer ${token}` : '' },
			},
			variables: data,
		});
	}

	public query<T>(literals: string, data?: any): Promise<FetchResult<T>> {
		const token = localStorage.getItem(TOKEN_KEY);
		return this.apollo.query<T>({
			query: gql(literals),
			context: {
				headers: { Authorization: token ? `Bearer ${token}` : '' },
			},
			variables: data,
		});
	}
}
