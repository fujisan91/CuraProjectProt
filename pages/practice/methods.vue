<template>
  <div>
    <h1>Nuxt.jsのmethodsの練習</h1>
    <div class="contents">
      <div class="description">
        <p>
          methodsに定義した値はtemplateでもscriptでも使用することができます。<br>
          例えば
          <code>&lt;a v-on:click='someMethod'&gt;</code>
          とtemplateに記述することでクリックされたらsomeMethodを実行するといったようなことができます！
        </p>
        <p>早速methodsを使ってみましょう！</p>
      </div>
      <div class="example">
        <h3>example</h3>
        <input type='number' v-model='x' />
        <input type='number' v-model='y' />
        <div v-on:click='calc'><button>足す</button></div>
        <p>合計：{{ sum }}</p>
      </div>
      <div class="practice">
        <h3>practice</h3>
        掛け算をしてみよう
        <p>
        </p>
      </div>
      <div class="description">
        <p>
          好きな値で、表示が変わることを確認出来たらmethodsの扱いは完璧です！
        </p>
      </div>
    </div>
    <nuxt-link to='/practice/v-model'>前の練習へ</nuxt-link>
    <nuxt-link to='/practice/props'>次の練習へ</nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      x: '',
      y: '',
      sum: ''
    }
  },
  methods: {
    calc() {
      this.sum = parseInt(this.x) + parseInt(this.y)
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