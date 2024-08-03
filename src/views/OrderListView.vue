<template lang="">
    <SideBar :role="roleId" />
    <div class="mdc-layout-grid">
        <div class="row mb-3">
            <div class="col-12">
                <!-- <input type="text" v-model="keyword" :onchange="searchOrder()" class="form-control" placeholder="Masukkan No Table" inputmode="numeric" @input="filterNumeric"> -->

                <select class="form-control" v-model="keyword" :onchange="searchOrder()">
                    <option class="text-center" value="ordered">Ordered</option>
                    <option class="text-center" value="done">Done</option>
                    <option class="text-center" value="paid">Paid</option>
                </select>
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
                                <tr v-for="(order, index) in filteredOrders" :key="index">
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="loadingModal" tabindex="-1"aria-labelledby="exampleModalLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background-color:rgba(255, 255, 255, 0); border:none;">
            <div class="modal-body">
            <div class="row">
                <div class="col-12">
                <div class="text-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/okdadkfx.json"
                        trigger="loop"
                        style="width:250px;height:250px">
                    </lord-icon>
                </div>
                </div>
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
export default {
    components: {
        SideBar
    },
    data() {
        return {
            roleId: '',
            userName: '',
            orders: [],
            filteredOrders: [],
            keyword: '',
        }
    },
    mounted(){
        document.title = "Order List";
        this.roleId = localStorage.getItem('role_id')
        this.userName = localStorage.getItem('name')
        if(!this.userName){
            router.push({ name: 'login' })
            this.stopPolling()
        }
        this.getOrders()
    },
    beforeDestroy() {
        this.stopPolling(); // Hentikan polling saat komponen dihapus
    },
    methods: {
        getOrders() {
            $("#loadingModal").modal("show");
            axios.get('https://sub.mykavling.store/api/order', {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                this.orders = response.data.data
                this.filteredOrders = []
            })
            .catch(function (error) {
                if(error.response.status == 401){
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    localStorage.removeItem('role_id')
                    localStorage.removeItem('token')
                    router.push({ name: 'login' })
                }
                console.log(error);
                console.log('Error Fetch Items')
            }).finally(() => {
            $("#loadingModal").modal("hide");
            });
        },
        searchOrder() {
            this.filteredOrders = this.orders.filter(order => order.status.toLowerCase().includes(this.keyword.toLowerCase()))
        },
        filterNumeric(event) {
            const input = event.target;
            input.value = input.value.replace(/\D/g, '');
            this.keyword = input.value;
        }
    },
}
</script>
<style lang="">
    
</style>