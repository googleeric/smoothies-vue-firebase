<template>
    <div class="addsmoothie container">
        <h2 class="center-align">Add Smoothie Recipe</h2>
        <div class="row">
            <form class="col s12 center-align" @submit.prevent="AddSmoothie">
                <div class="row">
                    <div class="field col s12">
                        <label for="add-title">Add Smoothie Title</label>
                        <input type="text" name="add-title" v-model="title">
                    </div>
                    <div v-for="(ing,index) in ingredients" :key="index" class="field">
                        <label for="ingredient">Ingredient:</label>
                        <input type="text" name="ingredient" v-model="ingredients[index]">
                        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
                    </div>
                    <div class="field col s12">
                        <label for="add-ingredients">Add Smoothie Ingredients</label>
                        <input type="text" name="add-ingredients" @keydown.tab.prevent="addIng" v-model="another">
                    </div>
                    <div class="col s12">
                        <p v-if="feedback" class="red-text">{{ feedback }}</p>
                    </div>
                    <div class="field col s12 mt-10">
                        <button class="btn pink">Add Smoothie</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddSmoothie',
    data(){
        return{
            title: null,
            another: null,
            ingredients:[],
            feedback: null,
            slug: null
        }
    },
    methods:{
        AddSmoothie(){
            if(this.title ){
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+`.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                })
                .then(() =>{
                    this.$router.push({name:'Home'})
                })
                .catch(err =>{
                    console.log(err)
                })
            }
            else{
                this.feedback = "Please Enter Smoothie Title"
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }
            else{
                this.feedback = "Please Enter Ingredients"
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style>
.addsmoothie{
    padding: 20px;
    max-width: 500px;
}
.addsmoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.addsmoothie .field{
    position: relative;
}
.addsmoothie .delete{
    position: absolute;
    right: 0;
    color: crimson;
    font-size: 1.4rem;
    cursor: pointer;
}
</style>