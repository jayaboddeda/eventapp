$(function () {
  const serverUrl = "http://192.168.88.216:92";
  let sessionId;

  const storedCookie = Cookies.get("sessionId");
  if (storedCookie) {
    sessionId = storedCookie;
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
          Cookies.set("sessionId", sessionId);
          window.location.href = "/events.html";
        }
      });
    }
  });

  // Get Cities
  //   $(".select-cities").on("select2:opening", function () {
  //     const select2El = this;
  //     getCities().then(function (response) {
  //       if (response.result) {
  //         $(select2El).select2({
  //           data: response.result,
  //         });
  //       }
  //     });
  //   });
  bindCities();
  function bindCities() {
    if ($(".booking-form").length > 0)
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

  //Booking Form
  $("#bookingSaveBtn").click(function (e) {
    e.preventDefault();
    // const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/createtravelpreferences`;
    const fromCity = $("#fromCities").val();
    const toCity = $("#toCities").val();
    const departureDate = $("#departureDate").val();
    const returnDate = $("#returnDate").val();
    const travellers = $("#travellers").val();
    const optionname = $("#booking-form").attr("data-formtype");

    const datastr = {
      fromcityid: fromCity,
      tocityid: toCity,
      fromdate: departureDate,
      todate: returnDate,
      passengercount: travellers,
      preferencename: "Travel",
      optionname: optionname,
    };
    saveBookingForm(JSON.stringify(datastr)).then(function (response) {
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

  function saveBookingForm(datastr) {
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/createtravelpreferences`;
    return postData(url, datastr);
  }

  function getCities() {
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/getcitiesautocomplete`;
    return getData(url);
  }

  function successMsgPopup() {
    const successMsgHtml = `<div class="modal fade" id="successMsgModal" aria-hidden="true" aria-labelledby="successMsgModal"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="successMsgModal">Success</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Success
                </div>
            </div>
        </div>
    </div>`;
    $("#successMsgPopup").html(successMsgHtml);
    $("#successMsgModal").modal("show");
  }

  // Ajax Funcations
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
