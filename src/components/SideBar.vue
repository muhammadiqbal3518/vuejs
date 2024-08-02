<template lang="">
    <nav class="navbar fixed-bottom navbar-light">
        <div class="container justify-content-around">
            <RouterLink v-if="$route.name == 'home'" class="nav-link active" to="/">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">home</i>
            </RouterLink>
            <RouterLink v-if="$route.name != 'home'" class="nav-link" to="/">
                <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">home</i>
            </RouterLink>
            <div v-if="role == 4">
                <RouterLink v-if="$route.name == 'product'" class="nav-link active" to="/product">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">credit_card</i>
                </RouterLink>
                <RouterLink v-if="$route.name != 'product'" class="nav-link" to="/product">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">credit_card</i>
                </RouterLink>
            </div>
            <div>
                <RouterLink v-if="$route.name == 'orderlist'" class="nav-link active" to="/order-list">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">favorite</i>
                </RouterLink>
                <RouterLink v-if="$route.name != 'orderlist'" class="nav-link" to="/order-list">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">favorite</i>
                </RouterLink>
            </div>
            <div v-if="role == 1 || role == 4">
                <RouterLink v-if="$route.name == 'order'" class="nav-link active" to="/order">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">shopping_cart</i>
                </RouterLink>
                <RouterLink v-if="$route.name != 'order'" class="nav-link" to="/order">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">shopping_cart</i>
                </RouterLink>
            </div>
            <div v-if="role == 4">
                <RouterLink v-if="$route.name == 'orderReport'" class="nav-link active" to="/order-report">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">account_circle</i>
                </RouterLink>
                <RouterLink v-if="$route.name != 'orderReport'" class="nav-link" to="/order-report">
                    <i class="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">account_circle</i>
                </RouterLink>
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