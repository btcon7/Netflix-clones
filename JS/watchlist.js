
console.log('toffie')
const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

//select tab content item
function selectItem(e) {
    console.log('selectitems');
    removeBorder();
    //add border to current tab
    this.classList.add('tab-border');
}


//listen for tab click
tabItems.forEach(item => item.addEventListener('click', selectItem));

function removeBorder() {
    tabItems.forEach(item => item.classList.remove('tab-border'));
}


//API WORK
// console.log('hello world')
const URL = "https://project-apis.codespace.co.za/api/movies"
const URL2 = "https://project-apis.codespace.co.za/api/list"




//Get Data
// const getData = () => new Promise((resolve) => {
//     fetch(URL)
//         .then(response => response.json())
//         .then(json => json.data.map(item => item))
//         .then(names => resolve(names))

// })



//example 2 how to print as list
// fetch(URL, { method: "GET" })
//     .then(response => response.json())
//     .then((response) => {
//         const liElements = response.data
//             .map((item) => `<li>${item.name}</li>`)
//             .join('')

//         document.body.innerHTML = `<ul>${liElements}</ul>`
//     })



//VUE WORK
const { createApp } = window.Vue

//example 2 how to print as list
// fetch(URL, { method: "GET" })
//     .then(response => response.json())
//     .then((response) => {
//         const liElements = response.data
//             .map((item) => `<li>${item.name}</li>`)
//             .join('')

//         document.body.innerHTML = `<ul>${liElements}</ul>`
//     })


const component = {
    data() {
        return {
            watchlist: [],
            search: '',
        }
    },
    methods: {
        fetchWatchlist() {
            let localStorageWatchlist = localStorage.getItem('movieWatchlist')
            if (!localStorageWatchlist) {
                return
            }
            let watchlistParsed = JSON.parse(localStorageWatchlist);
            watchlistParsed.forEach(movie => this.watchlist.push(JSON.parse(movie)))
        },

        remWatchlist(movieName) {
            console.log('removedfromwatch', this.watchlist)
            let updatedWatchlist = this.watchlist.filter(movie => (movie.name !== movieName));
            this.watchlist = updatedWatchlist //filter creates a new array, re saving updatedWatchlist as the new filtered array
            console.log(updatedWatchlist)
            let newArr = updatedWatchlist.map(movie => JSON.stringify(movie))
            console.log('updatedWatchlist', updatedWatchlist)
            console.log('newArr', newArr)
            localStorage.setItem('movieWatchlist', JSON.stringify(newArr));
        },
    },
    computed: {
        filteredList() { //HOW TO FILTER IN Vue
            console.log('outside variable', this.watchlist);
            return this.watchlist.filter(item => item.name?.includes(this.search))
        }

    },

    mounted() {
        this.fetchWatchlist()
        // console.log("im mounted")
        // let jsString = localStorage.getItem('movieWatchlist');
        // let watchlistParsed = JSON.parse(jsString);
        // watchlistParsed.forEach(movie => this.list.push(JSON.parse(movie)))
    },
    template: /*HTML - first line cool tip for while data loading*/`
    <div v-show="watchlist.length < 1">Fetching data...</div> 
    <div v-if="watchlist.length > 1">
    <p class="text-md text-center">Search Movie</p>
        <input v-model="search">
            <ul class="movieList">
                 <li v-for="item in filteredList">
                 <div class="thumbnailDiv">
                 {{ item.name }} 
                 <img :src="item.image" alt="item.name" class="thumbnail">
                 <button @click="remWatchlist(item.name)" class="btn btn-rounded">Remove</button>
                 </div>
                 </li>
             </ul>
        </div>
`
}



window.addEventListener('DOMContentLoaded', () => {
    const app = createApp(component)
    app.mount('#app')
})