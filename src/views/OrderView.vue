<template lang="">
    <SideBar :role="roleId" />
    <div class="container-fluid">
        <div class="row">
            <!-- ordered item -->
            <div class="col-12">
                <div class="card">
                    <div class="card-header text-center">
                        <button type="button" class="btn btn-sm btn-primary" @click="showProduct()" :disabled=processing>
                            {{  processing ? 'Please Wait...' : 'Pilih Product' }}
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-2">
                                    <label class="form-label" for="customerName">Customer Name</label>
                                    <input type="text" :class="eName ? 'form-control is-invalid' : 'form-control'" id="customerName" v-model="customerName">
                                    <small class="text-danger">{{ eName }}</small>
                                </div>
                                <div class="mb-2">
                                    <label class="form-label" for="tableNo">Table No.</label>
                                    <input type="number" :class="eName ? 'form-control is-invalid' : 'form-control'" id="tableNo" v-model="tableNo">
                                    <small class="text-danger">{{ eTable }}</small>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div class="card-body">
                        <div v-if="eSelected" class="row">
                            <div class="col-12">
                                <small class="text-danger">{{ eSelected }}</small>
                            </div>
                        </div>
                        <div v-for="order in orders">
                            <div class="row">
                                <div class="col-6">{{ order.name }} (x{{ order.qty }})</div>
                                <div class="col-3">
                                    <div class="btn-group btn-group-sm">
                                        <button type="button" class="btn btn-outline-warning" @click="decreaseItemQty(order)">-</button>
                                        <button type="button" class="btn btn-outline-primary" @click="increaseItemQty(order)">+</button>
                                        <button type="button" class="btn btn-outline-danger" @click="deleteItem(order)">x</button>
                                    </div>
                                </div>
                                <div class="col-3 justify-end">
                                    <span>Rp {{ formatCurrency(order.price) }}</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span style="font-size:12px;" class="text-muted">Rp {{ formatCurrency(order.eachPrice) }}</span>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between">
                            <span style="font-weight:bold;">Total</span>
                            <span style="font-weight:bold;">Rp {{ formatCurrency(total) }}</span>
                        </div>
                        <div class="mt-3">
                            <button @click="submitOrder()" :disabled=processing type="submit" class="btn btn-success form-control">
                                <span v-if="processing == true">
                                    Sending...
                                    <lord-icon
                                        src="https://cdn.lordicon.com/odavpkmb.json"
                                        trigger="loop"
                                        style="width:25px;height:25px">
                                    </lord-icon>
                                </span>
                                <span v-if="processing == false">Submit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <input type="text" class="form-control" placeholder="Search" v-model="keyword" :onchange="searchItem()">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center text-danger" v-if="processing == true">Loading Data. Please Wait</div>
                        </div>
                        <div v-for="item in filteredItems" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                            <div class="card">
                                <img height="200px" :src="url+item.image" class="card-img-top object-fit-cover" alt="{{ item.image }}">
                                <div class="card-footer">
                                    <div class="row text-center">
                                        <div class="col-12">{{ item.name }}</div>
                                        <hr/>
                                        <div class="col-12">Rp {{ formatCurrency(item.price) }}</div>
                                        <hr/>
                                        <div class="col-12">
                                            <button type="button" @click="orderItem(item.id)" class="btn btn-primary">
                                                Order
                                            </button>
                                        </div>
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
            userName: '',
            roleId: '',
            items: [],
            filteredItems: [],
            keyword: '',
            url: 'https://sub.mykavling.store/public/public/items/',
            orders: [],
            total: 0,
            customerName: '',
            tableNo: '',
            processing: false,
            eName: '',
            eTable: '',
            eSelected: '',
        }
    },
    mounted() {
        document.title = "Order";
        this.userName = localStorage.getItem('name')
        this.roleId = localStorage.getItem('role_id')
        if (!this.userName) {
            router.push({ name: 'login' })
        }
        if (this.roleId != 4 && this.roleId != 1) {
            router.push({ name: 'home' })
        }
    },
    methods: {
        showProduct(){
            $('#productModal').modal('show')
            this.processing = true
            axios.get('https://sub.mykavling.store/api/item', {
                headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                this.items = response.data.data
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
            .finally(() => this.processing = false);
        },
        searchItem() {
            this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this.keyword.toLowerCase()))
        },
        orderItem(id)
        {
            let item = this.filteredItems.filter(item => item.id == id)[0]
            let orderItem = Object.assign({}, item)
            orderItem.eachPrice = item.price
            let indexArrayItem = this.orders.map(e => e.id).indexOf(orderItem.id)

            if(indexArrayItem != -1)
            {
                this.orders[indexArrayItem].qty++
                this.orders[indexArrayItem].price = this.orders[indexArrayItem].eachPrice * this.orders[indexArrayItem].qty
            } else 
            {
                orderItem.qty = 1
                this.orders.push(orderItem)
            }
            let orderPrice = this.orders.map(order => order.price)
            let totalPrice = 0

            orderPrice.forEach(price => {
                totalPrice += price
            })
            this.total = totalPrice
        },
        decreaseItemQty(order){
            if(order.qty <= 1) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Qty Tidak Boleh Kurang Dari 1. Klik tombol hapus untuk membatalkan item ini',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 600
                })
                return
            }
            let indexArrayItem = this.orders.map(e => e.id).indexOf(order.id)
            this.orders[indexArrayItem].qty--
            this.orders[indexArrayItem].price = this.orders[indexArrayItem].eachPrice * this.orders[indexArrayItem].qty
            let orderPrice = this.orders.map(order => order.price)
            let totalPrice = 0

            orderPrice.forEach(price => {
                totalPrice += price
            })
            this.total = totalPrice
        },
        increaseItemQty(order){
            let indexArrayItem = this.orders.map(e => e.id).indexOf(order.id)
            this.orders[indexArrayItem].qty++
            this.orders[indexArrayItem].price = this.orders[indexArrayItem].eachPrice * this.orders[indexArrayItem].qty
            let orderPrice = this.orders.map(order => order.price)
            let totalPrice = 0

            orderPrice.forEach(price => {
                totalPrice += price
            })
            this.total = totalPrice
        },
        deleteItem(order){
            Swal.fire({
                title: 'Warning',
                text: 'Apakah anda yakin ingin menghapus item ini dari order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Hapus!!',
            })
            .then((result) => {
                if (result.isConfirmed){
                    let indexArrayItem = this.orders.map(e => e.id).indexOf(order.id)
                    this.orders.splice(indexArrayItem, 1)

                    let orderPrice = this.orders.map(order => order.price)
                    let totalPrice = 0

                    orderPrice.forEach(price => {
                        totalPrice += price
                    })
                    this.total = totalPrice
                    Swal.fire({
                        icon: "info",
                        title: "Info",
                        title: "Item berhasil dihapus",
                        showConfirmButton: false,
                        timer: 600
                    });
                } else if(result.dismiss){
                    Swal.fire({
                    title: "Cancelled",
                    text: "Your Ordinary Items Are Safe!!!",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 700
                    });
                }
            })
        },
        submitOrder(orders){
            if(this.customerName == ''){
                this.eName = 'Customer Name is Required'
            }
            if(this.tableNo == ''){
                this.eTable = 'Table is Required'
            }
            if(this.orders == ''){
                this.eSelected = 'No Items Selected'
                return
            }
            let item = this.orders.map(item => {
                return {
                    'id': item.id,
                    'qty': item.qty
                }
            })
            // Ubah status proses menjadi true. maka tombol submit akan disabled
            this.processing = true
            // lalu jalankan api axios untuk penyimpanan data
            axios.post('https://sub.mykavling.store/api/order', {
                'customer_name': this.customerName,
                'table_no': this.tableNo,
                'items': item
            }, {
                // panggil headers authorize untuk mengenali token user
                headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            // then jika proses selesai
            .then((response) => {
                console.log(response)
                // reset item orders
                this.orders = []
                this.customerName = ''
                this.tableNo = ''
                this.total = 0
                // berikan alert
                Swal.fire({
                    title: "Success",
                    text: "Your Order Successfully Sended",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1200
                });
            })
            // jika gagal berikan response error dan tampilkan di console
            .catch(function (error) {
                // jika status error sama dengan 401 / token Auth tidak dikenali
                if(error.response.status == 401){
                // maka hapus data email, name, role_id, dan token dari localstorage 
                localStorage.removeItem('email')
                localStorage.removeItem('name')
                localStorage.removeItem('role_id')
                localStorage.removeItem('token')
                // lalu paksa untuk pindah ke route login
                router.push({ name: 'login' })
                }
                console.log(error);
                console.log('Error Fetch Items')
            })
            .finally(() => this.processing = false);
        },
        formatCurrency(value) {
            if (!value) return '';
            value = value.toString();
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
}
</script>
<style>
    .bordered {
        border: solid 1px;
    }
</style>