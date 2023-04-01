<template>
<section id="login" class="col-a-center mt-6">
    <div class="has-text-centered">
        <img src="~/assets/icons/pinata.png" width="128" class="mb-4">

        <p class="is-size-3 has-text-black-ter bold">Welcome to Glide</p>
        <p class="is-size-6">Your personalized AI-powered chatbot</p>
    </div>

    <div class="form-fields mt-5">
        <div class="form-field">
            <div class="form-field__title">
                <span class="bold">ID</span>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="idField.state" 
                    :message="[
                        { '이 입력란을 작성하세요.': idField.id === '' },
                    ]">
                    <b-input ref="idInput" v-model="idField.id" :placeholder="idField.placeholder" required @input="idTyping()"></b-input>
                </b-field>
            </div>
        </div>

        <div class="form-field">
            <div class="form-field__title space-between">
                <span class="bold">Password</span>
                <a class="has-text-grey-dark underline">Forgot your password?</a>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="passwordField.state" 
                    :message="[
                        {'이 입력란을 작성하세요.': passwordField.password === '' },
                    ]">
                    <b-input ref="passwordInput" v-model="passwordField.password" :placeholder="passwordField.placeholder" password-reveal type="password" required @input="passwordCheck()"></b-input>
                </b-field>
            </div>
        </div>
    </div>

    <b-button 
        class="btn-submit is-primary rounded mt-3" :class="{'is-loading': isLoading }" 
        :disabled="isLoading" 
        @click="login()" 
    >
        Log in
    </b-button>

    <p class="is-size-6 has-text-grey-dark my-5">
        계정이 없으세요?
        <NuxtLink to="/signup" class="underline has-text-grey-dark">회원가입</NuxtLink>
    </p>
</section>
</template>

<script>
export default {
    data() {
        return {
            idRegex: /^(?=.*[a-z])[a-z0-9]{3,16}$/,
            passwordRegex: /^[A-Za-z\d$@$!%*?&\-=_+]{8,}$/, // 최소 8자
        
            idField: {
                available: null,
                id: null,
                state: null,
                placeholder: 'james@enterpix.com',
            },
            passwordField: {
                available: null,
                password: null,
                state: null,
                placeholder: null,
            },

            isLoading: false,
        }
    },
    methods: {
        idTyping() {
            this.idField.available = null;
            this.idField.available = this.idRegex.test(this.idField.id);
            this.idField.available ? this.idField.state = 'is-success' : this.idField.state = 'is-danger';
        },
        passwordCheck() {
            this.passwordField.available = this.passwordRegex.test(this.passwordField.password);
            return this.passwordField.available ? (this.passwordField.state = 'is-success') : (this.passwordField.state = 'is-danger');
        },
        async login() {
            this.$router.push('/quiz/0')
            if (this.isLoading) return
            this.isLoading = true
            await this._login()
            this.isLoading = false
        },
        async _login() {
            if (!this.idField.available) {
                return this.$refs.idInput.focus()
            } else if (!this.passwordField.available) {
                return this.$refs.passwordInput.focus()
            }

            const loginData = {
                username: this.idField.id,
                password: this.passwordField.password,
            }

            try {
                const response = await this.$auth.loginWith('local', {
                    data: loginData,
                })

                if (response.data.user) {
                    return this.$router.push('/')
                } else {
                    return this.toast('로그인 실패, ID와 비밀번호를 다시한번 확인해 주세요.')
                }

            } catch (e) {
                this.toast('로그인 실패, 서버 오류')
                this.error_log(e)
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
