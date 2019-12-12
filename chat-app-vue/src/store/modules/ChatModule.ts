import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'chat' })
export default class ChatBoxModule extends VuexModule {
  private messages: any[] = [];

@Mutation
ADD_NEW_MESSAGE(message: any) {
    this.messages.push(message);
}

get GET_MESSAGES() {
    return this.messages;
}
}
