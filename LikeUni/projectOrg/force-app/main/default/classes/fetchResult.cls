public with sharing class fetchResult{
    public fetchResult() {
 
    }
 
    @AuraEnabled(cacheable=true)
    public static List<Result__c> getStudent(String studentID,String dob,String semester){
        List<String>  dateSplit = dob.split('/');
        String modifiedDate = dateSplit.get(2)+'-'+dateSplit.get(1)+'-'+dateSplit.get(0);
        Date bdate = Date.valueOf(modifiedDate);
       
        List<Student__c> s = [SELECT Id,First_Name__c FROM Student__c WHERE Name=:studentID AND date_of_birth__c=:bdate LIMIT 1];
 
        List<Result__c> res=[SELECT Subject_Name__c,Department__c,Grade_Points__c,Grade__c, Student_ID__r.Name,Student_ID__r.First_Name__c, Student_ID__r.Last_Name__c FROM Result__c where Student_ID__c=:s.get(0).Id AND Semester__c=:semester];
       
        return res;
    }
   
}