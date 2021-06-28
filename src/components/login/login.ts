import { Component, Vue } from 'vue-property-decorator';
import { TOKEN_KEY } from '@/apollo';
import ApolloUtil from '@/utils/apollo.util';
import CommonResponse from '@/common/response';

@Component
export default class Login extends Vue {
	private userId = '';
	private password = '';
	private apollo = new ApolloUtil<any>(this.$apollo);

	public submit(e: Event): void {
		e.preventDefault();
		const { userId, password } = this;

		this.apollo
			.mutate<CommonResponse<LoginResponse>>(
				`
        mutation($userId: String!, $password: String!) {login(userId: $userId, password: $password) {
          status
          data {
            userId
            userNm
            token
          }
          message
        }}
      `,
				{ userId, password }
			)
			.then(response => {
				localStorage.setItem(TOKEN_KEY, response.data?.login.data.token || '');
				this.$router.push('/');
			});
	}
}

interface LoginResponse {
	userId: string;
	userNm: string;
	token: string;
}
