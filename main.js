(()=>{"use strict";const t=document.querySelector("#hw"),e=new class{constructor(){this.container=null,this.headers={create:"Добавить тикет",edit:"Изменить тикет",remove:"Удалить тикет"},this.ticketsAddListeners=[],this.formCancelListeners=[],this.formOkListeners=[],this.ticketsClickListeners=[]}bindToDOM(t){if(!(t instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=t}checkBinding(){if(null===this.container)throw new Error("ListEditPlay not bind to DOM")}drawUI(){this.checkBinding(),this.container.innerHTML='\n      <header class="header">\n        <p>Домашнее задание к занятию "7. Работа с HTTP"</p>\n        <p>HelpDesk</p>\n      </header>\n      <div class="helpdesk-container">\n        <div class="btn-add-ticket-container">\n          <button class="btn btn-add-ticket">Добавить тикет</button>\n        </div>\n        <ul class="tickets-list"></ul>\n      </div>\n    ',this.popupForm(),this.ticketAdd=this.container.querySelector(".btn-add-ticket"),this.ticketsList=this.container.querySelector(".tickets-list"),this.ticketAdd.addEventListener("click",(t=>this.onTicketsAdd(t))),this.ticketsList.addEventListener("click",(t=>this.onTicketsClick(t)))}popupForm(){this.modalContainerForm=document.createElement("div"),this.modalContainerForm.innerHTML='\n      <form class="ticket-form">\n        <div class="ticket-form-header"></div>\n        <div class="form-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</div>\n        <div class="ticket-form-label-container">\n          <div class="ticket-form-label" data-id="container-name">\n            <label class="ticket-form-label-text" for="ticket-name">Краткое описание</label>\n            <input class="ticket-form-label-field" type="text" name="ticket-name" id="ticket-name">\n          </div>\n          <div class="ticket-form-label" data-id="container-description"> \n            <label class="ticket-form-label-text" for="ticket-description">Подробное описание</label>\n            <textarea class="ticket-form-label-field" name="ticket-description" id="ticket-description"></textarea >\n          </div>\n          </div>\n        <div class="ticket-form-button-container"> \n          <button data-id="form-cancel" class="btn btn-form">Отмена</button>\n          <button data-id="form-ok" class="btn btn-form" type="button">Ok</button>\n        </div>\n      </form>\n    ',this.modalContainerForm.classList.add("ticket-form-container"),this.modalContainerForm.classList.add("disable"),this.formHeader=this.modalContainerForm.querySelector(".ticket-form-header"),this.formDescription=this.modalContainerForm.querySelector(".form-text"),this.formLabelContainer=this.modalContainerForm.querySelector(".ticket-form-label-container"),this.ticketName=this.modalContainerForm.querySelector("#ticket-name"),this.ticketDescription=this.modalContainerForm.querySelector("#ticket-description"),this.formCancel=this.modalContainerForm.querySelector("[data-id=form-cancel]"),this.formOk=this.modalContainerForm.querySelector("[data-id=form-ok]"),this.formCancel.addEventListener("click",(t=>this.onFormCancel(t))),this.formOk.addEventListener("click",(t=>this.onFormOk(t))),this.container.appendChild(this.modalContainerForm)}ticketFormChange(t,e,i,s="",n=!1,c="open"){t&&this.modalContainerForm.classList.remove("disable"),t||this.modalContainerForm.classList.add("disable"),this.formHeader.textContent=this.headers[s]||"","open"===c&&(this.formLabelContainer.classList.remove("disable"),this.formDescription.classList.add("disable"),this.ticketName.value=e,this.ticketDescription.value=i),"delete"===c&&(this.formLabelContainer.classList.add("disable"),this.formDescription.classList.remove("disable")),this.modalContainerForm.dataset.called=s,this.modalContainerForm.dataset.id=n}addFormCancelListeners(t){this.formCancelListeners.push(t)}onFormCancel(t){t.preventDefault(),this.formCancelListeners.forEach((t=>t.call(null,"")))}addFormOkListeners(t){this.formOkListeners.push(t)}onFormOk(t){t.preventDefault();const e=this.ticketName.value,i=this.ticketDescription.value,{called:s,id:n}=this.modalContainerForm.dataset,c={name:e,description:i,called:s,id:n};this.formOkListeners.forEach((t=>t.call(null,c)))}addTicketsAddListeners(t){this.ticketsAddListeners.push(t)}onTicketsAdd(t){t.preventDefault(),this.ticketsAddListeners.forEach((t=>t.call(null,"")))}addTicketsClickListeners(t){this.ticketsClickListeners.push(t)}onTicketsClick(t){t.preventDefault();const{target:e}=t,i=e.closest(".ticket");if(!i)return;const s=i.dataset.id,n=e.dataset.id;this.ticketsClickListeners.forEach((t=>t.call(null,{dataID:n,ticketID:s})))}static ticketHtml(t,e,i,s){let n="&#x2714;";i||(n="");const c=document.createElement("li");return c.classList.add("ticket"),c.dataset.id=t,c.innerHTML=`\n      <span class="ticket-completed" data-id="completed">${n}</span>\n      <span class="ticket-text">\n        <p class="ticket-text-name">${e}</p>\n      </span>\n      <span class="ticket-date">${s}</span>\n      <span class="ticket-edit" data-id="edit">&#x270E;</span>\n      <span class="ticket-remove" data-id="remove">&#x2716;</span>\n    `,c}ticketCreateAndAdd(t){const{id:e,name:i,status:s,created:n}=t,c=this.constructor.dateToConvert(n),a=this.constructor.ticketHtml(e,i,s,c);this.ticketsList.appendChild(a)}ticketRender(t){this.ticketsList.innerHTML="";for(let e=0;e<t.length;e+=1)this.ticketCreateAndAdd(t[e])}ticketGetValue(t){const e=this.ticketsList.querySelector(`[data-id="${t}"]`);return!!e&&e.querySelector(".ticket-text-name").textContent}ticketCompleted(t,e){const i=this.ticketsList.querySelector(`[data-id="${t}"]`);if(!i)return;const s=i.querySelector(".ticket-completed");e&&(s.innerHTML="&#x2714;"),e||(s.innerHTML="")}tickedRemove(t){const e=this.ticketsList.querySelector(`[data-id="${t}"]`);e&&this.ticketsList.removeChild(e)}tickedEdit(t){const e=this.ticketsList.querySelector(`[data-id="${t}"]`);if(!e)return;e.querySelector(".ticket-text-name").textContent=this.ticketName.value}checkAndRemoveDescription(t){const e=this.ticketsList.querySelector(`[data-id="${t}"]`);if(!e)return!1;const i=e.querySelector(".ticket-text-description");return!!i&&(i.remove(),!0)}createDescription(t,e){const i=this.ticketsList.querySelector(`[data-id="${t}"]`);if(!i)return!1;const s=i.querySelector(".ticket-text");if(!s)return!1;const n=document.createElement("p");return n.classList.add("ticket-text-description"),n.textContent=e,s.appendChild(n),!0}loading(t){t&&(this.loadingDiv=document.createElement("div"),this.loadingDiv.textContent="Loading...",this.loadingDiv.classList.add("loading"),this.ticketsList.appendChild(this.loadingDiv)),t||this.loadingDiv.remove()}static dateToConvert(t){const e=new Date(t);return`${e.toLocaleDateString()} ${e.toLocaleTimeString()}`}};e.bindToDOM(t);const i=new class{constructor(t){this.baseURL=t}static options(t,e,i){return{method:t,body:JSON.stringify(i),urlParam:e}}async createRequest(t){const{method:e,urlParam:i,body:s}=t,n=`${this.baseURL}/${i}`,c=await fetch(n,{method:e,headers:{"Content-Type":"application/json;charset=utf-8"},body:s}),a=await c.json();return a||!1}async createTicket(t){const e=this.constructor.options("POST","?method=createTicket",t),i=await this.createRequest(e),{created:s}=i;return s}async removeTicket(t){const e=this.constructor.options("DELETE",`?method=removeTicket&id=${t}`),i=await this.createRequest(e),{removed:s}=i;return s}async allTickets(){const t=this.constructor.options("GET","?method=allTickets"),e=await this.createRequest(t),{tickets:i}=e;return i}async descriptionTickets(t){const e=this.constructor.options("GET",`?method=ticketById&id=${t}`),i=await this.createRequest(e),{description:s}=i;return s}async сompletedTicket(t){const e=this.constructor.options("PUT",`?method=ticketCompleted&id=${t}`),i=await this.createRequest(e),{status:s}=i;return s}async editTicket(t,e){const i=this.constructor.options("PUT",`?method=ticketEdit&id=${t}`,e),s=await this.createRequest(i),{edited:n}=s;return n}}("https://ahj-hw7-1.onrender.com/"),s=new class{constructor(t,e){this.helpDeskDOM=t,this.helpDeskAPI=e}async init(){this.helpDeskDOM.drawUI(),await this.loadAndRenderTickets(),this.helpDeskDOM.addTicketsAddListeners(this.onTicketsAdd.bind(this)),this.helpDeskDOM.addFormCancelListeners(this.onFormCancel.bind(this)),this.helpDeskDOM.addFormOkListeners(this.onFormOk.bind(this)),this.helpDeskDOM.addTicketsClickListeners(this.onTicketsClick.bind(this))}async loadAndRenderTickets(){this.helpDeskDOM.loading(!0);const t=await this.helpDeskAPI.allTickets();t&&(this.helpDeskDOM.loading(!1),this.helpDeskDOM.ticketRender(t))}onTicketsAdd(){this.helpDeskDOM.ticketFormChange(!0,"","","create",!1)}onFormCancel(){this.helpDeskDOM.ticketFormChange(!1,"","","close",!1)}async onFormOk(t){const{name:e,description:i,called:s,id:n}=t;if("edit"===s){await this.helpDeskAPI.editTicket(n,{name:e,description:i})&&this.helpDeskDOM.tickedEdit(n)}if("create"===s){const t=await this.helpDeskAPI.createTicket({name:e,description:i,status:!1});t&&this.helpDeskDOM.ticketCreateAndAdd(t)}if("delete"===s){await this.helpDeskAPI.removeTicket(n)&&this.helpDeskDOM.tickedRemove(n)}this.helpDeskDOM.ticketFormChange(!1,"","","close",!1)}async onTicketsClick({dataID:t,ticketID:e}){if("completed"!==t&&"edit"!==t&&"remove"!==t){if(!this.helpDeskDOM.checkAndRemoveDescription(e)){const t=await this.helpDeskAPI.descriptionTickets(e);t&&this.helpDeskDOM.createDescription(e,t)}}if("completed"===t){const t=await this.helpDeskAPI.сompletedTicket(e);this.helpDeskDOM.ticketCompleted(e,t)}if("edit"===t){const t=this.helpDeskDOM.ticketGetValue(e);if(!t)return;const i=await this.helpDeskAPI.descriptionTickets(e);this.helpDeskDOM.ticketFormChange(!0,t,i,"edit",e)}"remove"===t&&this.helpDeskDOM.ticketFormChange(!0,"","","delete",e,"delete")}}(e,i);s.init(),console.log("app started")})();