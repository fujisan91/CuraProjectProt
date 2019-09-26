<template>
  <div>
    <Chat />
  </div>
</template>
<script>
import Chat from '~/components/Chat'
var ctlKey = false
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey) ctlKey = true
  if ((e.which || e.keyCode) == 82 && ctlKey) e.preventDefault()
  if ((e.which || e.keyCode) == 116) e.preventDefault()
})
document.addEventListener('keyup', function(e) {
  if (e.ctrlKey) ctlKey = false
})
export default {
  components: {
    Chat
  }
}
</script>