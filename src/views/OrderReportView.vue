<template lang="">
    <SideBar :role="roleId" />
    <div class="mdc-layout-grid">
        <div class="mb-2 w-35">
            <div class="card">
                <div class="card-body">
                    <label for="month" class="form-label">Month</label>
                    <select class="form-control" id="month" v-model="month" @change="getReport()">
                        <option class="text-center" v-for="month in months" :value=month.value :selected="selectedMonth === month.value">{{ month.name }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <p class="text-center">Order Count</p>
                        <h1 class="text-center text-default">{{ data.orderCount ? data.orderCount : 0 }}</h1>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <p class="text-center">Min Purchase</p>
                        <h1 class="text-center text-default">Rp {{ formatCurrency(data.minPayment) }}</h1>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <p class="text-center">Max Purchase</p>
                        <h1 class="text-center text-default">Rp {{ formatCurrency(data.maxPayment) }}</h1>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 mt-2">
                <h6 class="card-title">Order/date chart</h6>
                <canvas id="orderChart" width="400" height="150"></canvas>
            </div>
            <div class="col-12 col-md-6 mt-2">
                <h6 class="card-title">Order/datetime chart</h6>
                <canvas id="newChart" width="400" height="150"></canvas>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(order, index) in orders" :key="index">
                                    <td class="text-left">{{ index+1 }}</td>
                                    <td class="text-left">{{ order.customer_name }}</td>
                                    <td class="text-left">{{ order.table_no }}</td>
                                    <td class="text-left">{{ order.order_date }}</td>
                                    <td class="text-left">{{ order.order_time }}</td>
                                    <td class="text-left">{{ order.total }}</td>
                                    <td class="text-left">{{ order.status }}</td>
                                    <td class="text-left">{{ order.waiters.name }}</td>
                                    <td class="text-left">{{ order.cashier ? order.cashier.name : '' }}</td>
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
import Chart from 'chart.js/auto';
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
            month: '',
            orders: [],
            data: '',
            chart: null,
            barChart: null,
            selectedMonth: null,
        }
    },
    mounted(){
        document.title = "Report";
        this.roleId = localStorage.getItem('role_id')
        this.userName = localStorage.getItem('name')
        if(!this.userName){
            router.push({ name: 'login' })
        }
        this.updateChart()
        const months = [1,2,3,4,5,6,7,8,9,10,11,12];

        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const currentMonthName = months[currentMonthIndex];
        this.selectedMonth = currentMonthName
    },
    methods: {
        getReport() {
        $("#loadingModal").modal("show");
        axios.get('https://sub.mykavling.store/api/order-report?month=' + this.month, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
            this.orders = response.data.data.orders;
            this.data = response.data.data;
            this.updateChart();
            })
            .catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('email');
                localStorage.removeItem('name');
                localStorage.removeItem('role_id');
                localStorage.removeItem('token');
                this.$router.push({ name: 'login' });
            }
            }).finally(() => {
            $("#loadingModal").modal("hide");
            });
        },
        updateChart() {
        const orderTotalsByDate = this.orders.reduce((acc, order) => {
            const date = order.order_date;
            if (!acc[date]) {
            acc[date] = 0;
            }
            acc[date] += order.total;
            return acc;
        }, {});
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        };
        const getRandomColor = () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return `rgba(${r}, ${g}, ${b}, 1)`;
        };
        const labels = Object.keys(orderTotalsByDate).map(formatDate);
        const data = Object.values(orderTotalsByDate);

        const label = this.orders.map(order => `date:${formatDate(order.order_date)} time:${order.order_time}`);
        const datas = this.orders.map(order => order.total);

        const ctx = document.getElementById('orderChart').getContext('2d');
        const cta = document.getElementById('newChart').getContext('2d');
        if (this.chart) {
            this.chart.destroy();
        }
        if (this.barChart) {
            this.barChart.destroy();
        }
        const backgroundColors = datas.map(() => getRandomColor());
        const borderColors = datas.map(() => getRandomColor());
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: labels,
            datasets: [{
                label: 'Total',
                data: data,
                borderColor: borderColors,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
            },
            options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
            }
        });

        this.barChart = new Chart(cta, {
            type: 'line',
            data: {
                labels: label,
                datasets: [{
                    label: 'Total',
                    data: datas,
                    borderColor: borderColors,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
            }
        });
        },
        formatCurrency(value) {
        if (!value) return '';
        value = value.toString();
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
}
</script>
<style lang="">
    
</style>