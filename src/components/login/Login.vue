<template>
	<div>
		<form @submit="submit">
			<input v-model="userId" />
			<input v-model="password" type="password" />
			<button type="submit">Login</button>
		</form>
	</div>
</template>

<script lang="ts">
import Login from './login';

export default Login;
</script>
