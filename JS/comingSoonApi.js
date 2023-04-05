//API WORK





//Get Data





//VUE WORK
// { createApp } = window.Vue



const comingSoonComponent = {
    data() {
        return {
            list: [],
            slide: 0,
            sliding: null
        }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        }
    },
    computed: {

        comingSoon() {
            console.log('this', this.list.filter(item => !!item.is_coming_soon))
            return this.list.filter(item => !!item.is_coming_soon)
        },
    },

    mounted() {
        console.log("im mounted")
        getData().then(resolveData => { this.list = resolveData })
        console.log('comingSoon', this.list)


    },
    template: /*HTML - first line cool tip for while data loading*/`
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <p class="comingSoonText">Coming Soon</p>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img :src="comingSoon[0]?.image" class="d-block w-100" alt="...">
     
    </div>
    <div class="carousel-item">
      <img :src="comingSoon[1]?.image" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img :src="comingSoon[2]?.image" class="d-block w-100" alt="...">
    </div>
  </div>
 
</div>
`
}



window.addEventListener('DOMContentLoaded', () => {
    const app = createApp(comingSoonComponent)
    app.mount('#comingSoon')
})