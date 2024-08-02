<template lang="">
  <!-- header -->
  <SideBar :role="roleId" />
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
        <div class="mdc-card info-card info-card--success">
          <div class="card-inner">
            <h5 class="card-title">Products</h5>
            <h5 class="font-weight-light pb-2 mb-1 border-bottom">$62,0076.00</h5>
            <p class="tx-12 text-muted">48% target reached</p>
            <div class="card-icon-wrapper">
              <i class="material-icons">attach_money</i>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
        <div class="mdc-card info-card info-card--success">
          <div class="card-inner">
            <h5 class="card-title">Item</h5>
            <h5 class="font-weight-light pb-2 mb-1 border-bottom">$62,0076.00</h5>
            <p class="tx-12 text-muted">48% target reached</p>
            <div class="card-icon-wrapper">
              <i class="material-icons">attach_money</i>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
        <div class="mdc-card info-card info-card--primary">
          <div class="card-inner">
            <h5 class="card-title">Users</h5>
            <h5 class="font-weight-light pb-2 mb-1 border-bottom">8 Active Users</h5>
            <div class="card-icon-wrapper">
              <i class="material-icons">people</i>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
        <div class="mdc-card info-card info-card--danger">
          <div class="card-inner">
            <h5 class="card-title">Order</h5>
            <h5 class="font-weight-light pb-2 mb-1 border-bottom">23 Pesanan</h5>
            <p class="tx-12 text-muted">10 Selesai</p>
            <div class="card-icon-wrapper">
              <i class="material-icons">dvr</i>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
        <div class="mdc-card info-card info-card--primary">
          <div class="card-inner">
            <h5 class="card-title">Order Finished</h5>
            <h5 class="font-weight-light pb-2 mb-1 border-bottom">$234,769.00</h5>
            <p class="tx-12 text-muted">87% target reached</p>
            <div class="card-icon-wrapper">
              <i class="material-icons">trending_up</i>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
        <div class="mdc-card info-card info-card--info">
          <div class="card-inner">
            <h5 class="card-title">Pemasukan</h5>
            <h5 class="font-weight-light pb-2 mb-1 border-bottom">$1,200.00</h5>
            <p class="tx-12 text-muted">87% target reached</p>
            <div class="card-icon-wrapper">
              <i class="material-icons">credit_card</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import SideBar from '@/components/SideBar.vue'
export default {
  components: {
    SideBar
  },
  data() {
    return {
      userName: '',
      roleId: ''
    }
  },
  mounted() {
    document.title = "Home";
    this.userName = localStorage.getItem('name')
    this.roleId = localStorage.getItem('role_id')
    if(!this.userName){
      router.push({ name: 'login' })
    }
  },
}
</script>
<style lang="">
  
</style>