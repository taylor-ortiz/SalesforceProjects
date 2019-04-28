import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CUSTOM_MESSAGE_OBJECT from '@salesforce/schema/Custom_Message__c';
import MESSAGE_FIELD from '@salesforce/schema/Custom_Message__c.Message__c';
import getMessages from '@salesforce/apex/ctrlMessages.getAllMessages';
import { refreshApex } from '@salesforce/apex';

export default class MessagesProject extends LightningElement {

    @track messages = [];
    @track message;
    messageResults;

    onMessageChange(event) {
        this.message = event.target.value;
    }

    createMessage() {
        const recordInput = {
            apiName: CUSTOM_MESSAGE_OBJECT.objectApiName,
            fields: { 
                [MESSAGE_FIELD.fieldApiName]: this.message, 
            }
        };

        createRecord(recordInput)
            .then(() => {
                this.message = '';
                return refreshApex(this.messageResults);
            })
            .catch((error) => {
                console.log('There was an eror ', error);
            });
    }

    @wire(getMessages, {})
    getAllMessages(result) {
        this.messageResults = result;
        if (result.data) {
            this.messages = result.data;
        }
    }

    get checkForMessages() {
        return this.messages.length > 0 ? true : false;
    }
}