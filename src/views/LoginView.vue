<template lang="">
    <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
            <div class="stretch-card mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-1-tablet"></div>
                <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-6-tablet">
                    <div class="mdc-card">
                        <form @submit.prevent>
                            <div class="mdc-layout-grid">
                                <div class="alert alert-danger alert-dismissible" role="alert" v-if="mailMsg">
                                    <div>{{ mailMsg }}</div>
                                </div>
                                <div class="mdc-layout-grid__inner">
                                    <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
                                        <div class="mdc-text-field w-100">
                                            <input class="mdc-text-field__input" placeholder="Masukan Email" type="email" v-model="email" id="email">
                                            <div class="mdc-line-ripple"></div>
                                            <label for="email" class="mdc-floating-label">Email</label>
                                        </div>
                                    </div>
                                    <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
                                        <div class="mdc-text-field w-100">
                                            <input class="mdc-text-field__input" placeholder="Masukkan Password" v-model="password" type="password" id="password">
                                            <div class="mdc-line-ripple"></div>
                                            <label for="password" class="mdc-floating-label">Password</label>
                                        </div>
                                    </div>
                                    <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
                                        <button @click="login()" class="mdc-button mdc-button--raised w-100" :disabled=Process>
                                            {{ Process ? 'Logging in, Please Wait...' : 'Log In' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            <div class="stretch-card mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-1-tablet"></div>
        </div>
        </div>
</template>
<script>
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            email: "",
            password: "",
            Process: false,
            mailMsg: '',
            bmailMsg: false,
            passMsg: '',
            bpassMsg: false,
        }
    },
    methods: {
        login(){
            this.Process = true
            if(this.email == ''){
                this.mailMsg = 'Masukkan Email'
                
            }
            if(this.password == ''){
                this.passMsg = 'Masukkan Password'
            }
            axios.post('https://sub.mykavling.store/api/auth/login', {
                email: this.email,
                password: this.password
            })
            .then(function (response) {
                localStorage.setItem('email', response.data.data.email)
                localStorage.setItem('name', response.data.data.name)
                localStorage.setItem('role_id', response.data.data.role_id)
                localStorage.setItem('token', response.data.data.token)
                router.push({ name: 'home' })
                Swal.fire({
                    title: 'Success',
                    text: 'Successfully Authorized',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => this.Process = false)
        }
    },
    mounted() {
        document.title = "Login";
        this.userName = localStorage.getItem('name')
        if(this.userName){
        router.push({ name: 'home' })
        }
    },
}
</script>
<style lang="">

</style>