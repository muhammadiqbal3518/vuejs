<template lang="">
    <SideBar :role="roleId" />
    <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
            <div class="text-left mb-3">
                <RouterLink to="/order-list" class="btn btn-warning">Back</RouterLink>
            </div>
            <div class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
                <div class="mdc-card p-0">
                    <h6 class="card-title card-padding pb-0 text-center">
                        Order Detail
                    </h6>
                    <div class="row">
                        <div class="col-lg-5 col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hoverable table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td class="text-left">Customer Name : {{ order.customer_name }}</td>
                                                    <td class="text-left">Table No : {{ order.table_no }}</td>
                                                </tr>
                                                <tr>
                                                    
                                                    <td class="text-left">Tanggal Order : {{ order.order_date }}</td>
                                                    <td class="text-left">Status Order : {{ order.status }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">Waiters : {{ order.waiters ? order.waiters.name : '-' }}</td>
                                                    <td class="text-left">Cashier : {{ order.cashier ? order.cashier.name : '-' }}</td>
                                                </tr>
                                                <tr>
                                                    
                                                    <td class="text-left">Order Time : {{ order.order_time }}</td>
                                                    <td class="text-left">Grand Total : Rp. {{ formatCurrency(order.total) }},00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-12">
                                        <div class="py-3">
                                            <!-- jika status ordered dan user role chef -->
                                            <button v-if="order.status == 'ordered' && (roleId == 2)" type="button" class="btn btn-sm btn-primary" @click="setAsDone(order.id)">
                                                Set As Done
                                            </button>
                                            <!-- jika status done dan user role cashier / manager -->
                                            <button v-if="(order.status == 'done') && (roleId == 3 || roleId == 4)" type="button" class="btn btn-sm btn-primary" @click="setAsPaid(order.id)">
                                                Set As Paid
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hoverable">
                                            <thead>
                                                <tr>
                                                    <th class="text-left">#</th>
                                                    <th class="text-left">Item Name</th>
                                                    <th class="text-left">Qty</th>
                                                    <th class="text-left">Price</th>
                                                    <th class="text-left">Total/item</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(loop, index) in order_details" :key="index">
                                                    <td class="text-left">{{ index+1 }}</td>
                                                    <td class="text-left">{{ loop.item.name }}</td>
                                                    <td class="text-left">{{ loop.qty }}</td>
                                                    <td class="text-left">Rp. {{ formatCurrency(loop.price) }},00</td>
                                                    <td class="text-left">Rp. {{ formatCurrency(loop.price * loop.qty) }},00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
import Swal from 'sweetalert2'
export default {
    components: {
        SideBar
    },
    data() {
        return {
            roleId: '',
            userName: '',
            OrderID: '',
            order: '',
            order_details: []
        }
    },
    mounted(){
        document.title = "Order Detail";
        this.OrderID = this.$route.params.orderId
        this.roleId = localStorage.getItem('role_id')
        this.userName = localStorage.getItem('name')
        if(!this.userName){
            router.push({ name: 'login' })
        }

        this.getOrder()
    },
    methods: {
        getOrder() {
            axios.get('https://sub.mykavling.store/api/order/'+this.OrderID, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                this.order = response.data.data
                this.order_details = response.data.data.order_detail
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
            })
        },
        formatCurrency(value) {
            if (!value) return '';
            value = value.toString();
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        setAsDone(OrderID) {
            axios.get('https://sub.mykavling.store/api/order/'+this.OrderID+'/set-as-done', {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                if(response.status == 200)
                {
                    Swal.fire({
                        title: 'Process Success',
                        text: 'Order Telah Selesai',
                        icon: 'success'
                    });
                    this.getOrder()
                }
            })
            .catch(function (error) {
                if(error.response.status == 401){
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    localStorage.removeItem('role_id')
                    localStorage.removeItem('token')
                    router.push({ name: 'login' })
                }
                if(error.response.status == 403){
                    Swal.fire({
                        title: 'Access Denied',
                        text: 'Only Chef can set this Order to be Done',
                        icon: 'error'
                    });
                }
            })
        },
        setAsPaid(OrderID) {
            axios.get('https://sub.mykavling.store/api/order/'+this.OrderID+'/payment', {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                if(response.status == 200)
                {
                    Swal.fire({
                        title: 'Congratulation',
                        text: 'Payment Success',
                        icon: 'success'
                    });
                    this.getOrder()
                }
            })
            .catch(function (error) {
                if(error.response.status == 401){
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    localStorage.removeItem('role_id')
                    localStorage.removeItem('token')
                    router.push({ name: 'login' })
                }
                if(error.response.status == 403){
                    Swal.fire({
                        title: 'Access Denied',
                        text: 'Only Cashier & Manager can Paid the Order',
                        icon: 'error'
                    });
                }
                console.log(error);
            })
        }
    }
}
</script>
<style lang="">
    
</style>