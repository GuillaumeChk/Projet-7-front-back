<template>
    <div class="comment" v-if="post.id === comment.postId">
        <h5>
            {{ comment.userName }} a répondu :
            <span>le {{ comment.date }} à {{ comment.hour }}</span>
            <i v-show="canDelete" @click="$emit('delete-comment', comment.id)" class="fas fa-times"></i>
        </h5>
        <p>{{ comment.text }}</p>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        comment: Object,
        post: Object,
        isAdmin: Boolean,
        userName: String,
    },
    data() {
        return {
            canDelete: false,
        }
    },
    async created() {
        // Est admin ou le créateur du post : possibilité de supprimer le post
        if (this.comment.userName === this.userName || this.isAdmin) { 
            this.canDelete = true
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";
    .comment {
        border-radius: 5px;
        margin: 4px;
        margin-right: 15px;
        margin-bottom: 0;
        text-align: left;
        width: auto;
        margin-left: 30px;
        padding: 10px;
        border: 1px solid $color-accent;
        border-top: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        h5 {
            color:$color-accent;
            margin-bottom: 5px;
        }
        button {
            padding: 3px;
            padding-left: 10px;
            padding-right: 10px;
            background-color: white;
            color: $color-accent;
            border: 2px solid $secondary-color;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            border-top: none;
        }
    }
    h5, p {
            color: black;
    }
    h5 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .fas {
        color: $color-accent;
    }
</style>