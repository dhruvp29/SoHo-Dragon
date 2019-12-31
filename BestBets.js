"use strict"; 
var TrainedApplicators = {
    siteUrl: "",
    listTitle:"Trained Applicators 2019",
    filterKeyword:"",
    collListItem:null,
    tblTrainedApplicators: null,
    init: function(){
        TrainedApplicators.siteUrl = _spPageContextInfo.siteAbsoluteUrl;
        if($("#txtFilter")!== undefined && $("#txtFilter").length > 0 && $("#txtFilter").val().trim() !== ""){
            TrainedApplicators.filterData($("#txtFilter").val().trim());
        }else{
        var oDataUrl = TrainedApplicators.siteUrl + "/_api/web/lists/getbytitle('"+TrainedApplicators.listTitle+"')/items?$select=ID,ProFACT_x0020_ID,Title,First_x0020_Name,Company_x0020_Address,Company_x0020_Address0,Business_x0020_City,Business_x0020_State_x002f_Provi,Business_x0020_Zip_x002f_Postal_,Business_x0020_Phone,Home_x002f_Mobile_x0020_Number&$filter=(Paid eq 1)&$Top=500";  
        $.ajax({  
            url: oDataUrl,  
            type: "GET",  
            dataType: "json",  
            headers: {  
                "accept": "application/json;odata=verbose"  
            },  
            success: TrainedApplicators.onSuccess,  
            error: TrainedApplicators.myError  
        });  
    }
    },
    filterData: function(keyword){
        if(keyword.indexOf("'") > -1){
            keyword = keyword.replace("'","''");
        }
        var oFilteredDataUrl = BestBets.siteUrl + "/_api/web/lists/getbytitle('" + BestBets.listTitle + "')/items?$select=ID,ProFACT_x0020_ID,Title,First_x0020_Name,Company_x0020_Address,Company_x0020_Address0,Business_x0020_City,Business_x0020_State_x002f_Provi,Business_x0020_Zip_x002f_Postal_,Business_x0020_Phone,Home_x002f_Mobile_x0020_Number&$filter=((substringof(%27" + encodeURIComponent(keyword) + "%27,Title)%20or%20substringof(%27" + encodeURIComponent(keyword) + "%27,First_x0020_Name)%20or%20substringof(%27" + encodeURIComponent(keyword) + "%27,Company_x0020_Address)) and (Paid eq 1))&$Top=500";
                $.ajax({  
                    url: oFilteredDataUrl,  
                    type: "GET",  
                    dataType: "json",  
                    headers: {  
                        "accept": "application/json;odata=verbose"  
                    },  
                    success: BestBets.onSuccess,  
                    error: BestBets.myError  
                }); 
    },
    onSuccess: function(data){
       TrainedApplicators.renderDataTable(data.d.results);
    },
    onError: function(data, errMessage){
        console.log("Error: " + errMessage);  
    },
    renderDataTable:function(data){
        try {  
            console.log(data);
        } catch (e) {  
            console.log(e.message);  
        }  
    }
}
