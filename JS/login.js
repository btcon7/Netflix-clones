
loginDetails = []

const { createApp } = window.Vue


const component = {
    data() {
        return {
            form: {
                username: null,
                password: null,
            }
        }
    },
    computed: {
        usernameIsValid() {
            return this.form.username.length > 1
        },
        passwordIsValid() {
            return this.form.password.length > 1
        }
    },

    methods: {
        submitForm() {
            // const usernameIsValid = this.form.username.length > 1//this.form.username.includes('@')
            // const passwordIsValid = this.form.password.length > 1//this.form.password.includes('@')
            const formIsValid = this.usernameIsValid && this.passwordIsValid
            if (formIsValid) {
                console.log('Form Submitted', this.form);


                let loginJsonItem = JSON.stringify(this.form);
                console.log("addedLogin")
                loginDetails.push(loginJsonItem);
                localStorage.setItem('userLogin', loginDetails);

            } else {
                console.log('Invalid Form')
            }
        }
    },

}



window.addEventListener('DOMContentLoaded', () => {
    const app = createApp(component)
    app.mount('#app')
})