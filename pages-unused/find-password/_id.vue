<template>
<section id="login" class="mt-5">
    <div class="has-text-centered">
        <img src="~/assets/icons/pinata.png" width="144" class="mb-4">
    </div>
    <h1 class="has-text-black mt-5">Change your password</h1>

    <div class="form-fields mt-5">
        <div class="form-field">
            <div class="form-field__title space-between">
                <span class="bold">Password</span>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="passwordField.state" 
                    :message="[
                        {'이 입력란을 작성하세요.': passwordField.password === '' },
                        {'최소 8자': passwordField.password !== '' && passwordField.available === false },
                        {'사용할 수 있는 비밀번호입니다.': passwordField.available}
                    ]">
                    <b-input ref="passwordInput" v-model="passwordField.password" :placeholder="passwordField.placeholder" password-reveal type="password" required @input="passwordCheck()"></b-input>
                </b-field>
            </div>
        </div>
    </div>

    <b-button 
        class="btn-submit is-primary rounded-3 mt-3" :class="{'is-loading': isLoading }" 
        :disabled="!passwordField.available || isLoading" 
        @click="resetPassword()" 
    >
        Change password
    </b-button>
</section>
</template>

<script>
export default {
    middleware: 'login',

    data() {
        return {
            passwordRegex: /^[A-Za-z\d$@$!%*?&\-=_+]{8,}$/, // 최소 8자
        
            passwordField: {
                available: null,
                password: null,
                state: null,
                placeholder: 'Password (over 8 words)',
            },

            isLoading: false,
        }
    },
    methods: {
        passwordCheck() {
            this.passwordField.available = this.passwordRegex.test(this.passwordField.password);
            return this.passwordField.available ? (this.passwordField.state = 'is-success') : (this.passwordField.state = 'is-danger');
        },

        resetPassword() {
            this.toast('패스워드 변경이 완료되었습니다.', 'is-success')
            this.$router.push('/login')
        },
    },
}
</script>

<style lang="scss" scoped>
h1 {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
}

.btn-submit {
    width: 448px;
    height: 40px;
}
</style>
