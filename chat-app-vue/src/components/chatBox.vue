<template>
  <div class="chatBox" id="chatBox">
      <div class="messages">
        <div v-for="(msg, index) in messages" v-bind:key="index">
            <div v-if="isUserMessage(msg.name)">
              <img class="avatar" :src="require(`@/assets/${msg.avatar}`)" alt="">
            </div>
            <div class="message">
              <p class="user"> {{ msg.name }} </p>
              <p class="messageText"> {{ msg.text }} </p>
              <p class="msgTime"> {{ msg.time }} </p>
            </div>
              <div v-if="!isUserMessage(msg.name)">
                <img class="avatar" :src="require(`@/assets/${msg.avatar}`)" alt="">
              </div>
        </div>
      </div>
        <div class="formContainer">
            <textarea class="inputMessage" placeholder="type your text!" v-model="message"/>
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
    private messages: any[] = [];
    private message: string  = '';
    
    @Watch('GET_MESSAGES')
    OnRealtimeMessages(messages: any[]) {
      this.messages = messages;
    }

    mounted() {
        this.messages = chat.GET_MESSAGES;
    }

    private submit() {
        if (this.message) {
            const currentMsg = { name: this.user.userName, avatar: this.user.avatar, text: this.message, time: moment().format('MMM Do YY HH:mm:ss')};
            chat.ADD_NEW_MESSAGE(currentMsg);
            this.message = '';
        }
    }
    private isUserMessage(user: string) : boolean {
        return this.user.userName === user;
    }
}

</script>
<style>
.chatBox {
  height: 100%;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  margin-right: 10px;
  
}

.formContainer {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  
}
.messages {
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: 80%;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
}

.message {
  margin-top: 10px;
  border-radius: 10px;
  background-color: #82ccdd;
}
.avatar {
  position: relative;
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
.user {
  color: rgba(2, 2, 2, 0.5);
}
.msgTime{
  color: rgba(19, 17, 17, 0.5);
}
.messageText {
    text-align: left;
}
.inputMessage {
    width: 95%;
    margin-right: 10px;
    margin-left: 5px;
}
button {
    border-radius: 15px;
    
}
</style>