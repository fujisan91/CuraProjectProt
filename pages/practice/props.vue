<template>
  <div>
    <h1>Nuxt.jsのpropsの練習</h1>
    <div class="contents">
      <div class="description">
        <p>
          propsを使用することで子コンポーネントへ値を渡すことができます。<br>
          例えば
          <code>&lt;TextComp :text='text'&gt;</code>
          とtemplateに記述することでTextCompコンポーネントへtextというdataを渡すことができます！
        </p>
        <p>早速methodsを使ってみましょう！</p>
      </div>
      <div class="example">
        <h3>example</h3>
        <TextComp :text='text' />
      </div>
      <div class="practice">
        <h3>practice</h3>
        TextCompに渡してみよう！
        <p>
        </p>
      </div>
      <div class="description">
        <p>
          TextCompを好きな値を渡して、表示が変わることを確認出来たらpropsの扱いは完璧です！
        </p>
      </div>
    </div>
    <nuxt-link to='/'>トップへ</nuxt-link>
    <nuxt-link to='/practice/methods'>前の練習へ</nuxt-link>
  </div>
</template>
<script>
import TextComp from '~/components/TextComp.vue'
export default {
  components: {
    TextComp
  },
  data() {
    return {
      text: '子コンポーネントに渡して表示してます。'
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