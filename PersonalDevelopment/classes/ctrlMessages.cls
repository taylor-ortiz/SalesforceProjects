public class ctrlMessages {

    @AuraEnabled (cacheable=true)
    public static List<Custom_Message__c> getAllMessages(){
        return [SELECT Message__c FROM Custom_Message__c];
    }
}