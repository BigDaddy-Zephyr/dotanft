import axios from 'axios'
import { createStore } from "vuex"

const store = createStore({
  state: {
    images: [],
    image: '',
    selected: null,
    keyword: '',
    matchData:'asd',
    playerData:'asd',
    heroImg:'abc',
    heroItems:[],
    matchId:'',
    match1data:'',
    player:'',
  
  },
  mutations: {
    images: (state, payload) => (state.images= payload),
    search: (state, payload) => (state.images = payload),
    setKeyword: (state, payload) => (state.keyword = payload),
    selected: (state, payload) => (state.selected = payload),
    setImage: (state, payload) => (state.image = payload),
    matchData: (state,payload) => (state.matchData = payload),
    playerData: (state,payload) => (state.playerData = payload),
    heroImg: (state,payload) => (state.heroImg =payload),
    heroItems: (state,payload) => (state.heroItems=(payload)),
    matchId: (state,payload) => (state.matchId=(payload)),
    setmatch1data:(state,payload) => (state.match1data=(payload)),
    player:(state,payload) => (state.player=(payload))
  },
  actions: {

      getMatch(state,x){
        return new Promise((respond, reject) => {
          console.log("PAYLOAD",x)
          
        axios.get(" https://api.opendota.com/api/matches/"+x).then((response) => {
          console.log(response)
          let players = response.data.players
          state.commit("setmatch1data",players)
      })
      .catch(() => reject());
      })
      },
      
      getMatchData(state,payload){
      return new Promise((respond, reject) => {
      axios.get('https://api.opendota.com/api/matches/'+payload.match).then((response) => {
        state.commit("matchData", response)
        let players = response.data.players
        let player = players.filter(x=>x.account_id==payload.player)
        state.commit("player",player[0])
        axios.get('https://api.opendota.com/api/constants/heroes').then(data=>
      { 
        let heroimgurl = "https://dota-nft.herokuapp.com/image/?url=https://api.opendota.com"+data.data[player[0].hero_id].img
        axios.get(heroimgurl).then((data)=>{
          setTimeout(() => {
            state.commit("heroImg",data.data);
          }, 1000);
        })
      })
      let itemArray=[player[0].item_0,player[0].item_1,player[0].item_2,player[0].item_3,player[0].item_4,player[0].item_5,player[0].item_neutral]
      itemArray=itemArray.filter(item=>item)
      axios.get('https://api.opendota.com/api/constants/item_ids').then((data)=>{
      
      let itemsid=itemArray.map(x=> data.data[x]);

      axios.get('https://api.opendota.com/api/constants/items').then((data)=>{
        let itemsImg = itemsid.map(x=>data.data[x].img)
        itemsImg = itemsImg.map(x=>"https://dota-nft.herokuapp.com/image/?url=https://api.opendota.com"+x)
        for(let i=0;i<itemsImg.length;i++){
          axios.get(itemsImg[i]).then((data)=>{
            itemsImg[i]=data.data
          })
        }
        setTimeout(() => {
          state.commit("heroItems",itemsImg)
        }, 1000);
      })
    })
      
     //create an array for response.data.players[3].item_0...item_5
     // replace itemids by item names from constants/item_ids
     // replace item names by item images from constants/items
    })
    .catch(() => reject());
    })
    },


    getPlayerData(state){
      return new Promise((respond, reject) => {
      axios.get(' https://api.opendota.com/api/players/97658618/recentMatches').then((response) => {
        state.commit("playerData", response)
        respond()
    })
    .catch(() => reject());
    })
    },

    setSelected: (state, payload) => state.commit('selected', payload),
    loadImages(state) {
      const uri = `https://api.opendota.com/api/matches/6137231890`
        return new Promise((respond, reject) => {
            axios.get(uri)
            .then((response) => {
              console.log("PLAYERDATA",response)
                state.commit("images", response)
                respond()
            })
            .catch(() => reject());
        })
    },

    searchImages(state) {
      console.log("HSEARCH")
      const uri = `https://api.opendota.com/api/matches/6137231890`
      
      return new Promise((respond, reject) => {
          axios.get(uri)
          .then((response) => {
            console.log("PLAYERDATA",response)
              state.commit("search", response)
              respond()
          })
          .catch(() => reject());
      })
  },
  },
  getters: {
    images: state => state.images,
    image: state => state.image,
    selected: state => state.selected,
    keyword: state => state.keyword,
    playerData: state => state.playerData,
    matchData: state => state.matchData,
    heroImg: state => state.heroImg,
    heroItems: state=> state.heroItems,
    matchId: state=>state.matchId,
    match1data: state=>state.match1data,
    player: state=>state.player,
  }
})

export default store