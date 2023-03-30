<template>
<section id="signup" class="col-a-center mt-6">
    <div class="has-text-centered">
        <img src="~/assets/icons/pinata.png" width="128" class="mb-4">

        <p class="is-size-3 has-text-black-ter bold">Join Glide</p>
        <p class="is-size-6">Your personalized AI-powered chatbot</p>
    </div>

    <div class="form-fields mt-5">
        <div class="form-field">
            <div class="form-field__title">
                <span class="bold">Name</span>
            </div>
            <div class="form-field__input">
                <b-field>
                    <b-input ref="nameInput" v-model="nameField.name" :placeholder="nameField.placeholder" required @input="nameCheck()"></b-input>
                </b-field>
            </div>
        </div>

        <div class="form-field">
            <div class="form-field__title">
                <span class="bold">ID</span>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="idField.state" 
                    :message="[
                        { '사용가능한 아이디입니다.': idField.available === true },
                        { '이미 가입된 아이디입니다!': idField.duplicated === true },
                    ]">
                    <b-input ref="idInput" v-model="idField.id" :placeholder="idField.placeholder" required @input="idTyping()"></b-input>
                </b-field>
            </div>
        </div>

        <div class="form-field">
            <div class="form-field__title">
                <span class="bold">Password</span>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="passwordField.state" 
                    :message="[
                        {'최소 8자': 
                           passwordField.password !== '' && !passwordField.available
                        },
                        {'사용할 수 있는 비밀번호입니다.': passwordField.available}
                    ]">
                    <b-input ref="passwordInput" v-model="passwordField.password" :placeholder="passwordField.placeholder" password-reveal type="password" required @input="passwordCheck()"></b-input>
                </b-field>
            </div>
        </div>

        <div class="form-field">
            <div class="form-field__title">
                <span class="bold">Confirm Password</span>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="passwordField2.state" 
                    :message="[
                        {'비밀번호가 다릅니다!': 
                            passwordField2.password !== '' && 
                            passwordField.password !== passwordField2.password
                        },
                        {'사용할 수 있는 비밀번호입니다.': passwordField2.available}
                    ]">
                    <b-input ref="passwordInput" v-model="passwordField2.password" :placeholder="passwordField2.placeholder" password-reveal type="password" @input="passwordCheck2()"></b-input>
                </b-field>
            </div>
        </div>

        <div class="form-field">
            <div class="form-field__title">
                <span class="bold">Access Token</span>
            </div>
            <div class="form-field__input">
                <b-field 
                    :type="tokenField.state" 
                    :message="[
                    ]">
                    <b-input ref="idInput" v-model="tokenField.token" :placeholder="tokenField.placeholder" required @input="idTyping()"></b-input>
                </b-field>
            </div>
        </div>
    </div>

    <b-button class="btn-submit is-primary rounded mt-3" @click="signUp()">Join</b-button>

    <p class="is-size-7 has-text-grey mt-5">
        By joining, you agree to the 
        <span class="underline">Terms</span> and 
        <span class="underline">Privacy Policy</span>
    </p>
</section>
</template>

<script>
export default {
    data() {
        return {
            passwordRegex: /^[0-9a-zA-Z@$!%*#?&-=_+]{8,}$/g, // 최소 8자
        
            nameField: {
                name: null,
                nameAvailable: false,
                placeholder: 'Username',
            },
            idField: {
                available: false,
                id: null,
                state: null,
                checkedId: null,
                placeholder: 'james@enterpix.com',
            },
            passwordField: {
                available: false,
                password: '',
                state: null,
                placeholder: 'Password (over 8 words)',
            },
            passwordField2: {
                available: false,
                password: '',
                state: null,
                placeholder: 'Confirm Password',
            },
            tokenField: {
                available: false,
                token: null,
                state: null,
            },
        }
    },
    methods: {
        async idCheck() {
            const idRegex = /^[a-z]+[a-z0-9]{3,19}$/g;
            this.idField.available = idRegex.test(this.idField.id);

            if (!this.idField.id) {
                this.idField.available = false;
            }
            this.idField.available ? this.idField.state = 'is-success' : this.idField.state = 'is-danger';

            if (this.idField.available) {
                try {
                    const { data } = await this.$axios.get(`/user/idcheck/${this.idField.id}/`)

                    if (data.result) {
                        this.idField.duplicated = false
                        this.idField.duplicated ? this.idField.state = 'is-danger' : this.idField.state = 'is-success';
                        this.idField.checkedId = this.idField.id;
                    } else {
                        this.idField.available = null
                        this.idField.duplicated = true
                        this.idField.duplicated ? this.idField.state = 'is-danger' : this.idField.state = 'is-success';
                    }
                } catch (e) {
                    console.log('중복 ID 체크 에러발생 - ', e);
                    this.idField.available = null
                    this.idField.duplicated = true
                    this.idField.duplicated ? this.idField.state = 'is-danger' : this.idField.state = 'is-success';
                }
                this.idField = {...this.idField}
            }
        },
        idTyping() {
            this.idField.available = null;
            this.idField.state = null;
            this.idField.checkedId = null;
        },
        passwordCheck() {
            this.passwordField.available = this.passwordRegex.test(this.passwordField.password);
            return this.passwordField.available ? (this.passwordField.state = 'is-success') : (this.passwordField.state = 'is-danger');
        },
        passwordCheck2() {
            this.passwordField2.available = this.passwordRegex.test(this.passwordField.password) &&
                this.passwordField.password === this.passwordField2.password;
            return this.passwordField2.available ? (this.passwordField2.state = 'is-success') : (this.passwordField2.state = 'is-danger');
        },
        nameCheck() {
            const nameRegex = /^[가-힣0-9a-zA-Z]+$/;
            this.nameField.nameAvailable = nameRegex.test(this.nameField.name);
        },
        async signUp() {

            if (!this.idField.checkedId) {
                return this.$refs.idInput.focus();
            } else if (!this.passwordField.available) {
                return this.$refs.passwordInput.focus();
            } else if (!this.passwordField2.available) {
                return this.$refs.passwordInput.focus();
            } else if (!this.nameField.nameAvailable) {
                return this.$refs.nameInput.focus();
            } else {

                if(this.passwordField.password !== this.passwordField2.password) {
                    alert('비밀번호를 확인해주세요.')
                    return null   
                }

                const data = {
                    username: this.idField.checkedId,
                    password1: this.passwordField.password,
                    password2: this.passwordField2.password,
                    name: this.nameField.name,
                }

                try {
                    const response = await this.$axios.post(`/auth/registration/`, data)

                    this.$auth.setUserToken(response.data.access_token, response.data.refresh_token)
                    await this.$auth.fetchUser()

                    if (this.$auth.loggedIn) {
                        if(this.$route.query.prev === 'pay') {
                            this.$router.push('/payment/summer')
                        } else {
                            this.completion = true;
                        }
                    }
                } catch (e) {
                    alert('가입할 수 없는 아이디입니다.')
                    return null
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
