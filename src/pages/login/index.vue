<template>
<section id="login" class="col-a-center mt-5">
    <div class="has-text-centered">
        <img src="~/assets/icons/pinata.png" width="144" class="mb-4">

        <h1 class="has-text-black bold">Welcome to <img src="~/assets/icons/title/glide-30.svg" /></h1>
        <h2 class="mt-2">Your personalized AI-powered chatbot</h2>
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
                        { '이메일 형식': idField.id !== '' && idField.available === false },
                    ]">
                    <b-input ref="idInput" v-model="idField.id" :placeholder="idField.placeholder" required @input="idTyping()"></b-input>
                </b-field>
            </div>
        </div>

        <div class="form-field">
            <div class="form-field__title space-between">
                <span class="bold">Password</span>
                <NuxtLink to="/login/find-password" id="btn-find-password" class="has-text-grey-dark underline">
                    Forgot your password?
                </NuxtLink>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="passwordField.state" 
                    :message="[
                        {'이 입력란을 작성하세요.': passwordField.password === '' },
                        {'최소 8자': passwordField.password !== '' && passwordField.available === false },
                    ]">
                    <b-input ref="passwordInput" v-model="passwordField.password" :placeholder="passwordField.placeholder" password-reveal type="password" required @input="passwordCheck()" @paste.prevent></b-input>
                </b-field>
            </div>
        </div>
    </div>

    <b-button 
        class="btn-submit is-primary rounded-3 mt-3" :class="{'is-loading': isLoading }" 
        :disabled="isLoading" 
        @click="login()" 
    >
        Log in
    </b-button>

    <p id="bottom" class="my-5">
        계정이 없으세요?
        <NuxtLink to="/login/signup" class="underline has-text-grey-dark">회원가입</NuxtLink>
    </p>
</section>
</template>

<script>
export default {
    middleware: 'login',

    data() {
        return {
            idRegex: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
                email: this.idField.id,
                password: this.passwordField.password,
            }

            try {
                const response = await this.$auth.loginWith('local', { data: loginData })
                await this.$auth.setUserToken(response.data.token)
                await this.$auth.fetchUser()

                if (this.$auth.$storage._state['_token.local']) {
                    this.toast('로그인 성공!', 'is-success')
                    return this.$router.push('/')
                } else {
                    return this.toast('로그인 실패, ID와 비밀번호를 다시한번 확인해 주세요.')
                }

            } catch (e) {
                this.error_log(e, '로그인 실패')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
h1 {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;

    img {
        position: relative;
        top: 2px;
        width: 72px;
    }
}

h2 {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #374151;
}

#btn-find-password {
    &:hover {
        color: gray !important;
    }
}

#bottom {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    color: #6B7280;

    a:hover {
        color: gray !important;
    }
}
</style>
