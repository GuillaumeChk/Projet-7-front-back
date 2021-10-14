<template>
    <div class="container">
        <div class="head">
            <h2>Publications</h2>
            <button @click="toggleAddPost">{{ btnTexte }}</button>
        </div>
        <!-- publier -->
        <SendPost v-show="showAddPost" @submit-post="addPost" />
        <!-- liste des publications -->
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
            // token: '',
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
        
        // console.log("post.text : " + post.text)
        // console.log("post : " + post)

        let formData = new FormData();
        // formData.append('post', post)
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

        // mis à jour publications posts []
        const data = await res.json()
        this.posts.unshift(data.post)

        this.refreshPage()
      },
      async deletePost(id) {
        if(confirm('Supprimer cette publication ?')) {
          await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })

          // Cela supprime également tous les commentaires du post

          this.refreshPage()
        }
      },
      async addComment(comment) {
        comment = {
          ...comment,
          userName: this.userName,
          // PostId ajouté dans le sendReply
        }

        console.log("comment : "+ JSON.stringify(comment))

        const res = await fetch('http://localhost:3000/api/comments', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(comment)
        })

        res
        // const data = await res.json()

        // mis à jour publications posts []
        this.comments = [...this.comments, comment]
        this.refreshPage()
      },
      async deleteComment(id) {
        if(confirm('Supprimer ce commentaire ?')) {
          await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          this.refreshPage() 
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
        console.log("del "+this.userId)
        if(confirm('Êtes-vous sûr(e) de vouloir supprimer votre compte ?')) {
          await fetch(`http://localhost:3000/api/users/${this.userId}`, {
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
      refreshPage() {
        // this.$router.push({
        //   name: "Posts", 
        //   params: { 
        //       userName: this.userName, // transmettre l'user name
        //       // token: data.token, // transmettre le token
        //       isAdmin: this.isAdmin, // converti en boolean
        //       userId: this.userId,
        //   }
        //   // SAUVER DANS LOCALSTORAGE ?
        // })
      }
    },
    async created() {
      
      // Le token est-il nul ?
      if(localStorage.getItem('token') === null) {
        alert("Connexion expirée. Veuillez vous identifier à nouveau.")
        this.$router.push("/")
      }
      else { // Sinon récupérer tous les posts et comments
        this.posts = await this.fetchPosts()
        this.comments = await this.fetchComments()
        console.log(JSON.stringify(this.posts, null, 2))
        // récupère le nom d'utilisateur depuis la page Connection (grace à la clef primaire mail de User)
        this.userName = this.$route.params.userName
        this.isAdmin = (this.$route.params.isAdmin == 1)
        // et le token d'authentification
        this.UserId = this.$route.params.UserId
        console.log("UserId : " + this.UserId)
        console.log("userName : " + this.userName)
      }
    },
    // async mounted() {
    //   this.posts = await this.fetchPosts()
    //   this.comments = await this.fetchComments()
    // }
    // watch: {
    //   user: async function() {
    //     if (this.posts) {
    //       this.posts = await this.fetchPosts()
    //     }
    //   }
    // },
    // async updated() {
    //   this.posts = await this.fetchPosts()
    //   this.comments = await this.fetchComments()
    // }
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