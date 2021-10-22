import {Message, UserMessage, NewUserJoinedMessage} from './messages.js'
import * as messageService from './../services/messages.js'

export class Chat {
    constructor() {
        this.messages = [];
    }

    async updateMessages() {
        this.messages = await messageService.getMessages();
        const messageList = document.getElementById("messages");
        removeChildren(messageList);
        this.messages.forEach(message => messageList.appendChild(message.renderHTML()));
        //this.updateMemberList();

    }

    /* updateMemberList() {
        const memberListElement = document.getElementById("members");
        removeChildren(memberListElement);
        this.members().map(member => {
                const listItem = document.createElement("li");
                listItem.textContent = member;
                return listItem;
            })
            .forEach(listItem => memberListElement.appendChild(listItem));
    }*/
 
    async sendMessage(message) {
        const body = JSON.stringify(message)
        await fetch("/api/messages", {method: "post", body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
        this.updateMessages();
    }

    sendUserMessage() {
        const username = document.getElementById("username").value;
        const message = document.getElementById("message").value;
        document.getElementById("message").value = "";
        if(this.isNewMember(username)){
            this.sendMessage(new NewUserJoinedMessage(username));
            this.sendMessage(new UserMessage(username, message));
        } else {
            this.sendMessage(new UserMessage(username, message));
        }
    }

    isNewMember(username) {
        return !messageService.extractMembers(this.messages).includes(username);
    }

    wordsPerMember() {
        return this.messages.filter(message => message instanceof UserMessage).reduce((previousValue, currentValue) => {
            if(previousValue[currentValue.sender]){
                previousValue[currentValue.sender] += currentValue.textBody.split(" ").length;
            } else {
                previousValue[currentValue.sender] = currentValue.textBody.split(" ").length;
            }
            return previousValue;
        }, {});
    }
}

function removeChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}