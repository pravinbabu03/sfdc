import { LightningElement, track, wire } from 'lwc';
import fetchRes from '@salesforce/apex/fetchResult.getStudent';

//import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ResultCheck extends LightningElement {
    @track sid='';
    @track dob='';
    @track semVal='';
    @track sumOfCg=0;
    @track marksDetails;
    @track getGrade;
    @track filtArray;
    @track disp = false;
    @track errorDisp = false;
    @track errorDetails = false;
    @track studentName;
    @track studentId;
    @track studDept;
    @track passGrade = 'greenSpan';

    get sems(){
        return([
            { label: 'SEMESTER-1', value: 'SEM-1' },
            { label: 'SEMESTER-2', value: 'SEM-2' },
            { label: 'SEMESTER-3', value: 'SEM-3' },
            { label: 'SEMESTER-4', value: 'SEM-4' },
            { label: 'SEMESTER-5', value: 'SEM-5' },
            { label: 'SEMESTER-6', value: 'SEM-6' },
            { label: 'SEMESTER-7', value: 'SEM-7' },
            { label: 'SEMESTER-8', value: 'SEM-8' },
        ]);
    }

    sidChange(event){
        this.sid = event.target.value;
    }

    dobChange(event){
        this.dob = event.target.value;
    }

    semChange(event){
        this.semVal = event.target.value;
    }

    

    getResults(){
        //alert('Start');
        if(!(this.sid===''||this.dob===''||this.semVal==='')){
            //alert(this.sid+' | '+this.dob+' | '+this.semVal);
            fetchRes({studentID : this.sid, dob: this.dob,semester : this.semVal}).then((result)=>{
                if(result.length>0){
                    this.errorDetails = false;
                    this.errorDisp=false;
                    this.disp=true;
                    //console.log(result);
                    this.marksDetails=result;
                    this.calculateTotalCGPA();
                    this.sumOfCg=(this.sumOfCg/this.marksDetails.length).toFixed(2);
                    this.gettingGrade();
                    this.studentName= result[0].Student_ID__r.First_Name__c + ' ' + result[0].Student_ID__r.Last_Name__c;
                    this.studentId = result[0].Student_ID__r.Name;
                    this.studDept = result[0].Department__c;
                    //alert(this.disp);
                }else{
                    this.errorDetails = false;
                    this.disp=false;
                    this.errorDisp=true;
                }          
            }).catch((error)=>{
                this.errorDetails = false;
                this.disp=false;
                this.errorDisp=true;
                console.log(error);
            });
        }else{
            this.disp=false;
            this.errorDisp=false;
            this.errorDetails = true;
        }
        //alert('End');
    }
    
    calculateTotalCGPA() {
        this.filtArray = this.marksDetails.filter(r=>r.Grade_Points__c>4);
        //console.log(this.filtArray);
        if(this.filtArray.length==this.marksDetails.length){
            this.sumOfCg = this.marksDetails.reduce((total, result) => total + result.Grade_Points__c, 0);
        }else{
            this.sumOfCg=0;
            this.passGrade = 'redSpan';
        }
    }

    gettingGrade(){
        if(this.sumOfCg==10){
            this.getGrade='O';
        }else if(this.sumOfCg>=9 && this.sumOfCg<10){
            this.getGrade='A+';
        }else if(this.sumOfCg>=8 && this.sumOfCg<9){
            this.getGrade='A';
        }else if(this.sumOfCg>=7 && this.sumOfCg<8){
            this.getGrade='B+';
        }else if(this.sumOfCg>=6 && this.sumOfCg<7){
            this.getGrade='B';
        }else if(this.sumOfCg>=5 && this.sumOfCg<6){
            this.getGrade='C';
        }else if(this.sumOfCg>=4 && this.sumOfCg<5){
            this.getGrade='P';
        }else if(this.sumOfCg<4){
            this.getGrade='F';
        }


        /*
        IF( Semester_2_CGPA__c = 10 , 'O',
IF(Semester_2_CGPA__c>=9 && Semester_2_CGPA__c<10, 'A+' ,
IF(Semester_2_CGPA__c>=8 && Semester_2_CGPA__c<9, 'A' ,
IF(Semester_2_CGPA__c>=7 && Semester_2_CGPA__c<8, 'B+' ,
IF(Semester_2_CGPA__c>=6 && Semester_2_CGPA__c<7, 'C' ,
IF(Semester_2_CGPA__c>=5 && Semester_2_CGPA__c<6, 'c' ,
IF(Semester_2_CGPA__c>=4 && Semester_2_CGPA__c<5, 'P' , 'F')))))))
        */
    }

    clear(){
        this.sid='';
        this.dob='';
        this.semVal='';
        this.disp=false;
        this.errorDisp=false;
        this.errorDetails=false;
    }

}