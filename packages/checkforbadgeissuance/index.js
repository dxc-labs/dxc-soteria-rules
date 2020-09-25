// This Lambda checks multiple conditions for issuance of badge. 
// 1. Minimum "n" days worth of data points available from individuals. 
// 2. Health risk status is at an acceptable level for "n" consecutive days.
// 3. Multiple entries in a day is allowed. 
// This lambda will be modfied once the logic for rule edits by facility admins is complete. 

exports.handler = async (event,context) => {
    // TODO implement
    //  var jsonData=event.data
    var Country = event.region.country;
    const oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
    console.log(Country)
    //var Country = event.r;
    var datapoints = event.region.consecutiveHealthReportDays;
    //
   // var oneDay = 24 * 60 * 60 * 1000
    //var statusCode = " ";
    var date = " ";
    var msg = " "
    var number = event.healthRiskIndex;
    //console.log(datapoints)
    //var number=.length;
    console.log(number)


    var healthRiskIndex = event.healthRiskIndex;
    var badgeStatus = event.badgeStatus;

    var result = "";
    var test1 = " ";

    var errmsg = " ";
    var rpeScore = " ";
    var result = " ";

    var newarr = event.healthRiskIndex.sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date)
    });
    var myarr=[];
if(newarr.length>datapoints)
{
var latestDate=Date.parse(newarr[0].date)
myarr.push(newarr[0])
for(var k=1;k<newarr.length;k++)

{
    
    var temp=Date.parse(newarr[k].date);
    var diff=((latestDate-temp)/oneDay);
    console.log(diff)
    if(diff<datapoints){
        myarr.push(newarr[k])
    }
   
}

}
else{
    for (var i of newarr) {
	myarr.push(i);
}
}
console.log("myarr check")
console.log("sort"+JSON.stringify(myarr))    
//const oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
const firstDate = new Date(myarr[myarr.length-1].date);
const secondDate = new Date(myarr[0].date);

const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

const diffDays1=diffDays+1;




   // checking daily reporting of health and wellness profile 
   // console.log(healthRiskIndex.length)
     if ((Country != null) && (badgeStatus != null) && (myarr.length != null)) 
    {
        
        if (diffDays1 >= datapoints) {
          for (var j = 0; j < myarr.length-1; j++) {
             
                console.log("check for day1")
                var day1 = myarr[j].date
                var day0 = myarr[j + 1].date
                if(day1==day0){
                    test1="true"
                }
                else{
                test1 = Date.parse(day1) - Date.parse(day0) === 86400000;
                }
                
              // for (i = 0; i < datapoints; i++) {
                console.log(event.healthRiskIndex.rsi)
                 console.log("day_0 " + day0)
                 console.log("day_1 " + day1)
                 console.log("test_1 " + test1);
                    if (!test1) {
                        //statusCode = 400
                       // result = "noAction"
                         msg= {
                        "body": "noAction",
                           "actionMessage": "You have missed daily reporting of health & wellness profile"
                    }
                        break;
                    }
                   // console.log("sequence_test " + test1);
                //}

            }
            if (!test1) {
                if (badgeStatus == "yes") {
                    //result = "revokeBadge"
                    //statusCode = 400
                     msg= {
                        "body": "revokeBadge",
                           "actionMessage": "You have missed daily reporting of health & wellness profile"
                    }
          
                } else {
                   // result = "noAction"
                    //statusCode = 400
                     msg= {
                        "body": "noAction",
                           "actionMessage": "Health information not available for all consecutive days"
                    }
                    


                }
            }

            if (test1) {
                console.log("enter true")
                var count = 0;
                for (var i = 0; i < myarr.length; i++) {
                    if( (myarr[i].rsi == "red") || (myarr[i].rsi =="amber") ){
                        rpeScore = "notgreen";
                        break;

                    }
                    

                    if (myarr[i].rsi == "green") {
                        count = count + 1;
                        if (count == datapoints) {

                            rpeScore = "allgreen";
                        }


                    }
                    
                                    
                }
                if (badgeStatus == "no" && rpeScore == "allgreen") {
                   // result = "issueBadge"
                    //statusCode = 200
                    
                      msg= {
                        "body": "issueBadge",
                           "actionMessage": "Badge can be issued"
                    }
                  
                } else if (badgeStatus == "yes" && rpeScore == "allgreen") {
                  
                      msg= {
                        "body": "noAction",
                           "actionMessage": "Badge already exists"
                    }
                    
                } else if (badgeStatus == "yes" && rpeScore == "notgreen") {
                    //result = "revokeBadge"
                   // statusCode = 200
                    msg= {
                        "body": "revokeBadge",
                           "actionMessage": "Health index is not green"
                    }
                  
                } else if (badgeStatus == "no" && rpeScore == "notgreen") {
                    //result = "noAction"
                   // statusCode = 200
				           msg= {
                        "body": "noAction",
                           "actionMessage": "Health index is not green"
                    }
                   

                }


            } 


        } 
        
        else if (diffDays1 < datapoints) {
            
           // statusCode = 400;

            //result = "noAction"
               msg= {
                        "body": "noAction",
                           "actionMessage": "Minimum number of days for the location not met"
                    }
        

        }

    }
                
        else{
//         {
      
//       // result = ""
//         msg = {
//             "Message":"Mandatory fields not met",
//             //"statusCode":400
//     }}
    

  
//     return msg;
// };

        var res1={
            status:"Failed",
            msg : "Mandatory fields not met",
        }
         context.fail(JSON.stringify(res1));
        //statusCode = 400;
       // result = ""
       
       // msg = "Mandatory fields not met";
    }

    // const response = {
    //     // //statusCode: statusCode,
    //                 "mandatedDays": datapoints,
    //                 "compliantDays": gcount,
    //                 "remainingDays": rmday
    //     //msg
            
    //   // Response: msg,


    // };
    return msg;
};
