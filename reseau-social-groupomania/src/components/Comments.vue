<template>
    <button @click="toggleComments" class="btn-show-comments">{{ btnTexte }} les commentaires</button> <!-- v-show="hasComments" -->
    <div v-if="showComments">
        <div :key="comment.id" v-for="comment in comments">
            <Comment @delete-comment="deleteComment" :comment="comment" :post="post" />
        </div>
    </div>
</template>

<script>
import Comment from './Comment.vue'

export default {
    name: 'ShowComments',
    props: {
        post: Object,
        comments: Array
    },
    components: {
        Comment
    },
    data() {
        return {
            showComments: false,
            btnTexte: 'Afficher',
            // hasComments: false
        }
    },
    // computed: {
    //     hasComments() {
    //         return (typeof this.comments.find(this.post.id === this.comments.postId) !== 'undefined')
    //     }
    // },
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
    // created() {
    //     if(this.comments.find(this.post.id === this.comments.postId)){
    //         this.hasComments = true
    //     }
    // },
    emits: ['delete-comment']
}
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";

    .btn-show-comments {
        // display: block;
        margin-left: 30px;
        // margin-right: 15px;
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