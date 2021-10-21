class Message {
    constructor(textBody) {
        this.textBody = textBody;
    }

    render() {
        return `${this.textBody}`; 
    }

    renderHTML(){
        const liElement = document.createElement("li");
        liElement.textContent = this.render();
        
        return liElement;
    }

    static fromJSON(jsonMessage){
        if(jsonMessage.sender){
            return new UserMessage(jsonMessage.sender, jsonMessage.textBody);
        } else {
            return new SystemMessage(jsonMessage.textBody);
        }
    }
}

class UserMessage extends Message {
    constructor(sender, textBody) {
        super(textBody);
        this.sender = sender;
    }

    render() {
        return `${this.sender}: ${this.textBody}`;
    }

    renderHTML(){
        const liElement = document.createElement("li");
        const bElement = document.createElement("b");
        bElement.textContent = this.sender;
        liElement.appendChild(bElement);
        const textNode = document.createTextNode(`: ${this.textBody}`);
        liElement.appendChild(textNode);

        return liElement;
    }
}

class SystemMessage extends Message {
    constructor(textBody) {
        super(textBody);
    }

    render() {
        return `...${this.textBody}...`;
    }

    renderHTML(){
        const liElement = document.createElement("li");
        const emElement = document.createElement("em");
        emElement.textContent = this.render();
        liElement.appendChild(emElement);
        return liElement;
    }
}

class NewUserJoinedMessage extends SystemMessage {
    constructor(username){
        super(`${username} joined the chat`);
    }
}

class Chat {
    constructor() {
        this.messages = [];
    }

    async updateMessages() {
        const response = await fetch("/api/messages", {method: "get"})
        const responseJson = await response.json();
        this.messages = responseJson.map(json => Message.fromJSON(json));
        const messageList = document.getElementById("messages");
        removeChildren(messageList);
        this.messages.forEach(message => messageList.appendChild(message.renderHTML()));
        this.updateMemberList();

    }

    updateMemberList() {
        const memberListElement = document.getElementById("members");
        removeChildren(memberListElement);
        this.members().map(member => {
                const listItem = document.createElement("li");
                listItem.textContent = member;
                return listItem;
            })
            .forEach(listItem => memberListElement.appendChild(listItem));
    }

    async sendMessage(message) {
        const body = JSON.stringify(message)
        await fetch("/api/messages", {method: "post", body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
        this.updateMessages();
    }

    sendUserMessage() {
        username = document.getElementById("username").value;
        message = document.getElementById("message").value;
        document.getElementById("message").value = "";
        if(this.isNewMember(username)){
            this.sendMessage(new NewUserJoinedMessage(username));
            this.sendMessage(new UserMessage(username, message));
        } else {
            this.sendMessage(new UserMessage(username, message));
        }
    }

    members() {
        return this.messages.filter(message => message instanceof UserMessage).map(message => message.sender).reduce((previousValue, currentValue) => {
            if(!previousValue.includes(currentValue)){
                previousValue.push(currentValue);
            }
            return previousValue;
        },[]);
    }

    isNewMember(username) {
        return !this.members().includes(username);
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

window.addEventListener("load", () => {
    const chat = new Chat();
    chat.updateMessages()
    setInterval(() => chat.updateMessages(), 500);
    document.getElementById("messageForm").addEventListener("submit", (event) => {
        event.preventDefault();
        chat.sendUserMessage();
    })
})

function removeChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}