<template>
<div v-for="result in results" v-bind:key="result.token_id">
  <img :src=result.metadata.media />
</div>
</template>

<script>
import {getTokens, getTokensByAccount} from "./services.js"
export default {
    data(){
        return {
            results:'',
            response:'',
        }
    },
    mounted(){
        this.getTokensByAccount()
    },
methods:{
   async getNFTs(){
       this.results = await getTokens();
       console.log("RESULT",this.results)
    },

    // async mintNFT(){
    //     this.response = await mintNFT();
    // },
    async getTokensByAccount(){
        this.results = await getTokensByAccount();
        console.log(this.results)
    }
}

}
</script>

<style>

</style>