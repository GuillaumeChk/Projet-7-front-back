<template>
    <button @click="toggleAddReply">{{ btnTexte }}</button>
    <SendReply v-show="showAddReply" @submit-comment="addReply" :id="post.id"/>
</template>

<script>
import SendReply from './SendReply.vue'

export default {
    name: 'Reply',
    props: {
        post: Object
    },
    components: {
        SendReply
    },
    data() {
        return {
            showAddReply: false,
            btnTexte: 'Répondre'
        }
    },
    methods: {
        toggleAddReply() {
            this.showAddReply = !this.showAddReply
            if (this.showAddReply) {
                this.btnTexte = 'Annuler'
            }
            else {
                this.btnTexte = 'Répondre'
            }
        },
        addReply(comment) {
            this.$emit('add-comment', comment)

            // Fermer le champs d'écriture du message
            this.toggleAddReply()
        },
    },
    emits: ['add-comment']
}
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";

    button {
        // margin-left: 15px;
        margin-right: 30px;
        padding: 3px 6px 3px 6px;
        background: none;
        color: $color-accent;
        border: 2px solid $secondary-color;
        border-top: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        &:hover {
            text-decoration: underline;
        }
    }
</style>