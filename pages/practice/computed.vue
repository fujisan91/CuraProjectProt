<template>
  <div>
    <h1>Nuxt.jsのcomputedの練習</h1>
    <div class="contents">
      <div class="description">
        <p>
          scriptで定義したcomputedは算出処理後にdataにマージされます。<br>
          そして算出対象に変更があるたびにcomputedは動きます。<br>
        </p>
        <p>例を見て実際の動きを確認してみましょう</p>
      </div>
      <div class="example">
        <h3>example</h3>
        <p>普通のdata: {{ beforeData }}</p>
        <p>computed data: {{ afterData }}</p>
      </div>
      <div class="practice">
        <h3>practice</h3>
        <p>
          <!-- ここにdataに定義した値とcomputedの値を表示してみよう -->
        </p>
      </div>
      <div class="description">
        <p>
        computedを使って処理をした後に表示をすることができれば完璧！<br>
        実践ではmessagesの情報を取ってくる部分を算出処理として記述しているよ！
        </p>
      </div>
    </div>
    <nuxt-link to='/practice/data'>前の練習へ</nuxt-link>
    <nuxt-link to='/practice/v-model'>次の練習へ</nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      beforeData: 'おはよう'
    }
  },
  computed: {
    // 文字列を逆さにする
    afterData() {
      return this.beforeData.split('').reverse().join('')
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