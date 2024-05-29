import { LightningElement, track } from 'lwc';
import getFeesPayments from '@salesforce/apex/feeCheck.getFeesPayments';

export default class feeCheck extends LightningElement {
    @track sid='';
    @track paymentRes;
    @track studentId;
    @track studentName;
    @track studDept;
    @track disp=false;
    @track errorDisp=false;
    @track errorDetails=false;
    @track feesPaid;
    @track feesDue;
    @track totalFees;

    sidChange(event){
        this.sid = event.target.value;
    }


    getPayments(){
        //alert('Started'+this.sid)
        if(!(this.sid==='')){
            //alert(this.sid);
            getFeesPayments({studId : this.sid}).then((result)=>{
                if(result.length>0){
                    //alert('inside res');
                    this.disp=true;
                    this.errorDetails = false;
                    this.errorDisp=false;
                    this.paymentRes=result;
                    this.studentId=result[0].Student_ID__r.Name;
                    this.studentName=result[0].Student_ID__r.First_Name__c + ' ' + result[0].Student_ID__r.Last_Name__c;
                    this.studDept=result[0].Student_ID__r.Department__r.Name;
                    //console.log(result);  
                    this.totalFees = (result[0].Student_ID__r.Department__r.Fees_per_Semester__c)*8;
                    this.calcualateFeesPaid();
                    this.feesDue = this.totalFees - this.feesPaid;
                    //console.log(this.totalFees);
                    //console.log(this.feesPaid);
                    //console.log(this.feesDue);

                }else{
                    //alert('inside empyt field');
                    this.errorDetails = false;
                    this.disp=false;
                    this.errorDisp=true;
                } 
            }).catch((error)=>{
                //alert('inside error start');
                this.errorDetails = false;
                this.disp=false;
                this.errorDisp=true;
                //console.log(error);
                //alert('inside error end');
            });
        }else{
            this.disp=false;
            this.errorDisp=false;
            this.errorDetails = true;
        }
    }

    calcualateFeesPaid(){
        this.feesPaid = this.paymentRes.reduce((total,res)=> total+res.Semester_Fees__c,0);
    }

    


    clear(){
        this.sid='';
        this.disp=false;
        this.errorDisp=false;
        this.errorDetails=false;
    }
}