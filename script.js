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

    sendMessage(message) {
        this.messages.push(message);
        document.getElementById("messages").appendChild(message.renderHTML());
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
    document.getElementById("messageForm").addEventListener("submit", (event) => {
        event.preventDefault();
        username = document.getElementById("username").value;
        message = document.getElementById("message").value;
        document.getElementById("message").value = "";
        if(chat.isNewMember(username)){
            chat.sendMessage(new NewUserJoinedMessage(username));
            chat.sendMessage(new UserMessage(username, message));
            updateMemberList(chat.members());
        } else {
            chat.sendMessage(new UserMessage(username, message));
        }
        
        console.log(chat.wordsPerMember());
    })
})

function updateMemberList(newMemberList) {
    memberListElement = document.getElementById("members");
    removeChildren(memberListElement);
    newMemberList.map(member => {
            const listItem = document.createElement("li");
            listItem.textContent = member;
            return listItem;
        })
        .forEach(listItem => memberListElement.appendChild(listItem));
}

function removeChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}