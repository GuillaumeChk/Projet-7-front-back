<template>
    <button @click="toggleComments" class="btn-show-comments">{{ btnTexte }} les commentaires</button>
    <div v-if="showComments">
        <div :key="comment.id" v-for="comment in comments">
            <Comment @delete-comment="deleteComment" :comment="comment" :post="post" :isAdmin="isAdmin" :userName="userName" />
        </div>
    </div>
</template>

<script>
import Comment from './Comment.vue'

export default {
    name: 'ShowComments',
    props: {
        post: Object,
        comments: Array,
        isAdmin: Boolean,
        userName: String,
    },
    components: {
        Comment
    },
    data() {
        return {
            showComments: false,
            btnTexte: 'Afficher',
        }
    },
    methods: {
        toggleComments() {
            this.showComments = !this.showComments
            if (this.showComments) {
                this.btnTexte = 'Masquer'
            }
            else {
                this.btnTexte = 'Afficher'
            }
        },
        deleteComment(id) {
            this.$emit('delete-comment', id)
        }
    },
    emits: ['delete-comment']
}
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";

    .btn-show-comments {
        margin-left: 30px;
        padding:3px 6px 3px 6px;
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