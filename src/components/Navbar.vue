<template>
    <div class="navbar">
        <nav class="nav-extended light-blue darken-4">
            <div class="nav-wrapper">
                <router-link :to="{name:'Home'}" class="brand-logo">Ninja Smoothies</router-link>
                <ul class="right hide-on-med-and-down">
                </ul>
            </div>
            <div class="nav-content">
                <router-link :to="{name:'Add Smoothie' }" class="btn-floating btn-large halfway-fab pink accent-3">
                    <i class="material-icons">add</i>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    data(){
        return{
        }
    }
}
</script>
<style>
.brand-logo{
    font-size: 1.8rem !important;
    margin-left: 1rem !important;
}
</style>