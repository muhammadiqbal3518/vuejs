<template lang="">
    <nav class="navbar fixed-bottom navbar-light">
        <div class="container justify-content-around">
            <RouterLink v-if="$route.name == 'home'" class="nav-link"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="Home Page"
            style="background-color:rgba(98, 234, 255, 0.431); border-radius:15%;" to="/">
                <lord-icon
                    src="https://cdn.lordicon.com/laqlvddb.json"
                    trigger="hover"
                    style="width:25px;height:25px">
                </lord-icon>
            </RouterLink>
            <RouterLink v-if="$route.name != 'home'" class="nav-link" to="/"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="Home Page">
                <lord-icon
                    src="https://cdn.lordicon.com/laqlvddb.json"
                    trigger="hover"
                    style="width:25px;height:25px">
                </lord-icon>
            </RouterLink>
            <div v-if="role == 4">
                <RouterLink v-if="$route.name == 'product'" class="nav-link"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Product Page"
                style="background-color:rgba(98, 234, 255, 0.431); border-radius:15%;" to="/product">
                    <lord-icon
                        src="https://cdn.lordicon.com/uecgmesg.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </RouterLink>
                <RouterLink v-if="$route.name != 'product'" class="nav-link" to="/product"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Home Page">
                    <lord-icon
                        src="https://cdn.lordicon.com/uecgmesg.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </RouterLink>
            </div>
            <div>
                <RouterLink v-if="$route.name == 'orderlist'" class="nav-link" 
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Order List Page"
                style="background-color:rgba(98, 234, 255, 0.431); border-radius:15%;" to="/order-list">
                    <lord-icon
                        src="https://cdn.lordicon.com/odavpkmb.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </RouterLink>
                <RouterLink v-if="$route.name != 'orderlist'" class="nav-link" to="/order-list"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Order List Page">
                    <lord-icon
                        src="https://cdn.lordicon.com/odavpkmb.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </RouterLink>
            </div>
            <div v-if="role == 1 || role == 4">
                <RouterLink v-if="$route.name == 'order'" class="nav-link" 
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Order Page"
                style="background-color:rgba(98, 234, 255, 0.431); border-radius:15%;" to="/order">
                    <lord-icon
                        src="https://cdn.lordicon.com/wzwygmng.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </RouterLink>
                <RouterLink v-if="$route.name != 'order'" class="nav-link" to="/order"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Order Page">
                    <lord-icon
                        src="https://cdn.lordicon.com/wzwygmng.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </RouterLink>
            </div>
            <div v-if="role == 4">
                <a v-if="$route.name == 'orderReport'" class="nav-link"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Report Page"
                style="background-color:rgba(98, 234, 255, 0.431); border-radius:15%;" href="/order-report">
                    <lord-icon
                        src="https://cdn.lordicon.com/abwrkdvl.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </a>
                <a v-if="$route.name != 'orderReport'" class="nav-link" href="/order-report"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Report Page">
                    <lord-icon
                        src="https://cdn.lordicon.com/abwrkdvl.json"
                        trigger="hover"
                        style="width:25px;height:25px">
                    </lord-icon>
                </a>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    props: ['role']
}
</script>
<style>
    .navbar {
    background-color: rgba(255, 255, 255, 0.138);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-height: 1.5cm;
    }

    .navbar .nav-link {
    color: #000;
    font-size: 24px;
    transition: color 0.3s ease;
    cursor: pointer;
    }

    .navbar .nav-link:hover {
    color: #007bff;
    }

    .navbar .nav-link.active {
    color: #007bff;
    font-weight: bold;
    }
</style>