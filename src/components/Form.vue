<template>
    <div class="form-group">
    <label for="matchId">Match ID</label>
    <input type="text"
           id="matchId"
           class="form-control"
           v-model="userData.matchId">
</div>
<button class="btn btn-primary"
        @click.prevent="submitted">Submit!
</button>
<div v-for="player in match1data" v-bind:key="player.account_id">
<router-link :to="{path:'/mint',query:{player: player.account_id,match:player.match_id}}">{{player.personaname}}</router-link>,{{player.kills}}
</div>
</template>
<script>
import { mapActions,mapMutations, mapGetters} from "vuex";
    export default {
        data() {
            return {
                result:'',
                userData: {
                    matchId: '',
                }
            }
        },
        methods:{
            ...mapMutations(["setmatch1data"]),
            ...mapActions(["getMatch"]),
            ...mapGetters(["match1data","matchId"]),
            
            async submitted(){
                console.log(this.match1data)
                this.setmatch1data(this.userData.matchId)
                this.getMatch(this.match1data)
            }
        },
        computed: {
    ...mapGetters(["match1data"]),  
  },
    }
</script>
