<template>
	<div class="home">
		<div id="nav">
			<router-link to="/">Home</router-link>
			|
			<button @click="logout">{{ isLogin ? 'Logout' : 'Login' }}</button>
		</div>
		<img alt="Vue logo" src="../assets/logo.png" />
		<div class="hello">
			<div v-if="isLogin">
				<h1>{{ user.userId }}</h1>
				<h2>{{ user.userNm }}</h2>
				<h2>{{ user.deptCd }}</h2>
				<h2>{{ user.employerNo }}</h2>
			</div>
			<h1 v-else>Welcome to Your Vue.js + TypeScript App</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TOKEN_KEY } from '@/apollo';
import ApolloUtil from '@/utils/apollo.util';
import CommonResponse from '@/common/response';

@Component
export default class Home extends Vue {
	private isLogin: boolean = false;
	private apollo = new ApolloUtil(this.$apollo);
	private user: User | undefined;

	protected created() {}

	protected mounted() {
		if (localStorage.getItem(TOKEN_KEY)) {
			this.apollo
				.query<CommonResponse<User>>(
					`
        query {
          loginUser {
            data {
              userId
              userNm
              deptCd
              employerNo
            }
            message
            status
          }
        }
      `
				)
				.then(response => {
					this.user = response.data?.loginUser.data;
					this.isLogin = !!localStorage.getItem(TOKEN_KEY);
				});
		}
	}

	private logout() {
		if (this.isLogin) {
			localStorage.removeItem(TOKEN_KEY);
			this.isLogin = false;
			this.$forceUpdate();
		} else {
			this.$router.push('/login');
		}
	}
}

interface User {
	userId: string;
	userNm: string;
	deptCd: string;
	employerNo: string;
}
</script>
