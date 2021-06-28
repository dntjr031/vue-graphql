import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

export const TOKEN_KEY = 'TOKEN_NAME';
interface ApolloCache {
	token?: string;
}

export const authLink = createHttpLink({
	uri: 'http://localhost:9999/graphql',
});

const apolloClient = new ApolloClient<ApolloCache>({
	link: authLink,
	cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

export default apolloProvider;
