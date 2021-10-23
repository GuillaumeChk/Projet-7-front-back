<template>
    <p>Connecté en tant que : {{ userName }}</p>
    <div class="container">
        <div class="head">
            <h2>Publications</h2>
            <button @click="toggleAddPost">{{ btnTexte }}</button>
        </div>
        <!-- Publier -->
        <SendPost v-show="showAddPost" @submit-post="addPost" />
        <!-- Liste des publications -->
        <p>Les plus récentes</p>
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
            isAdmin: false,
            UserId: 0,
            user: Object,
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
          userName: this.userName,
        }

        let formData = new FormData();
        formData.append('id', post.id)
        formData.append('userName', this.userName)
        formData.append('UserId', this.UserId)
        formData.append('text', post.text)
        formData.append('image', object.image)
        formData.append('date', post.date)
        formData.append('hour', post.hour)

        // console.log du formData
        for(var pair of formData.entries()) {
          console.log(pair[0]+ ', '+ pair[1]);
        }

        const res = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            // 'Content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: formData
        })

        res
        // mis à jour publications posts []
        this.posts = await this.fetchPosts()
      },
      async deletePost(id) {
        if(confirm('Supprimer cette publication ?')) {
          // Supprimer posts de la DB
          await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })

          // Cela supprime également tous les commentaires du post

          this.posts = await this.fetchPosts()
        }
      },
      async addComment(comment) {
        comment = {
          ...comment,
          userName: this.userName,
          // PostId ajouté dans le sendReply
          UserId: this.UserId,
        }

        console.log("comment : "+ JSON.stringify(comment))

        await fetch('http://localhost:3000/api/comments', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(comment)
        })

        this.comments = await this.fetchComments()
      },
      async deleteComment(id) {
        if(confirm('Supprimer ce commentaire ?')) {
          // Supprimer comment de la DB
          await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })

          this.comments = await this.fetchComments()
        }
      },
      async fetchPosts() {
        const res = await fetch('http://localhost:3000/api/posts', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
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
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        const data = await res.json()
        return data
      },
      onDisconnect() {
        // effacer le token
        localStorage.removeItem('token')
        this.$router.push("/")
      },
      async onDeleteAccount() {
        if(confirm('Êtes-vous sûr(e) de vouloir supprimer votre compte ?')) {
          await fetch(`http://localhost:3000/api/users/${this.UserId}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          
        }
        // supprimer tous les posts et commentaires

        // effacer le token
        localStorage.removeItem('token')
        this.$router.push("/")
      },
    },
    async created() {
      
      // Le token est-il nul ?
      if(localStorage.getItem('token') === null) {
        alert("Connexion expirée. Veuillez vous identifier à nouveau.")
        this.$router.push("/")
      }
      else { // Sinon récupérer tous les posts et comments
        
        // récupère le nom d'utilisateur depuis la page Connection (grace à la clef primaire mail de User)
        this.userName = this.$route.params.userName
        this.isAdmin = (this.$route.params.isAdmin == 1)
        this.UserId = this.$route.params.UserId

        this.posts = await this.fetchPosts()
        this.comments = await this.fetchComments()
        // console.log(JSON.stringify(this.posts, null, 2))
        // console.log(JSON.stringify(this.comments, null, 2))
      }
    },
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