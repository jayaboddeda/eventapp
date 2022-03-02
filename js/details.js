  let serverUrl = localStorage.getItem('serverUrl');
  let sessionId = localStorage.getItem('sessionId');
  //Details page start Here
  let eventdetailsid = localStorage.getItem('eventid');  
   function getDetails(eventdetailsid) {    
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/geteventdetails/eventid/${eventdetailsid}`;
    return getData(url);
  }
  getDetails(eventdetailsid).then(function (response) {
    
    let _response = JSON.parse(response.result);
    if(_response !=null || _response !='' || _response !=undefined){
      let eventname = _response[0].eventname;
      let eventstartdate = _response[0].startdate;
      let eventenddate = _response[0].enddate;
      let eventdescription = _response[0].eventdescription;
      let eventcityname = _response[0].cityname;
      let eventqrcode = _response[0].qrcodepath.replace(/~/g, '');
      $(".caption__title").html(eventname);
      $(".eventstartdate").html(eventstartdate);
      $(".eventenddate").html(eventenddate);
      $(".eventdescription").html(eventdescription);
      $(".eventcityname").html(eventcityname);
     $(".eventstartdate").html(eventstartdate);
     if(eventqrcode != null)
     {
       let html=`<div class="qr-text"><span class="mr-10"><img src="imgs/questionmark.svg"></span>Scan QR code at the time of entry</div>
       <img src="${serverUrl}/${eventqrcode}" class="img-fluid w-100 h-100">`
       $(".qrcode-img").html(html)
     }
    }
    getpreference(eventdetailsid).then(function (preferResponse) {
      let preferRes = JSON.parse(preferResponse.result);
      if(preferRes !=null || preferRes !='' || preferRes !=undefined){
      for(var b=0; b<preferRes.length; b++){
        eventId = preferRes[b].eventid;
        type = preferRes[b].preferencename;

        if(type == 'Travel'){
            preferencelist = `<div class="toggle__item" id="${preferRes[b].preferencename}_${preferRes[b].eventid}"><input  class="toggle__input"id="togg1"type="checkbox" name="toggle"/><label class="toggle__label border-btm" for="togg1"><img src="imgs/camposs.svg" class="toggle-img" /> ${preferRes[b].preferencename}<span></span></label><div class="toggle__content toggle_content_details border-btm"  id="booking_${preferRes[b].preferencename}_${preferRes[b].eventid}"></div></div>`;
        }
        if(type == 'Transport'){
          preferencelist = `<div class="toggle__item" id="${preferRes[b].preferencename}_${preferRes[b].eventid}"><input  class="toggle__input"id="togg2"type="checkbox" name="toggle"/><label class="toggle__label border-btm" for="togg2"><img src="imgs/car-white.svg" class="toggle-img" /> ${preferRes[b].preferencename}<span></span></label><div class="toggle__content toggle_content_details border-btm"  id="booking_${preferRes[b].preferencename}_${preferRes[b].eventid}"></div></div>`;
        }
        if(type == 'Accommodation'){
          preferencelist = `<div class="toggle__item" id="${preferRes[b].preferencename}_${preferRes[b].eventid}"><input  class="toggle__input"id="togg3"type="checkbox" name="toggle"/><label class="toggle__label border-btm" for="togg3"><img src="imgs/stay.svg" class="toggle-img" /> ${preferRes[b].preferencename}<span></span></label><div class="toggle__content toggle_content_details border-btm"  id="booking_${preferRes[b].preferencename}_${preferRes[b].eventid}"></div></div>`;
        }
        if(type == 'Food'){
          preferencelist =`<div class="toggle__item" id="${preferRes[b].preferencename}_${preferRes[b].eventid}"><input  class="toggle__input"id="togg4"type="checkbox" name="toggle"/><label class="toggle__label border-btm" for="togg4"><img src="imgs/dine-white.svg" class="toggle-img" /> ${preferRes[b].preferencename}<span></span></label><div class="toggle__content toggle_content_details border-btm"  id="booking_${preferRes[b].preferencename}_${preferRes[b].eventid}"></div></div>`;
        }
        $(".event-details-content .event-transport-details").addClass("toggle mb-20").append(preferencelist);
        var guestid = localStorage.getItem('guestid');  
        getBooking(guestid,eventdetailsid,type).then(function (response) {
          bookRes = JSON.parse(response.result);
          if(bookRes == null || bookRes !='' || bookRes !=undefined){
            let bookpre = bookRes[0].preferencename;
            let bookingguestname = bookRes[0].guestname;
            let bookingfromcity = bookRes[0].fromcity;
            let bookingtocity = bookRes[0].tocity;
            let bookingfromdate = bookRes[0].fromdate;
            let bookingoptionname= bookRes[0].optionname;
            let bookingstatus = bookRes[0].status;
            let bookingguestcount = bookRes[0].guestcount;
            if(bookpre =='Travel' ){
            html=`<ul class="d-flex justify-content-between w-100"><li class="text-white w-30">TYPE</li><li class="text-white text-right w-70">${bookingoptionname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">GUEST </li><li class="text-white text-right w-70">${bookingguestname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">DEPARTURE</li><li class="text-white text-right w-70">${bookingfromcity}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">ARRIVAL</li><li class="text-white text-right w-70">${bookingtocity}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">PERSONS</li><li class="text-white text-right w-70">${bookingguestcount}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">DATE</li><li class="text-white text-right w-70">${bookingfromdate}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">STATUS</li><li class="text-white text-right w-70">${bookingstatus}</li></ul>`;
            $(`#booking_${bookpre}_${eventdetailsid}`).html(html)
            }
            if(bookpre == 'Accommodation' ){
              html=`<ul class="d-flex justify-content-between w-100"><li class="text-white w-30">TYPE</li><li class="text-white text-right w-70">${bookingoptionname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">GUEST </li><li class="text-white text-right w-70">${bookingguestname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">PERSONS</li><li class="text-white text-right w-70">${bookingguestcount}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">DATE</li><li class="text-white text-right w-70">${bookingfromdate}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">STATUS</li><li class="text-white text-right w-70">${bookingstatus}</li></ul>`;
              $(`#booking_${bookpre}_${eventdetailsid}`).html(html)
              }
              if(bookpre == 'Food' ){
                html=`<ul class="d-flex justify-content-between w-100"><li class="text-white w-30">TYPE</li><li class="text-white text-right w-70">${bookingoptionname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">GUEST </li><li class="text-white text-right w-70">${bookingguestname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">PERSONS</li><li class="text-white text-right w-70">${bookingguestcount}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">DATE</li><li class="text-white text-right w-70">${bookingfromdate}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">STATUS</li><li class="text-white text-right w-70">${bookingstatus}</li></ul>`;
                $(`#booking_${bookpre}_${eventdetailsid}`).html(html)
                }
                if(bookpre == 'Transport' ){
                  html=`<ul class="d-flex justify-content-between w-100"><li class="text-white w-30">TYPE</li><li class="text-white text-right w-70">${bookingoptionname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">GUEST </li><li class="text-white text-right w-70">${bookingguestname}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">PERSONS</li><li class="text-white text-right w-70">${bookingguestcount}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">DATE</li><li class="text-white text-right w-70">${bookingfromdate}</li></ul><ul class="d-flex justify-content-between w-100"><li class="text-white w-30">STATUS</li><li class="text-white text-right w-70">${bookingstatus}</li></ul>`;
                  $(`#booking_${bookpre}_${eventdetailsid}`).html(html)
                  }
          }
        
        });
       
       
        }
        $(".toggle_content_details").each(function(){
          let checkdata = $(this).find("ul").length;
          html=`<ul class=""><li>No Data</li></ul>`;
          if(checkdata == 0)
          {
            $(this).html(html)
          }
        });
      }
     
     
    });
   
  
  });

  
  //Details page End Here
  //preferences start here 
 // Ajax Functions Start Here
    function getData(serviceurl) {
        return executeAjax("GET", serviceurl, null);
    }

    function postData(serviceurl, datastr) {
    return executeAjax("POST", serviceurl, datastr);
    }
    function getpreference(eventdetailsid){
      const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/getpreferences/eventid/${eventdetailsid}`;
      return getData(url);
  }
  function getBooking(guestid,eventid,preferencename){
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/getoptionsbypreference/guestid/${guestid}/eventid/${eventid}/preferencename/${preferencename}`;
    return getData(url);
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

   
   