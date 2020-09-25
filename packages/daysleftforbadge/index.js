// This Lambda is designed to indicate to the user the number of days one needs to get the badge. 
// The days counter is reset when the first "non-green" risk is reported. 


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
    var statusCode = " ";
    var date = " ";
    var msg = " "
    var number = event.healthRiskIndex;
    //console.log(datapoints)
    //var number=.length;
    console.log(number)


    // var datapoints = event.region.consecutiveHealthReportDays;
    //var datapoints=Country
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





   // console.log(healthRiskIndex.length)
     if ((Country != null) && (badgeStatus != null) && (myarr.length != null)) 
    {
        
       
        if (diffDays1 <= datapoints) {
      
                var res=[];
                var flag="false"
            var gcount=0;
             myarr.forEach( function( item ) {
     // res.indexOf(item) === -1 ? res.push(item) :""
      if(res.length==0){
          res.push(item)
      }
      else{
      for(var k=0;k<res.length;k++){
          
         if((res[k].date==item.date)||(res[res.length-1].date==item.date)) { 
             if((res[k].rsi==item.rsi)||(res[res.length-1].rsi==item.rsi)){
                    // flag="true"
                     continue;
                     
             }
             else{
                 //flag="false"
                  res.push(item) 
            continue;
             }
         
         }
         else {
            res.push(item) 
            break;
         }
      }
     console.log(JSON.stringify(res))
      }
     
   });
        console.log("response"+ JSON.stringify(res))
        
             for (var i =(res.length)-1; i >=0; i--) {
                 console.log(flag)
                 
                if( i>=1) 
                {
                    
                
                 if((res[i].date==res[i-1].date) && (res[i].rsi==res[i-1].rsi)){
                    //flag="true"
                    i=i-1;
                     console.log("duplicates" + res[i].rsi )
                     continue;
                 }
                 if((res[i].date==res[i-1].date) && (res[i].rsi!=res[i-1].rsi)){
                    //flag="true"
                    gcount=0
                    i=i-1;
                     console.log("duplicates2" + res[i].rsi )
                     continue;
                 }
                }
             
                    if( (res[i].rsi == "red") || (res[i].rsi =="amber") ){
                        
                    gcount=0;
                   
                    //break;

                    }
                    
                    else if(res[i].rsi=="green") {
                        gcount=gcount+1;
                        
                    }
                    console.log(gcount)
             }
             
          
             
             var rmday=datapoints-gcount;
            statusCode = 400;

            result = "noAction"
            msg =  {
                    "mandatedDays": datapoints,
                    "compliantDays": gcount,
                    "remainingDays": rmday
            };

        
            
        }
        
    } 
    else {
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
