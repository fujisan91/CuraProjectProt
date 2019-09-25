<template>
    <div class="login-form">
        <form @submit.prevent="userCreate">
            <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
            <p><input type="text" v-model="password" placeholder="password" name="password"/></p>
            <div class="login-btn">
                <button type="submit">新規作成</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            error: null,
            email: "",
            password: "",
        }
    },
    methods: {
        userCreate(){
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .catch(function(error){
                alert('登録できません('+error.message+')');
            });
        },
        doLogin(){
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
            alert('ログインできません（' + error.message + '）');
            });
        }
    }
}
</script>