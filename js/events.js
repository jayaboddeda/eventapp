 //import { serverUrl, userName } from './module.js';
 var travel_content = '<div class="my-bookings-list" id="myBookingsList_1"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">HYD</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/event-flight.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">BNG</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white"> Rajiv Gandhi International Airport </li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/booking-clock.svg"> <span class="px-2">In Progress</span> </div></li><li> <button class="btn btn-download" disabled>Download</button> </li></ul> </div></div>';

 var commute_content = '<div class="my-bookings-list" id="myCommuteList_1"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">HYD</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/commute-car.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">BNG</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white"> Rajiv Gandhi International Airport </li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/conform-right.svg"> <span class="px-2">Confirmed</span> </div></li><li> <button class="btn btn-download" >Download</button> </li></ul></div></div>';

 var stay_content = '<div class="my-bookings-list" id="myStayList_1"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100"><li class="text-white w-70 guest-hotel-name">Lemon Tree Hotels</li><li class="text-white w-30 text-right"><img src="imgs/bed-white.svg"></li></ul><ul class="d-flex align-items-center w-100 mt-10"><li class=" w-50"><div>Check In</div><div class="check-in mt-10">23 Feb 22  thursday</div></li> <li class=" w-50 text-right"><div>Check Out</div><div class="check-out mt-10">25 Feb 22 saturday</div></li></ul> <div class="text-center mt-20 noof-guests">2 Adults</div></div></div>';

 var set_preferenece = '<div class="my-bookings-list" id="mySetPreferList"><div class="my-bookings-card d-block text-center"><h5 class="dining-text">Please Choose your Dining preferences</h5><a class="btn btn-preferences" href="food-form.html">Set preferences</a></div></div>';

 let serverUrl = "http://localhost:3088";
 let guestid = localStorage.getItem("guestid");
 let sessionId = localStorage.getItem("sessionId");
// Default Event Loading bu User Id start here
getDefaultEvents().then(function (result) {
    let response = JSON.parse(result.result);
    let activeElement ='';
    if(response !=null || response !='' || response !=undefined){
        $('div[data-allevents="all-events"]').empty();
        for(var i=0; i<response.length; i++){
            if(i==0){activeElement = "swiper-slide-active";}else{activeElement="";}
            let html = `<div class="swiper-slide slider-simple__slide ${activeElement}" data-eventid="${response[i].eventid}"> <div class="event-info-wrap" data-topBottom="${response[i].eventid}"> <div class="event-top-content" data-top="${response[i].eventid}"> <img src="imgs/event-db-img.jpg" class="img-fluid event-db-img"/> <div class="event-db-details"> <h2 class="caption__title">Wedding Invitation Event</h2> <div class="event-db-bottom-details"> <div class="caption__desc"> <img src="imgs/calendar (2).svg"/><span> Jan 20,2022</span> </div><div class="caption__desc"> <img src="imgs/location.svg"/> <span> Hyderabad</span> </div></div></div></div><div class="event-bottom-content" data-bottom="${response[i].eventid}"> <div class="plan-a-trip-wrap"> <div class="page__title-bar"> <h2>Plan a Trip</h2> </div><div class="row plan-trip-content-wrap"> <div class="col-3 plan-trip-item"> <a href="javascript:;" class="travel-btn text-center plan-trip-content-btn btn-active" > <div class="trip-img-wrap"> <img src="imgs/car-white.svg" class="img-fluid trip-img"/> </div><span class="trip-title mt-20">Travel</span> </a> </div><div class="col-3 plan-trip-item"> <a href="javascript:;" class="commute-btn text-center plan-trip-content-btn" > <div class="trip-img-wrap"> <img src="imgs/car-white.svg" class="img-fluid trip-img"/> </div><span class="trip-title">Commute</span> </a> </div><div class="col-3 plan-trip-item"> <a href="javascript:;" class="stay-btn text-center plan-trip-content-btn" > <div class="trip-img-wrap"> <img src="imgs/stay.svg" class="img-fluid trip-img"/> </div><span class="trip-title">Stay</span> </a> </div><div class="col-3 plan-trip-item"> <a href="javascript:;" class="dine-btn text-center plan-trip-content-btn" > <div class="trip-img-wrap"> <img src="imgs/dine-white.svg" class="img-fluid trip-img"/> </div><span class="trip-title">Dine</span> </a> </div></div></div><div class="my-bookings-wrap pb-20 pt-20"> <div class="page__title-bar"> <h2>My Bookings</h2> </div><div class="my-bookings-content"> </div></div></div></div></div>`;
            $('div[data-allevents="all-events"]').append(html);
            getpreference(response[i].eventid).then(function (preferResponse) {
                let preferRes = JSON.parse(preferResponse.result);
                if(response !=null || response !='' || response !=undefined){
                    for(var k = 0; k<preferRes.length; k++){
                        
                        getBooking(guestid,preferRes.eventid, preferRes.preferencename).then(function (bookingRes) {
                            let bookRes = JSON.parse(bookingRes.result);
                            console.log(bookRes);
                            debugger;
                        });
                    }
                }
            });
        }
    }
  });
  function getDefaultEvents(){
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/getevents/guestid/${guestid}`;
    return getData(url);
  }

  function getpreference(eventid){
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/getpreferences/eventid/${eventid}`;
    return getData(url);
  }
  function getBooking(guestid,eventid,preferencename){
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/getoptionsbypreference/guestid/${guestid}/eventid/${eventid}/preferencename/${preferencename}`;
    return getData(url);
  }

  
// Default Event Loading bu User Id End here


$(".my-bookings-content").html(travel_content); // firsttime loading by default

// click event binding
$(".travel-btn").click(function(){
    $(".plan-trip-content-btn").removeClass("btn-active");
    $(this).addClass("btn-active");
 $(".my-bookings-content").empty().html(set_preferenece).hide().fadeIn(500);
});
$(".commute-btn").click(function(){
    $(".plan-trip-content-btn").removeClass("btn-active");
    $(this).addClass("btn-active");
    $(".my-bookings-content").html(commute_content).hide().fadeIn(500);
});
$(".stay-btn").click(function(){
    $(".plan-trip-content-btn").removeClass("btn-active");
    $(this).addClass("btn-active");
    $(".my-bookings-content").html(stay_content).hide().fadeIn(500);
});
$(".dine-btn").click(function(){
    $(".plan-trip-content-btn").removeClass("btn-active");
    $(this).addClass("btn-active");
    $(".my-bookings-content").html(dine_content).hide().fadeIn(500);
});

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