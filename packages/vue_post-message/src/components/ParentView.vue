<script setup lang="ts">
import { ref } from 'vue'

const sendMessage = () => {
  iframeRef.value.contentWindow.postMessage(
    'Hello from parent page!',
    'http://localhost:5174'
  )
}
const iframeRef = ref()

window.addEventListener('message', (event) => {
  if (event.origin === 'http://localhost:5174') {
    alert('Received message from child:' + event.data)
  }
})
</script>

<template>
  <div>
    <h1>Parent Page</h1>

    <iframe
      ref="iframeRef"
      src="http://localhost:5174/"
      style="width: 300px; height: 200px; display: block"
    />

    <button @click="sendMessage">Send Message To Child</button>
  </div>
</template>

<style scoped lang="scss"></style>
