public with sharing class feeCheck {
    
    @AuraEnabled(cacheable=true)
    public static List<Fees_Payment__c> getFeesPayments(String studId){
        Student__c slist = [SELECT Id,Name FROM Student__c WHERE Name=:studId LIMIT 1];
        Id sid = slist.Id;
        List<Fees_Payment__c> feesList = [SELECT Id, Name, CreatedDate, Semester__c, Semester_Fees__c,Student_ID__r.Name,Student_ID__r.First_Name__c, Student_ID__r.Last_Name__c,Student_ID__r.Department__r.Name,Student_ID__r.Department__r.Fees_per_Semester__c 
                                          FROM Fees_Payment__c WHERE Student_ID__c=:sid];
 
        return feesList;
    }
    
}