<template>
    <form @submit="onSubmit">
        <label for="text"></label>
        <input type="text" v-model="text" name="text" placeholder="Votre message ici">
        <input class="btn" type="submit" value="Envoyer">
    </form>
</template>

<script>
    export default {
        name: 'SendReply',
        props: {
            id: Number,
        },
        data() {
            return {
                text: '',
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault()
                // Si champs vide
                if (!this.text) {
                    alert('Veuillez entrer un message')
                    return
                }

                let date = new Intl.DateTimeFormat("fr" , {dateStyle: "short"});
                let time = new Intl.DateTimeFormat("fr" , {timeStyle: "short"});

                // Créer l'objet post
                const comment = {
                    id: 1, // sera supprimé puis auto-incrémenté
                    postId: this.id,
                    text: this.text,
                    date: date.format(Date.now()),
                    hour: time.format(Date.now()),
                }

                this.$emit('submit-comment', comment)

                // Clear le champs
                this.text = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";
    form {
        padding: 15px;
    }
</style>