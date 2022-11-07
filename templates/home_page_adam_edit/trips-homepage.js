const homepage_app = Vue.createApp( {

    //=========== DATA PROPERTIES ===========
    data() {
        return {
            curr_img_id: 1,
            num_images: 5,
        }
    },

    //=========== METHODS ===========
    methods: {

        func_1() {
        },
    },
})

homepage_app.mount('#homepage_app')