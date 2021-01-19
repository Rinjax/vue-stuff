<template>
    <v-app>
        <v-main>
            <v-row no-gutters class="full-height">
                <v-col class="d-flex pa-4 align-center justify-space-around">
                    <v-card elevation="14" width="500">
                        <v-card-title><h3 class="text-center">Login</h3></v-card-title>
                        <v-card-text>
                            <p :class="messageClass">{{message}}</p>
                            <v-form>
                                <v-text-field
                                    label="username"
                                    v-model="form.username"
                                    @focus="messageClear"
                                ></v-text-field>
                                <v-text-field
                                    label="password"
                                    type="password"
                                    v-model="form.password"
                                    @focus="messageClear"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="login">login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'LoginVue',
    components: {

    },
    data: () => ({
        message: null,
        messageClass: null,
        form: {
            username: null,
            password: null
        }
    }),

    created() {
        console.log('main logon component');
    },

    methods:{
        login() {
            axios.get('/sanctum/csrf-cookie').then(() => {

                axios.post('/ui/login', this.form).then(response => {

                    console.log('success? ' , response.status);

                    switch (response.status) {
                        case 403:
                            this.invalidCredentials();
                            break;
                        case 500:
                            alert('oh god no!');
                            break;
                        default:
                            this.successfulLogin();
                            break;
                    }

                }).catch(e => {
                    console.log(e);
                });

            }).catch(e => {
                console.log(e);
            })

        },

        successfulLogin() {
            this.$store.dispatch('user/getUser').then(() => {
                this.$router.push({name: 'Dashboard'});
            }).catch(e => {
                console.log(e);
            });
        },

        invalidCredentials() {
            this.form.password = null;
            this.messageError('Invalid Username or Password');
        },

        messageError(string) {
            this.messageClass = "message-error";
            this.message = string;
        },

        messageClear() {
            this.message = null;
            this.messageClass = 'message-bye';
        }
    }

}
</script>

<style scoped>
    .message-error {
        color: #dd0000;
        background-color: #220000;
        padding: 0.5rem;
        text-align: center;
        border-radius: 5px;
        transition: all 500ms;
    }

    .message-bye {
        transition: all 500ms;
        opacity: 0;
    }

    .full-height {
        min-height: 100vh;
        background: rgb(104,252,137);
        background: radial-gradient(circle, rgba(104,252,137,1) 0%, rgba(103,24,116,1) 100%);
    }
</style>
