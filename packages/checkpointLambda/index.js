// This Lambda checks for the mandated max temperature and min SPO2 levels as defined for a region or site. 
// For now, the levels are coded here. Will eventually come from a UI / DynamoDB that facility admins can edit. 

exports.handler = async (event) => {
    var country = event.country;

    // var location = event.location;
    var bodyTemp = event.bodyTemp;
    var spo = event.spo;
    var request = event.request;
    var response = "";
    var msg = "";
    var Location = event.location;
    var countryCode = [{
            "country": "SG",
            "SGAllowedMaxBodyTempinC": 37.5,
            "SGAllowedMinSPO2": 90,
            "SGconsecutiveHealthReportDays": 5
        },

        {
            "country": "US",
            "USAllowedMaxBodyTempinC": 38,
            "USAllowedMinSPO2": "",
            "USconsecutiveHealthReportDays": 7
        },

        {
            "country": "CN",
            "CNAllowedMaxBodyTempinC": 37.3,
            "CNAllowedMinSPO2": 90,
            "CNconsecutiveHealthReportDays": 14
        },

        {
            "country": "AU",
            "AUAllowedMaxBodyTempinC": 37.5,
            "AUAllowedMinSPO2": 90,
            "AUconsecutiveHealthReportDays": 3
        },
        {
            "country": "IN",
            "INAllowedMaxBodyTempinC": 37.5,
            "INAllowedMinSPO2": 94,
            "INconsecutiveHealthReportDays": 5
        },
        {
            "country": "",
            "AllowedMaxBodyTempinC": 37.3,
            "AllowedMinSPO2": "",
            "consecutiveHealthReportDays": 1
        }

    ]


function AllGood(bodyTemp, spo) {
  response={
    "applicant": {
        "location": event.location,
        "country": event.country,
        "message": "All good. Entry allowed",
        "approved": true,
        "bodyTemp": event.bodyTemp,
        "request": "CheckpointAccess",
        "spo": event.spo
    }
}
return response;
  
}


 function elevatedTemp(bodyTemp, spo) {
     response={
    "applicant": {
        "location": event.location,
        "country": event.country,
        "message": "Elevated body temperature",
        "approved": false,
        "bodyTemp": event.bodyTemp,
        "request": "CheckpointAccess",
        "spo": event.spo
    }
}
return response;
}

 function elevatedTempAndSpo(bodyTemp, spo) {

    response={
    "applicant": {
        "location": event.location,
        "country": event.country,
        "message": "Low spo and Elevated body temperature",
        "approved": false,
        "bodyTemp": event.bodyTemp,
        "request": "CheckpointAccess",
        "spo": event.spo
    }
}
return response;
}


function lowSpo(temp, spo) {

 response={
        
     "applicant": {
        "location": event.location,
        "country": event.country,
        "message": "Low spo",
        "approved": false,
        "bodyTemp": event.bodyTemp,
        "request": "CheckpointAccess",
        "spo": event.spo
    }
}
return response;
}


switch (country) {
    case 'Singapore':
        case 'SG':
        if((bodyTemp<=countryCode[0].SGAllowedMaxBodyTempinC) && (spo>=countryCode[0].SGAllowedMinSPO2))
        {
             var response=AllGood(bodyTemp,spo);
            return response;
        }
      
        if((bodyTemp<=countryCode[0].SGAllowedMaxBodyTempinC) && (spo < countryCode[0].SGAllowedMinSPO2))
        {
             var response=lowSpo(bodyTemp,spo);
            return response;
        }
        if((bodyTemp >= countryCode[0].SGAllowedMaxBodyTempinC) && (spo>=countryCode[0].SGAllowedMinSPO2))
        {
             var response=elevatedTemp(bodyTemp,spo);
            return response;
        }
        if((bodyTemp>=countryCode[0].SGAllowedMaxBodyTempinC) && (spo < countryCode[0].SGAllowedMinSPO2))
        {
             var response=elevatedTempAndSpo(bodyTemp,spo);
            return response;
        }
      
        break;
        
     case 'United States':
        case 'US':
        if((bodyTemp<=countryCode[1].USAllowedMaxBodyTempinC) && (spo>=countryCode[1].USAllowedMinSPO2))
        {
             var response=AllGood(bodyTemp,spo);
            return response;
        }
      
        if((bodyTemp<=countryCode[1].USAllowedMaxBodyTempinC) && (spo < countryCode[1].USAllowedMinSPO2))
        {
             var response=lowSpo(bodyTemp,spo);
            return response;
        }
        if((bodyTemp >= countryCode[1].USAllowedMaxBodyTempinC) && (spo>=countryCode[1].USAllowedMinSPO2))
        {
             var response=elevatedTemp(bodyTemp,spo);
            return response;
        }
        if((bodyTemp>=countryCode[1].USAllowedMaxBodyTempinC) && (spo < countryCode[1].USAllowedMinSPO2))
        {
             var response=elevatedTempAndSpo(bodyTemp,spo);
            return response;
        }
      
        break;    
        
        
        case 'China':
        case 'CN':
        if((bodyTemp<=countryCode[2].CNAllowedMaxBodyTempinC) && (spo>=countryCode[2].CNAllowedMinSPO2))
        {
             var response=AllGood(bodyTemp,spo);
            return response;
        }
      
        if((bodyTemp<=countryCode[2].CNAllowedMaxBodyTempinC) && (spo < countryCode[2].CNAllowedMinSPO2))
        {
             var response=lowSpo(bodyTemp,spo);
            return response;
        }
        if((bodyTemp >= countryCode[2].CNAllowedMaxBodyTempinC) && (spo>=countryCode[2].CNAllowedMinSPO2))
        {
             var response=elevatedTemp(bodyTemp,spo);
            return response;
        }
        if((bodyTemp>=countryCode[2].CNAllowedMaxBodyTempinC) && (spo < countryCode[2].CNAllowedMinSPO2))
        {
             var response=elevatedTempAndSpo(bodyTemp,spo);
            return response;
        }
      
        break;     
        
        
        
        
          case 'Australia':
        case 'AU':
        if((bodyTemp<=countryCode[3].AUAllowedMaxBodyTempinC) && (spo>=countryCode[3].AUAllowedMinSPO2))
        {
             var response=AllGood(bodyTemp,spo);
            return response;
        }
      
        if((bodyTemp<=countryCode[3].AUAllowedMaxBodyTempinC) && (spo < countryCode[3].AUAllowedMinSPO2))
        {
             var response=lowSpo(bodyTemp,spo);
            return response;
        }
        if((bodyTemp >= countryCode[3].AUAllowedMaxBodyTempinC) && (spo>=countryCode[3].AUAllowedMinSPO2))
        {
             var response=elevatedTemp(bodyTemp,spo);
            return response;
        }
        if((bodyTemp>=countryCode[3].AUAllowedMaxBodyTempinC) && (spo < countryCode[3].AUAllowedMinSPO2))
        {
             var response=elevatedTempAndSpo(bodyTemp,spo);
            return response;
        }
      
        break;     
        
        
        
        
     case 'India':
        case 'IN':
        if((bodyTemp<=countryCode[4].INAllowedMaxBodyTempinC) && (spo>=countryCode[4].INAllowedMinSPO2))
        {
             var response=AllGood(bodyTemp,spo);
            return response;
        }
      
        if((bodyTemp<=countryCode[4].INAllowedMaxBodyTempinC) && (spo < countryCode[4].INAllowedMinSPO2))
        {
             var response=lowSpo(bodyTemp,spo);
            return response;
        }
        if((bodyTemp >= countryCode[4].INAllowedMaxBodyTempinC) && (spo>=countryCode[4].INAllowedMinSPO2))
        {
             var response=elevatedTemp(bodyTemp,spo);
            return response;
        }
        if((bodyTemp>=countryCode[4].INAllowedMaxBodyTempinC) && (spo < countryCode[4].INAllowedMinSPO2))
        {
             var response=elevatedTempAndSpo(bodyTemp,spo);
            return response;
        }
      
        break;        
    
    default:
    
    if(bodyTemp <= countryCode[5].AllowedMaxBodyTempinC) 
        {
             var response=AllGood(bodyTemp,spo);
            return response;
        }
      
       // if(bodyTemp >= countryCode[5].AllowedMaxBodyTempinC)
       else{
             var response=elevatedTemp(bodyTemp,spo);
            return response;
        }
        //   var response=AllGood(bodyTemp,spo);
        //     return response;
}

    
};
