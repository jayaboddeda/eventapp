$(function () {
  const serverUrl = "http://localhost:3088";
  //const serverUrl = "http://192.168.88.252:82";
  localStorage.setItem("serverUrl", serverUrl);
  let sessionId;
  let optid;
  let  phonenumber;

  const storedCookie = Cookies.get("sessionId");
  if (storedCookie) {
    sessionId = storedCookie;
    localStorage.setItem("sessionId", sessionId);
  }

  // Login
  $("#loginBtn").click(function (e) {
    e.preventDefault();
    const userName = $("#userName").val();
    const passWord = $("#passWord").val();
    if (userName && passWord) {
      const datastr = {
        username: userName,
        Password: passWord,
        UnibaseId: "",
        RememberMe: false,
      };
      loginUser(JSON.stringify(datastr)).then(function (response) {
        if (response.status === 0 && response.result) {
          sessionId = response.result.sessionId;
          localStorage.setItem("guestname",response.result.name);
          localStorage.setItem("guestid",response.result.userId);
          localStorage.setItem("sessionId", response.result.sessionId); 
          Cookies.set("sessionId", sessionId);
          window.location.href = "/events.html";
        }
      });
    }
  });

  bindCities();

  function bindCities() {
    if ($("#bookingForm").length > 0)
      getCities().then(function (response) {
        if (response.result) {
          var names = JSON.parse(response.result);

          var data = $.map(names, function (obj) {
            obj.id = obj.cityid;
            obj.text = obj.cityname;

            return obj;
          });

          $(".select-cities").prepend('<option selected=""></option>');

          $(".select-cities").select2({
            width: "100%",
            data: data,
            placeholder: "Select a city",
          });
        }
      });
  }

  // abhiram
//registration 
$("#registration").click(function (e) {debugger
  phonenumber = $("#registrationphonenumber").val()
  localStorage.setItem('phonenumber',phonenumber)
  checkregistration().then(function (response) {
    if(response.result.userId)
    {
      localStorage.setItem("unibaseid",response.result.unibaseId);
      localStorage.setItem("tenantId",response.result.tenantId);
     const datastr = {
       ContactNumber: "",
       ContactOrEmail: phonenumber,
       Email: "",
       FirstName: "",
       IsForgotPswd: false,
       IsRegisterUser: true,
       IsSignup: false,
       LastName: "",
       OtpId: 0,
       TenantName: "",
       UnibaseId: "",
       UserOtp: ""
       }
     saveregistration(JSON.stringify(datastr)).then(function (response) {
       // if (response.status === 0 && response.result.length) {
       //    window.location.href = '../otp-confirmation.html';
       // }
        localStorage.setItem("otpid",response);
        localStorage.setItem("phonenumber",phonenumber);
       
       window.location.href = '../otp-confirmation.html';
     });
    }
    else{
      $(".registration-status").removeClass("d-none").addClass("d-flex align-items-center")
    }
    
  });
  


});
$(".registration-status").click(function(){
 $(this).addClass("d-none").removeClass("d-flex align-items-center")
})
function saveregistration(datastr) {
 const url = `${serverUrl}/account/sendotp/`;
 return postData(url, datastr);
}
function checkregistration() {
 const url = `${serverUrl}/account/getcontactbyphoneormail/${phonenumber}/1`;
 return getData(url);
}
function createuser(datastr) {
 const url = `${serverUrl}/account/registeruser`;
 return postData(url, datastr);
}



//registration  ends
//verify Otp
$("#verifybtn").click(function (e) {
  phonenumber = localStorage.getItem("phonenumber");
 optid = localStorage.getItem("otpid");
 let otpnumber = $("#otpsend").val()
 const datastr = {
   ContactNumber: "",
   ContactOrEmail:"",
   Email: "",
   FirstName: "",
   IsForgotPswd: false,
   IsRegisterUser: true,
   IsSignup: false,
   LastName: "",
   OtpId: optid,
   TenantName: "",
   UnibaseId: "",
   UserOtp: otpnumber
   }
 saveotp(JSON.stringify(datastr)).then(function (response) {
   if (response.status === 0 && response.result.contactConfirmed ) {
     localStorage.removeItem("otpid")
     window.location.href = '../enter-password.html';
   }
   else{
       $(".otp-message").addClass("d-flex align-items-center").removeClass("d-none")
   }
  
 });

});
function saveotp(datastr) {
 const url = `${serverUrl}/account/verifyotp`;
 return postData(url, datastr);
}
//verify Otp Ends Here

//create register
 $("#enter-password").click(function() {
          let newpassword = $("#newpassword").val(); 
          let confirmpassword = $("#confirmpassword").val(); 
          let passwordlength = $("#newpassword").val().length
          if(newpassword == confirmpassword)
          { 
            if(passwordlength < 6)
            {
               html='<span><img src="imgs/Info_Red.svg"></span><span class="h4 ml-10"> Password must contain atleat 6 characters </span>';
               $(".error-message").removeClass("d-none").addClass("d-flex align-items-center").html(html)
            }
            else{
              let unibaseid = localStorage.getItem("unibaseid")
              let tenantId = localStorage.getItem("tenantId")
              let phonenumber = localStorage.getItem("phonenumber")

              const datastr = {
                ContactNumber: phonenumber,
                Email: "",
                Password: newpassword,
                TenantId: tenantId,
                UserName:unibaseid
               
                }
              createuser(JSON.stringify(datastr)).then(function (response) {
                if (response.status === 0 && response.result.contactConfirmed ) {
                 //  localStorage.removeItem("otpid")
                  window.location.href = '../login.html';
                  $('#confirmmessage').modal('show');
                }
               });
            }
          }
          else{
              html='<span><img src="imgs/Info_Red.svg"></span><span class="h4 ml-10"> Password does not match</span>';
               $(".error-message").removeClass("d-none").addClass("d-flex align-items-center").html(html)
          }
          $(".error-message").click(function(){
              $(this).addClass("d-none").removeClass("d-flex align-items-center")
          })
          
       });

//create register Ends Here 




  //abhiram ends here

  //Booking Form
  $("#bookingSaveBtn").click(function (e) {
    const datastr = {

      businessclasscount: "3",
      eventid: localStorage.getItem('eventid'),
      fromcityid: "0",
      fromcityid_cityname:  $('#fromCities option:selected').text(),
      fromdate: $('#departureDate').val(),
      guestid: localStorage.getItem('guestid'),
      guestpreferenceid: "0",
      optionid: "0",
      optionid_optionname: localStorage.getItem('TravelType'),
      passengercount: "",
      preferenceid: "0",
      preferenceid_preferencename: localStorage.getItem('preferenceType'),
      preferncestatusid: "1",
      preferncestatusid_DropDownName: "0",
      tocityid: "0",
      tocityid_cityname: $('#toCities option:selected').text(),
      todate: $('#departureDate').val()
    }
    saveBookingForm(JSON.stringify(datastr)).then(function (response) {
      if (response.status === 0 && response.result.length) {
        successMsgPopup();
      }
    });
  });
  $('#AccomBookingSaveBtn').click(function (e) {
    const datastr = {
      preferencename: localStorage.getItem('preferenceType'),
      optionname: localStorage.getItem('AccommodationType'),
      guestcount: $('#noOfGuests').val(),
      checkout: $('#checkOutDate').val(),
      checkin: $('#checkInDate').val(),
      passengercount: parseInt($('#noOfGuests').val()),
      eventid:localStorage.getItem('eventid'),
      guestid:localStorage.getItem('guestid')
    }
    saveAccBookingForm(JSON.stringify(datastr)).then(function (response) {
      if (response.status === 0 && response.result.length) {
        successMsgPopup();
      }
    });
  });
  // Functions
  function loginUser(datastr) {
    const url = `${serverUrl}/account/login`;
    return postData(url, datastr);
  }
  function saveAccBookingForm(datastr) {
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/createaccomodation`;
    return postData(url, datastr);
  }
  function saveBookingForm(datastr) {
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/createtravelpreferences`;
    return postData(url, datastr);
  }

  function getCities() {
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/getcitiesautocomplete`;
    return getData(url);
  }
  function successMsgPopup() {
    const successMsgHtml = `<div class="modal success-msg-modal fade" id="successMsgModal" aria-hidden="true" aria-labelledby="successMsgModal"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered justify-content-center">
            <div class="modal-content">
                <img class="success-img my-5" src="./imgs/checked.png">
                <span class="success-title mb-5">Successfully Saved</span>
                <button class="btn btn-primary d-none next-btn mb-5">Next Step</button>
                <a href="/events.html" class="goback-link mb-5" data-bs-dismiss="modal" aria-label="Close"><u>Go Back</u></a>
            </div>
        </div>`;
    $("#successMsgPopup").html(successMsgHtml);
    $("#successMsgModal").modal("show");
    
  }
 
  // Ajax Functions
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
});