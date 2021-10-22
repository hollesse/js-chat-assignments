import * as messageService from "./../services/messages.js"

export class MemberList extends HTMLElement {

    constructor() {
        super();
        const heading = document.createElement("h2");
        heading.textContent = "Member List"
        this.appendChild(heading);
        this.list = document.createElement("ul");
        this.appendChild(this.list);
        setInterval(() => this.updateMembers(), 500);
      }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    async updateMembers() {
        const messages = await messageService.getMessages();
        const members = messageService.extractMembers(messages);
        this.clear();
        members.map(member => {
            const listItem = document.createElement("li");
            listItem.textContent = member;
            return listItem;
        }).forEach(listItem => this.list.appendChild(listItem));
    }

    clear() {
        while (this.list.lastChild) {
            this.list.removeChild(this.list.lastChild);
        }
    }
} 

customElements.define("member-list", MemberList);