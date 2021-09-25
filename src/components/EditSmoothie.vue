<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2 class="center-align">Edit {{ smoothie.title }} Smoothie</h2>
        <div class="row">
            <form class="col s12 center-align" @submit.prevent="EditSmoothie">
                <div class="row">
                    <div class="field col s12">
                        <label for="update-title">Edit Smoothie Title</label>
                        <input type="text" name="update-title" v-model="smoothie.title">
                    </div>
                    <div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field">
                        <label for="ingredient">Ingredient:</label>
                        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
                    </div>
                    <div class="field col s12">
                        <label for="add-ingredients">Add Smoothie Ingredients</label>
                        <input type="text" name="update-ingredients" @keydown.tab.prevent="addIng" v-model="another">
                    </div>
                    <div class="col s12">
                        <p v-if="feedback" class="red-text">{{ feedback }}</p>
                    </div>
                    <div class="field col s12 mt-10">
                        <button class="btn pink">Update Smoothie</button>
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
    name: "EditSmoothie",
    data(){
        return{
            smoothie: null,
            another: null,
            feedback: null,
        }
    },
    methods:{
        EditSmoothie(){
            if(this.smoothie.title ){
                this.feedback = null
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+`.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
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
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }
            else{
                this.feedback = "Please Enter Ingredients"
            }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug','==',this.$route.params.smoothie_slug)
        ref.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data();
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-smoothie{
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.edit-smoothie .field{
    /* position: relative; */
    padding: 0;
}
.edit-smoothie .delete{
    position: absolute;
    color: crimson;
    font-size: 1.4rem;
    cursor: pointer;
}
</style>