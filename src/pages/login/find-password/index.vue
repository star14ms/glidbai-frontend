<template>
<section id="login" class="col-a-center mt-5">
    <div class="has-text-centered">
        <img src="~/assets/icons/pinata.png" width="144" class="mb-4">

        <h1 class="has-text-black bold">Forgot your password?</h1>
        <h2 class="has-text-black mt-2">
            <p>Enter the email address associated with your account</p>
            <p>and we’ll send you a link to reset your password.</p>
        </h2>
    </div>

    <div class="form-fields">
        <div class="form-field">
            <div class="form-field__title">
                <span class="bold">Email</span>
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
    </div>

    <b-button 
        class="btn-submit is-primary rounded mt-3" :class="{'is-loading': isLoading }" 
        :disabled="!idField.available || isLoading" 
        @click="sendEmail()" 
    >
        Send password reset instruction
    </b-button>
</section>
</template>

<script>
export default {
    data() {
        return {
            idRegex: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        
            idField: {
                available: null,
                id: null,
                state: null,
                placeholder: 'james@enterpix.com',
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

        sendEmail() {
            this.toast('비밀번호 초기화 메일이 전송되었습니다.', 'is-success')
            this.$router.push('/login/find-password/0')
        },
    },
}
</script>

<style lang="scss" scoped>
h1 {
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
}

h2 {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
}

.form-fields {
    margin-top: 4rem;
}

#btn-find-password {
    &:hover {
        color: gray !important;
    }
}

.btn-submit {
    width: 448px;
    height: 40px;
}
</style>
