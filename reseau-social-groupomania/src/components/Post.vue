<template>
    <div class="post">
        <h5>
            {{ post.userName }} a dit :
            <span>le {{ post.date }} à {{ post.hour }}</span>
            <i v-show="canDelete" @click="$emit('delete-post', post.id)" class="fas fa-times"></i>
        </h5>
        <!-- <img>{{ post.imageUrl }}</img> -->
        <img v-bind:src="imageSrc" alt="">
        <p>{{ post.text }}</p>
    </div>
    <Reply @add-comment="addComment" :post="post" />
    <!-- Commentaires -->
    <Comments @delete-comment="deleteComment" :comments="comments" :post="post" :isAdmin="isAdmin" :userName="userName" />
</template>

<script>
import Comments from './Comments.vue'
import Reply from './Reply.vue'

export default {
    name: 'Post',
    props: {
        post: Object,
        comments: Array,
        // user: Object,
        isAdmin: Boolean,
        userName: String,
    },
    data() {
        return {
            canDelete: false,
            // isAdmin: false,
            // userName: '',
            imageSrc: '',
        }
    },
    components: {
        Comments,
        Reply
    },
    methods: {
        deleteComment(id) {
            this.$emit('delete-comment', id)
        },
        addComment(comment) {
            this.$emit('add-comment', comment)
        },
        // async downloadImage(url) {
        //     const res = await fetch(`http://localhost:3000/api/posts/${url}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-type': 'application/json',
        //             Authorization: 'Bearer ' + localStorage.getItem('token')
        //         }
        //     })
        //     const data = await res.json()
        //     return data
        // }
    },
    async created() {
        // Est admin ou le créateur du post : possibilité de supprimer le post
        if (this.post.userName === this.userName || this.isAdmin) { 
            this.canDelete = true
        }

        // Affichage de l'image
        if (this.post.imageUrl != '') {
            console.log(this.post.imageUrl)
            // this.downloadImage(this.post.imageUrl)
            this.imageSrc=this.post.imageUrl
        }
    },
    emits: ['delete-post','delete-comment', 'add-comment']
}
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";
    .post {
        border: 1px solid;
        border-radius: 5px;
        text-align: left;
        padding: 10px;
        border: none;
        background-color: $secondary-color;
        margin-top: 12px;
        margin-bottom: 0;
        h5 {
            color:$color-accent;
            margin-bottom: 5px;
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
        color: red;
    }
</style>