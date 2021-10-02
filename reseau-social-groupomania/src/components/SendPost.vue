<template>
    <form @submit="onSubmit">
        <h3>Publier</h3>
        <div>
            <label for="text">Texte </label>
            <input type="text" v-model="text" name="text" placeholder="Votre message ici">
        </div>
        <div>
            <label for="text">Image </label>
            <input type="file" ref="file" name="image" accept="image/jpg, image/jpeg, image/png" @change="changeFile">
        </div>
        <input class="btn" type="submit" value="Envoyer">
    </form>
</template>

<script>
    export default {
        name: 'SendPost',
        data() {
            return {
                text: '',
                file: ''
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault()

                // Si champs vides
                if (!this.text && !e.target.elements.image.value) {
                    alert('Veuillez entrer un message ou une image')
                    return
                }

                console.log(this.file)
                const image = this.file
                
                let date = new Intl.DateTimeFormat("fr" , {dateStyle: "short"});
                let time = new Intl.DateTimeFormat("fr" , {timeStyle: "short"});

                // Créer l'objet post
                const post = {
                    id: 1, // sera supprimé puis auto-incrémenté
                    text: this.text,
                    imageUrl: '',
                    date: date.format(Date.now()),
                    hour: time.format(Date.now()),
                }

                const object = {post, image}

                this.$emit('submit-post', object)

                // Clear le champs
                this.text = ''
            },
            changeFile() {
                this.file = this.$refs.file.files[0]
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";
    form {
        padding: 15px;
        border: 2px solid $secondary-color;
        border-radius: 10px;
        margin: 10px;
    }
    div {
        margin: 5px;
    }
    .btn {
        margin-top: 10px;
        margin-bottom: 5px;
    }
    h3 {
        margin-bottom: 15px;
    }
</style>