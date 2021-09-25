<template>
    <div class="container index">
        <div class="row">
            <div class="col s6 m4 l4 smoothies-row" v-for="smoothie in smoothies" :key="smoothie.id">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
                        <span class="card-title">{{ smoothie.title }}</span>
                    </div>
                    <div class="card-action">
                       <ul class="ingredients">
                           <li v-for="(ing,index) in smoothie.ingredients" :key="index">
                               <span class="chip">{{ ing }}</span>
                           </li>
                       </ul>
                    </div>
                    <div class="card-button">
                        <router-link :to="{name:'Edit Smoothie', params: { smoothie_slug: smoothie.slug} }" class="btn-floating btn-large halfway-fab blue accent-3">
                            <i class="material-icons">edit</i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: "Home",
    data(){
        return{
            smoothies:[]
        }
    },
    methods:{
        deleteSmoothie(id){
            db.collection('smoothies').doc(id).delete()
            .then(() => {
                this.smoothies = this.smoothies.filter(smoothie => {
                    return smoothie.id != id
                })
            })
        }
    },
    created(){
        db.collection('smoothies').get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                let smoothie = doc.data();
                smoothie.id = doc.id;
                this.smoothies.push(smoothie)
            })
        })
    }
}
</script>

<style>
.ingredients li{
    display: inline-block;;
}
.index .delete{
    position: absolute;
    top: 2rem;
    right: 0.5rem;
    color: red;
    cursor: pointer;
}
.smoothies-row{
    margin-top: 15px;
}
</style>