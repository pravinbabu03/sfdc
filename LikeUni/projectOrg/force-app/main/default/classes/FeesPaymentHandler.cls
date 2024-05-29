public class FeesPaymentHandler {
    public static void createResults(List<Fees_Payment__c> fees){
        List<Result__c> results = new List<Result__c>();
        for(Fees_Payment__c fee : fees ){
        List<Student__c> student = [SELECT Id, Name, Department__r.Name FROM Student__c WHERE Name =:fee.Student_ID__r.Name ];
        List<Subject__c> subjects = [SELECT Id, Name,Subject_Name__c,Department__r.Name,Semester__c FROM Subject__c 
                                     ];
    }
  }
}