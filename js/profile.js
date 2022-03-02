
let serverUrl = localStorage.getItem("serverUrl")
let guestid = localStorage.getItem("guestid");
let sessionId = localStorage.getItem("sessionId");

getProfile(guestid).then(function(res){
let response = JSON.parse(res.result), html="";
if(response != '' && response != null && response != undefined){
    for(let i=0; i<response.length; i++){
        html +=`<div class="profile-pic-header"><ul class="d-flex align-items-center w-100"><li class="text-center"><img src="${serverUrl}${response[i].photourl.replace(/~/g, '')}" class="guest-pic"><div class="profile-pic-change">Change</div></li><li class="guest-name">${response[i].guestname} <span><img src="imgs/pen.svg"></span></li></ul></div><div class="main-structure"><div class="guest-contact-details"><div class="guest-phone-number"><ul class="d-flex justify-content-between align-items-center w-100"><li><div class="phone-header"><img src="imgs/phone.svg"> <span>Number</span></div><div class="guest-number">+91 ${response[i].phonenumber}</div></li><li><img src="imgs/pen.svg"></li></ul></div><div class="guest-emailid"><ul class="d-flex justify-content-between align-items-center w-100"><li><div class="email-header"><img src="imgs/email.svg"> <span>Email</span></div><div class="guest-email-id">${response[i].emailaddress}</div></li><li><img src="imgs/pen.svg"></li></ul></div></div><div class="sign-out-div"><button class="btn guest-sign-out">Sign Out</button></div></div>`;
    } 
    $('.page--main').html(html);
}
})
function getProfile(guestid) {
const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/guestdetails/guestid/${guestid}`;
return getData(url);
}
// Ajax Functions Start Here
function getData(serviceurl) {
    return executeAjax("GET", serviceurl, null);
}

function postData(serviceurl, datastr) {
return executeAjax("POST", serviceurl, datastr);
}

function executeAjax(method, serviceurl, datastr) {
    return $.ajax({
        type: method,
        url: serviceurl,
        crossDomain: true,
        contentType: "application/json",
        cache: true,
        jsonp: false,
        data: datastr,
        beforeSend: function (xhr) {
        if (sessionId != undefined && sessionId != null) {
            xhr.setRequestHeader("Authorization", "Basic " + sessionId);
        }
        },
    });
}
// Ajax Functions End Here
        
       
