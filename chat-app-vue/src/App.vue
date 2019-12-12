<template>
  <div id="app">
    <div id="chatBoxContainer">
        <ChatBox :user='user1'/>
        <ChatBox :user='user2'/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatBox from './components/chatBox.vue';

@Component({
  components: {
    ChatBox,
  },
})
export default class App extends Vue {
  private user1: any = { userName: 'Homer', avatar: 'homer.png' };
  private user2: any = { userName: 'Marge', avatar: 'marge.jpeg' };
}
</script>

<style>

html, body, #app {
  margin: 0;
  width: 100%;
  height: 100%;
}

#chatBoxContainer {
  font-family: cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: row;
  height: 100%;
  width: 100%;
}

</style>
