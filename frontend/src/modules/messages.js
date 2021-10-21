export class Message {
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

export class UserMessage extends Message {
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

export class SystemMessage extends Message {
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

export class NewUserJoinedMessage extends SystemMessage {
    constructor(username){
        super(`${username} joined the chat`);
    }
}