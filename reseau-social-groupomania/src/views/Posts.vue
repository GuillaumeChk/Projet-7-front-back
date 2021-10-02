<template>
    <div class="container">
        <div class="head">
            <h2>Publications</h2>
            <button @click="toggleAddPost">{{ btnTexte }}</button>
        </div>
        <!-- publier -->
        <SendPost v-show="showAddPost" @submit-post="addPost" />
        <!-- liste des publications -->
        <div :key="post.id" v-for="post in posts">
            <Post @add-comment="addComment" @delete-post="deletePost" @delete-comment="deleteComment" :post="post" :comments="comments" :isAdmin="isAdmin" :userName="userName" />
        </div>
    </div>
    <div class="otherButtons">
        <button @click="onDisconnect" >Se déconnecter</button>
        <button @click="onDeleteAccount" >Supprimer son compte</button>
    </div>
</template>

<script>
import SendPost from '../components/SendPost.vue'
import Post from '../components/Post.vue'

export default {
    name: 'Posts',
    data() {
      return {
        showAddPost: false,
            btnTexte: 'Publier',
            posts: [],
            comments: [],
            userName: '',
            token: '',
            isAdmin: false,
            userId: '',
        }
    },
    components: {
        Post,
        SendPost,
    },
    methods: {
        toggleAddPost() {
            this.showAddPost = !this.showAddPost
            if (this.showAddPost) {
                this.btnTexte = 'Annuler'
            }
            else {
                this.btnTexte = 'Publier'
            }
        },
      async addPost(object) {
        // ajouter le créateur
        const post = {
          ...object.post,
          user: this.userName
        }
        
        // console.log("post.text : " + post.text)
        // console.log("post : " + post)

        let formData = new FormData();
        formData.append('post', post.text)
        formData.append('image', object.image)

        // console.log du formData
        for(var pair of formData.entries()) {
          console.log(pair[0]+ ', '+ pair[1]);
        }

        const res = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            // 'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          },
          body: formData
        })

        console.log(res)

        // mis à jour publications posts []

      },
      async deletePost(id) {
        if(confirm('Supprimer cette publication ?')) {
          await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + this.token
            }
          })

          // Cela supprime également tous les commentaires du post

        }
      },
      async addComment(comment) {
        comment = {
          ...comment,
          user: this.userName
        }
        await fetch('http://localhost:3000/api/comments', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          },
          body: JSON.stringify(comment)
        })
      },
      async deleteComment(id) {
        if(confirm('Supprimer ce commentaire ?')) {
          await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + this.token
            }
          })
        }
      },
      async fetchPosts() {
        const res = await fetch('http://localhost:3000/api/posts', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })
        const data = await res.json()
        return data
      },
      async fetchComments() {
        const res = await fetch('http://localhost:3000/api/comments', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })
        const data = await res.json()
        return data
      },
      onDisconnect() {
            this.$router.push("/")
      },
      async onDeleteAccount() {
        console.log("del "+this.userId)
        if(confirm('Êtes-vous sûr(e) de vouloir supprimer votre compte ?')) {
          await fetch(`http://localhost:3000/api/users/${this.userId}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + this.token
            }
          })
          
        }
        // supprimer tous les posts et commentaires

        this.$router.push("/")
      },
    },
    async created() {
      // récupère le nom d'utilisateur depuis la page Connection (grace à la clef primaire mail de User)
      this.userName = this.$route.params.userName
      this.isAdmin = (this.$route.params.isAdmin == 1)
      // et le token d'authentification
      this.token = this.$route.params.token
      this.userId = this.$route.params.userId

      this.posts = await this.fetchPosts()
      this.comments = await this.fetchComments()
    }
}
</script>

<style lang="scss" scoped>
@import "./src/scss/_variables.scss";
    .container {
        border: 2px solid;
        border-radius: 10px;
        margin: 10px;
        padding: 15px;
        // background-color: $primary-color;
    }
    button {
        width: auto;
        padding: 10px;
        font-size: 1.2rem;
        margin-bottom: 20px;
        background: none;
        width: auto;
        margin-top: 5px;
        border-radius: 10px;
        color: $color-accent;
        border: 2px solid $secondary-color;
        &:hover {
            background-color: $secondary-color;
        }
    }
    .head {
        margin-top: 10px;
        display: flex;
        justify-content:space-evenly;
        align-items: baseline;
    }
    h2 {
        color: $color-accent;
    }
    .otherButtons {
        display: flex;
        justify-content: space-evenly;
    }
</style>