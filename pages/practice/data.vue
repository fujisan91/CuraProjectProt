<template>
  <div>
    <h1>Nuxt.jsのdataの練習</h1>
    <div class="contents">
      <div class="description">
        <p>
          scriptで定義したdataは
          <code>{ {変数名} }</code>
          とtemplateに記述することで表示することができます
        </p>
        <p>早速dataを定義して表示してみましょう！</p>
      </div>
      <div class="example">
        <h3>example</h3>
        <p>{{ exampleData }}</p>
        <p>{{ exampleData2 }}</p>
      </div>
      <div class="practice">
        <h3>practice</h3>
        <p>
          <!-- ここにdataに定義した値を表示してみよう -->
        </p>
      </div>
      <div class="description">
        <p>
          dataを好きな値に変え、表示が変わることを確認出来たらdataの扱いは完璧です！
        </p>
      </div>
    </div>
    <nuxt-link to='/'>トップへ</nuxt-link>
    <nuxt-link to='/practice/computed'>次の練習へ</nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      exampleData: 'dataに定義した値です',
      exampleData2: 'カンマ区切りでdataを複数定義できます。'
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
</style>