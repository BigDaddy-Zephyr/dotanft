<template>
  <div class="lab__container">
    <div
      ref="capture"
      :style="{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), no-repeat center center / cover`,
      }"
      class="lab__card"
    > 
    <div v-if=player >
      <img :src="heroImg"/>
      <p>{{player.kills}}/{{player.deaths}}/{{player.assists}}
        {{ player.personaname}}</p>
      <small>{{ }}</small>
      <img :src="heroItems[0]"/>
      <img :src="heroItems[1]"/>
      <img :src="heroItems[2]"/>
      <img :src="heroItems[3]"/>
      <img :src="heroItems[4]"/>
      <img :src="heroItems[5]"/>
      <!-- <img :src="heroItems[6]"/> -->
      </div>
      
    </div>
  </div>
      <button class="lab__btn" @click="onCapture" :disabled="capturing">
        {{ capturing ? "Capturing..." : "Capture" }}
    </button>
    <!-- <button class="lab__btn" @click="claim">
        {{ claiming ? "Claiming..." : "Claim" }}
    </button> -->
  <!-- <img src="https://arweave.net/w_s85t4OrBPMwzw5LhqxUdgP2k8D70A1I0o6FaL-JoM"/> -->
</template>

<script>
import { mapGetters, mapMutations,mapActions} from "vuex";
import {mintNFT} from "./services.js"
import html2canvas from "html2canvas";
import axios from 'axios'
export default {
  name: "app-lab",
  data() {
    return {
      name: "",
      quote: "",
      image: "",
      capturing: false,
      output: null,
      pngUrl:'',
      arweaveId:'',
      result:'',
    };
  },
mounted() {
    this.onGetPlayerData(),
    this.onGetMatchData();
  },
  methods: {
    ...mapActions(["getPlayerData","getMatchData"]),
    ...mapMutations(["setImage"]),
    onGetPlayerData(){
      this.getPlayerData()
    },
    onGetMatchData(){
      this.getMatchData({match:this.$route.query.match,player:this.$route.query.player})
    },
    onCapture() {
      this.capturing = true;
      const capture = this.$refs.capture;
      console.log(this.heroItems)
 html2canvas(capture,{useCORS:true,allowTaint: true}).then(function(canvas) {
    document.body.appendChild(canvas);
    let pngUr = canvas.toDataURL();
    axios.post('https://dota-nft.herokuapp.com/',{data:pngUr}).then((data)=>{
    let arId=data.data.id
    arId="https://arweave.net/"+arId
    mintNFT(arId)
    }
    )
    })
    .catch((error) => {
        this.capturing = false;
        
        console.error("oops, something went wrong!", error);
        });
      },
    claim(){
    console.log("HELOOo")
    },
  },
  computed: {
    ...mapGetters(["playerData","matchData","heroImg","heroItems"]),  
    ...mapGetters(["selected","player"]),
  },
};
</script>

<style scoped>
.lab__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 100%;
  min-height: 448px;
  padding: 40px 50px;
  background-color: #d9f1e3;
}

.lab__card {
  width: 30%;
  width: 300px;
  height: 400px;
  border-radius: 9px;
  padding: 20px;
  object-fit: contain;
  transition: transform 0.45s;
  color: black;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
}

.lab__card > p {
  font-size: 30px;
  font-style: italic;
  margin-bottom: 10px;
}

.lab__card > small {
  font-style: bold;
  float: right;
}

.lab__tools {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 50%;
  background-color: #c0decd;
  border-radius: 9px;
  padding: 20px 50px;
}

.lab__tools > * {
  margin: 10px 0;
  width: 100%;
}

.lab__tools > textarea {
  width: 100%;
}

.lab__form {
  border: none;
  border-radius: 9px;
  padding: 10px;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
}

.lab__btn {
  border: none;
  cursor: pointer;
  padding: 10px;
  background: #ffc107;
  color: white;
  border-radius: 9px;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
}

.lab__btn:hover {
  background: transparent;
}

@media screen and (max-width: 992px) {
  .lab__tools,
  .lab__card {
    width: 100%;
  }

  .lab__tools {
    margin: 40px 0;
  }

  .lab__card > p {
    padding: 0.5rem 0;
  }
}

@media screen and (max-width: 410px) {
  .lab__card > p {
    font-size: 25px;
  }
}
</style>