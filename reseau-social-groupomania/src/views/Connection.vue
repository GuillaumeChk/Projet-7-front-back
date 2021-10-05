<template>
    <div class="container">
        <div class="buttons">
            <button @click="onClick" v-bind:class="(loggingIn)?'selected':''">Se connecter</button>
            <button @click="onClick" v-bind:class="(!loggingIn)?'selected':''">S'enregistrer</button>
        </div>
        <!-- Connexion -->
        <form @submit="onConnect" v-show="loggingIn">
            <ul>
                <li>
                    <label for="">Mail : </label>
                    <input type="email" name="mail" pattern="(.+)@(.+){2,}\.(.+){2,}" autofocus required>
                </li>
                <li>
                    <label for="">Mot de passe : </label>
                    <input type="password" name="password" pattern="^(?=.*[A-Za-z])(?=.*[0-9])([A-Za-z0-9]){8,}$" oninvalid="setCustomValidity('Veuillez entrer au moins 8 caractères dont au moins 1 chiffre.')" required/>
                </li>
            </ul>
            <p v-show="connectionRefused" class="connectionRefused">Mot de passe et/ou adresse email incorrect(s)</p>
            <input class="btn" type="submit" value="Valider">
        </form>
        <!-- Enregistrement -->
        <form @submit="onRegister" v-show="!loggingIn">
            <ul>
                <li>
                    <label for="">Prénom : </label>
                    <input type="text" name="firstName" required>
                </li>
                <li>
                    <label for="">Nom : </label>
                    <input type="text" name="lastName" required>
                </li>
                <li>
                    <label for="">Mail : </label>
                    <input type="email" name="mail" pattern="(.+)@(.+){2,}\.(.+){2,}" required>
                </li>
                <li>
                    <label for="">Mot de passe : </label>
                    <input type="password" name="password" pattern="^(?=.*[A-Za-z])(?=.*[0-9])([A-Za-z0-9]){8,}$" oninvalid="setCustomValidity('Veuillez entrer au moins 8 caractères dont au moins 1 chiffre.')" required/>
                </li>
            </ul>
            <input class="btn" type="submit" value="Valider">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Connection',
        data() {
            return {
                loggingIn: true,
                connectionRefused: false,
                users: []
            }
        },
        methods: {
            onClick() {
                this.loggingIn = !this.loggingIn
            },
            async onConnect(e) {
                e.preventDefault()

                // remplissage d'un user avec les champs remplis
                const user = {
                    mail: e.target.elements.mail.value,
                    password: e.target.elements.password.value,
                }

                this.goToPosts(user);
                // // retourne un tableau de 2 valeurs (res et data)
                // const tab = await this.loginUser(user)
                // const res = tab[0]
                // const data = tab[1]

                // // Afficher les publications si connexion ok
                // if(res.ok === true) {
                //     this.$router.push({
                //         name: "Posts", 
                //         params: { 
                //             userName: data.userName,// transmettre l'user name
                //             token: data.token// transmettre le token
                //         } 
                //     })
                // }
                // else {
                //     this.connectionRefused = true
                // }
            },
            async onRegister(e) {
                e.preventDefault()

                // création d'un user avec les champs remplis
                const user = {
                    id: 1, // sera supprimé puis auto-incrémenté
                    name: e.target.elements.firstName.value + ' ' + e.target.elements.lastName.value,
                    mail: e.target.elements.mail.value,
                    password: e.target.elements.password.value,
                }

                // enregistre user dans la db
                await this.registerUser(user)

                this.goToPosts(user);
                // // retourne un tableau de 2 valeurs (res et data)
                // const tab = await this.loginUser(user)
                // const res = tab[0]
                // const data = tab[1]

                // // Afficher les publications si connexion ok
                // if(res.ok === true) {
                //     this.$router.push({
                //         name: "Posts", 
                //         params: { 
                //             userName: data.userName, // transmettre l'user name
                //             token: data.token // transmettre le token
                //             }
                //         })
                // }
                // else {
                //     this.connectionRefused = true
                // }
            },
            async goToPosts(user) {
                // retourne un tableau de 2 valeurs (res et data)
                const tab = await this.loginUser(user)
                const res = tab[0]
                const data = tab[1]

                // Afficher les publications si connexion ok
                if(res.ok === true) {
                    // enregistrer le token de manière persistente (on reload page)
                    localStorage.setItem('token', data.token)
                    // console.log(localStorage.getItem('token'))
                    this.$router.push({
                        name: "Posts", 
                        params: { 
                            userName: data.userName, // transmettre l'user name
                            // token: data.token, // transmettre le token
                            isAdmin: data.isAdmin, // converti en boolean
                            userId: data.userId,
                        }
                    })
                }
                else {
                    this.connectionRefused = true
                }
            },
            async registerUser(user) {
                await fetch('http://localhost:3000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
            },
            async loginUser(user){
                const res = await fetch('http://localhost:3000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                const data = await res.json()
                return [res, data]
            },
            async fetchUsers() {
                const res = await fetch('http://localhost:3000/api/users')
                const data = await res.json()
                return data
            },
        },
        // async created() {
        //     this.users = await this.fetchUsers()
        // }
    }
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";
    .container {
        border: 2px solid;
        border-radius: 10px;
        // background-color: $primary-color;
        margin: 10px;
        padding: 10px;
    }
    button {
        border: none;
        background: none;
        width: auto;
        padding: 20px;
        font-size: 1.5rem;
        margin-top: 5px;
        margin-bottom: 20px;
        border-radius: 10px;
        &:hover {
            background-color: $secondary-color;
            color: $color-accent;
        }
    }
    .selected {
        color: $color-accent;
        border-bottom: 2px solid $color-accent;
    }
    ul {
        list-style-type: none;
    }
    li {
        margin-bottom: 15px;
        display: flex;
        label {
            flex: 1;
            color: black;
        }
        input {
            flex: 1;
        }
    }
    .connectionRefused {
        color: red;
    }
</style>