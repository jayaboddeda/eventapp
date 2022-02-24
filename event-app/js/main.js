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
  $(".select-cities").on("select2:open", function () {
    const select2El = this;
  });

  //Flight Form
  $("#flightFormSaveBtn").click(function (e) {
    e.preventDefault();
    const url = `${serverUrl}/account/login`;
    const fromDate = $("#fromDate").val();
    const toDate = $("#toDate").val();
    const departureDate = $("#departureDate").val();
    const returnDate = $("#returnDate").val();
    const travellers = $("#travellers").val();

    if (fromDate && toDate && departureDate && returnDate && travellers) {
      const datastr = {
        fromDate: fromDate,
        toDate: toDate,
        departureDate: departureDate,
        returnDate: returnDate,
        travellers: travellers,
      };
      saveFlightForm("POST", url, JSON.stringify(datastr)).then(function (
        response
      ) {
        if (response.status === 0 && response.result.length) {
          successMsgPopup();
        }
      });
    }
  });

  // Functions
  function loginUser(datastr) {
    const url = `${serverUrl}/account/login`;
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
