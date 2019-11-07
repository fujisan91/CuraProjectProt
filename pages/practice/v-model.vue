<template>
  <div>
    <h1>Nuxt.jsのv-modelの練習</h1>
    <div class="contents">
      <div class="description">
        <p>
          v-modelはデータをバインディングするために使われます。
          <code>&lt;input v-model='somedata'&gt;</code>
          とtemplateに記述することでsomedataとユーザーの入力値をバインディングすることができます。
        </p>
        <p>早速v-modelを使ってみましょう！</p>
      </div>
      <div class="example">
        <h3>example</h3>
        <input type='text' v-model='content' placeholder="ここに入力した文字がバインディングされる" />
        <p>{{ content }}</p>
      </div>
      <div class="practice">
        <h3>practice</h3>
        <p>
          <input type='text' placeholder="ここに入力した文字がバインディングされる" />
          <!-- ここにdataにバインディングした値を表示してみよう -->
        </p>
      </div>
      <div class="description">
        <p>
          dataを好きな値に変え、表示が変わることを確認出来たらv-modelの扱いは完璧です！
        </p>
      </div>
    </div>
    <nuxt-link to='/practice/computed'>前の練習へ</nuxt-link>
    <nuxt-link to='/practice/methods'>次の練習へ</nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: ''
    }
  }
  
}
</script>
<style scoped>
.contents {
  margin: 10px;
}
.description {
  padding: 10px;
}
.example, .practice {
  margin: 20px;
  border: 1px solid;
}
input {
  width: 80%;
}
</style>