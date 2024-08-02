<script>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import router from '@/router'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  components: {
    SideBar
  },
  data() {
    return {
      logoutTimer: null,
      lastActivity: null,
    };
  },
  mounted() {
    this.resetTimer();
    this.startLogoutTimer();
  },
  methods: {
      logout() {
          Swal.fire({
              title: 'Apakah Anda yakin?',
              text: 'Anda akan keluar dari akun.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ya, Logout!'
          }).then((result) => {
              if (result.isConfirmed) {
                  // Jika pengguna mengklik "Ya", lanjutkan proses logout
                  axios.get('https://sub.mykavling.store/api/auth/logout', {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                  })
                  .then(function (response) {
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    localStorage.removeItem('role_id')
                    localStorage.removeItem('token')
                    router.push({ name: 'login' })
                    Swal.fire({
                        icon: "success",
                        title: "Goodbye",
                        title: "Berhasil Logout",
                        showConfirmButton: false,
                        timer: 1500
                    });
                  })
                  .catch(function (error) {
                      if(error.response.status == 401){
                        localStorage.removeItem('email')
                        localStorage.removeItem('name')
                        localStorage.removeItem('role_id')
                        localStorage.removeItem('token')
                        router.push({ name: 'login' })
                      }
                  })
              } else if(result.dismiss){
                  Swal.fire({
                  title: "Cancelled",
                  text: "You're Still Authorized Dude!!!",
                  icon: "info",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
          })
      },
      resetTimer() {
        const currentTime = new Date().getTime();
        localStorage.setItem('lastActivity', currentTime);
        this.lastActivity = currentTime;

        if (this.logoutTimer) {
          clearTimeout(this.logoutTimer);
        }

        this.startLogoutTimer();
      },
      startLogoutTimer() {
        this.logoutTimer = setTimeout(() => {
          const lastActivity = localStorage.getItem('lastActivity');
          const currentTime = new Date().getTime();
          
          // Cek jika sudah lebih dari 1 jam (3600000 ms)
          if (currentTime - lastActivity > 3600000) {
            axios.get('https://sub.mykavling.store/api/auth/logout', {
              headers: {
                  "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(function (response) {
              alert('Session time out')
              localStorage.removeItem('email')
              localStorage.removeItem('name')
              localStorage.removeItem('role_id')
              localStorage.removeItem('token')
              router.push({ name: 'login' })
            })
            .catch(function (error) {
                if(error.response.status == 401){
                  localStorage.removeItem('email')
                  localStorage.removeItem('name')
                  localStorage.removeItem('role_id')
                  localStorage.removeItem('token')
                  router.push({ name: 'login' })
                }
            })
          }
        }, 3600000); // Interval cek 1 jam
      },
  }
}
</script>

<template>
  <div class="body-wrapper" v-if="$route.name != 'login'" @mousemove="resetTimer" @keydown="resetTimer">
    <!-- header -->
    <div class="main-wrapper mdc-drawer-app-content">
      <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
          <div class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end mdc-top-app-bar__section-right">
            <div class="menu-button-container">
              <a type="button" @click="logout()" class="mdc-button mdc-menu-button">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </header>
      <div class="page-wrapper mdc-toolbar-fixed-adjust">
        <!-- Content -->
        <main class="content-wrapper mb-5">
          <RouterView />
        </main>
      </div>
    </div>
    <!-- header -->
  </div>
  <div class="body-wrapper" v-if="$route.name == 'login'">
    <div class="main-wrapper">
      <div class="page-wrapper full-page-wrapper d-flex align-items-center justify-content-center">
        <main class="auth-page">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
