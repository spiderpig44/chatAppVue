<template>
  <div class="chatBox">
    <div class="HeaderChat"> Chat with {{this.user.userName}} </div>
    <div class="messages">
      <div v-for="(msg, index) in GET_MESSAGES" v-bind:key="index" 
            class="message-container" 
            :class="{'self': isUserMessage(msg.name)}">
        <div class="avatar">
          <img :src="require(`@/assets/${msg.avatar}`)" v-if="!isUserMessage(msg.name)" alt="">
          <img :src="require(`@/assets/${msg.avatar}`)" v-if="isUserMessage(msg.name)" alt="">
        </div>
        <div class="message">
          <div class="messageText"> {{ msg.text }} </div>
          <div class="msgTime"> {{ msg.time }} </div>
        </div>
      </div>
    </div>
    <div class="formContainer">
      <textarea class="inputMessage" placeholder="type your text!" v-model="message" v-on:keyup.enter="submit()"/>
      <button @click="submit()">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store/store';
import ChatModule from '@/store/modules/ChatModule';
import {  Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import moment from 'moment';

const chat = getModule(ChatModule, store);

@Component({
  computed: {
    ...mapGetters('chat', ['GET_MESSAGES']),
  },
})

export default class ChatBox extends Vue {
  @Prop() user!: any;
  private message: string  = '';
  private submit() {
    if (!this.message) return;

    const currentMsg = {
      name: this.user.userName,
      avatar: this.user.avatar,
      text: this.message,
      time: moment().format('MMM Do YY HH:mm:ss'),
    };
    chat.ADD_NEW_MESSAGE(currentMsg);
    this.message = '';
  }

  private isUserMessage(user: string): boolean {
    return this.user.userName === user;
  }
}
</script>

<style>
.chatBox {
  display: flex;
  flex-direction: column;
  height: 95%;
  width: 90%;
  padding: 2px;
  border-style: solid;
  border-width: 2px;
  padding: 20px;
  background-color: rgb(243, 216, 65);
}
.HeaderChat {
  font-style: italic;
  font-weight: bold;
}
.formContainer {
  display: flex;
  flex-direction: row;
  padding: 5px;
}
.messages {
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: auto;
  height: 80%;
  width: 100%;
  margin-bottom: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background-image: url('../assets/background-sky.jpg');
  padding: 3px;
}
.message-container {
  width: 100%;
  display: flex;
  min-height: 50px;
  flex-direction: row;
  margin-top: 10px;
}
.message {
  border-radius: 3px;
  background-color: rgb(209, 30, 99);;
  color:white;
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  opacity: 0.8;
}
.msgTime{
  color: rgba(19, 17, 17, 0.5);
  font-size: 10px;
  color:white;
}
.messageText {
  flex-grow: 1;
}
.inputMessage {
  flex-grow: 1;
  margin-right: 5px;
  resize: none;
  height: 50px;
  border-width: 5px;
  border-color: #92D4F7;
  border-style: solid;
  background-color: rgb(243, 216, 65);
}

button {
  border: none;
  border-style: solid;
  border-color: #92D4F7;
  
  background-color:  rgb(243, 216, 65);
  background-image: url('../assets/donut.png');
  background-size: 100% 100%;
  font-weight: bold;
}
button:hover {
    border-style: solid;
    border-color: white;
}
button:active {
    background-image: url('../assets/eaten-donut.png');
}
.self {
  flex-direction: row-reverse;
}
.self .message {
    background-color: rgb(61, 79, 240);
}
.avatar {
  position: relative;
  border-radius: 50px;
}
.avatar img {
  height: 60px;
  width: 60px;
  border-radius: 50px;
}
</style>