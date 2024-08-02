<template lang="">
    <SideBar :role="roleId" />
    <div class="mdc-layout-grid">
        <div class="row mb-3">
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <label for="month" class="form-label">Month</label>
                        <select class="form-control" id="month" v-model="month">
                            <option class="text-center">- - -   Pilih   - - -</option>
                            <option class="text-center" v-for="month in months" :value=month.value>{{ month.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <input type="text" class="form-control" placeholder="Masukkan No Table">
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <input type="text" class="form-control" placeholder="Masukkan No Table">
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <input type="text" class="form-control" placeholder="Masukkan No Table">
                    </div>
                </div>
            </div>
        </div>
        <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
                <div class="mdc-card p-0">
                    <h6 class="card-title card-padding pb-0 text-center">
                        Order List
                    </h6>
                    <div class="table-responsive">
                        <table class="table table-hoverable">
                            <thead>
                                <tr>
                                    <th class="text-left">#</th>
                                    <th class="text-left">Customer Name</th>
                                    <th class="text-left">No Meja</th>
                                    <th class="text-left">Order Date</th>
                                    <th class="text-left">Order Time</th>
                                    <th class="text-left">Total</th>
                                    <th class="text-left">Status</th>
                                    <th class="text-left">Waiters</th>
                                    <th class="text-left">Cashier</th>
                                    <th class="text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- <tr v-for="(order, index) in filteredOrders" :key="index">
                                    <td class="text-left">{{ index+1 }}</td>
                                    <td class="text-left">{{ order.customer_name }}</td>
                                    <td class="text-left">{{ order.table_no }}</td>
                                    <td class="text-left">{{ order.order_date }}</td>
                                    <td class="text-left">{{ order.order_time }}</td>
                                    <td class="text-left">{{ order.total }}</td>
                                    <td class="text-left">{{ order.status }}</td>
                                    <td class="text-left">{{ order.waiters.name }}</td>
                                    <td class="text-left">{{ order.cashier ? order.cashier.name : '' }}</td>
                                    <td class="text-left">
                                        <RouterLink :to="{ name: 'orderdetail', params: {orderId: order.id }}" class="btn btn-outline-success btn-sm">
                                        Lihat Detail
                                        </RouterLink>
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '@/router'
import SideBar from '@/components/SideBar.vue'
import Swal from 'sweetalert2'
export default {
    components: {
        SideBar
    },
    data() {
        return {
            roleId: '',
            userName: '',
            months: [
                { value: 1, name: 'January' },
                { value: 2, name: 'February' },
                { value: 3, name: 'March' },
                { value: 4, name: 'April' },
                { value: 5, name: 'May' },
                { value: 6, name: 'June' },
                { value: 7, name: 'July' },
                { value: 8, name: 'August' },
                { value: 9, name: 'September' },
                { value: 10, name: 'October' },
                { value: 11, name: 'November' },
                { value: 12, name: 'December' },
            ],
            month: ''
        }
    },
    mounted(){
        document.title = "Report";
        this.roleId = localStorage.getItem('role_id')
        this.userName = localStorage.getItem('name')
        if(!this.userName){
            router.push({ name: 'login' })
        }
    },
    methods: {
        
    }
}
</script>
<style lang="">
    
</style>