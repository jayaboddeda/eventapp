 //import { serverUrl, userName } from './module.js';
 var travel_content = '<div class="my-bookings-list" id="myBookingsList_1"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">HYD</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/event-flight.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">BNG</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white"> Rajiv Gandhi International Airport </li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/booking-clock.svg"> <span class="px-2">In Progress</span> </div></li><li> <button class="btn btn-download" disabled>Download</button> </li></ul> </div></div>';

 var commute_content = '<div class="my-bookings-list" id="myCommuteList_1"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">HYD</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/commute-car.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">BNG</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white"> Rajiv Gandhi International Airport </li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/conform-right.svg"> <span class="px-2">Confirmed</span> </div></li><li> <button class="btn btn-download" >Download</button> </li></ul></div></div>';

 var stay_content = '<div class="my-bookings-list" id="myStayList_1"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100"><li class="text-white w-70 guest-hotel-name">Lemon Tree Hotels</li><li class="text-white w-30 text-right"><img src="imgs/bed-white.svg"></li></ul><ul class="d-flex align-items-center w-100 mt-10"><li class=" w-50"><div>Check In</div><div class="check-in mt-10">23 Feb 22  thursday</div></li> <li class=" w-50 text-right"><div>Check Out</div><div class="check-out mt-10">25 Feb 22 saturday</div></li></ul> <div class="text-center mt-20 noof-guests">2 Adults</div></div></div>';

 var set_preferenece = '<div class="my-bookings-list" id="mySetPreferList"><div class="my-bookings-card d-block text-center"><h5 class="dining-text">Please Choose your Dining preferences</h5><a class="btn btn-preferences" href="food-form.html">Set preferences</a></div></div>';

 const travelOptionsModal = ` <div class="modal fade plan-trip-modal" id="travelOptionsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="planTripModalLabel" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button> </div><div class="modal-body"> <div class="travel-options d-flex" id="travelOptionsWrap"> <div class="travel-option" data-travel-type="train"> <div class="travel-img-container active"> <img src="imgs/train.svg" class="travel-img p-4 rounded"/> </div></div><div class="travel-option" data-travel-type="ship"> <div class="travel-img-container"> <img src="imgs/ship.svg" class="travel-img p-4 rounded"/> </div></div><div class="travel-option" data-travel-type="flight"> <div class="travel-img-container"> <img src="imgs/flight.svg" class="travel-img p-4 rounded"/> </div></div><div class="travel-option" data-travel-type="bus"> <div class="travel-img-container"> <img src="imgs/bus.svg" class="travel-img p-4 rounded"/> </div></div></div></div></div></div></div>`;
 
 let serverUrl = "http://localhost:3088";
 let guestid = localStorage.getItem("guestid");
 let sessionId = localStorage.getItem("sessionId");
 $('div[data-guestname="guestName"]').text(localStorage.getItem('guestname'));
// Default Event Loading bu User Id start here
    getDefaultEvents().then(function (result) {
        //console.log('Default');
        let response = JSON.parse(result.result);
        if(response !=null || response !='' || response !=undefined){
            $('div[data-allevents="all-events"]').empty();
            for(var i=0; i<response.length; i++){
                localStorage.setItem("eventid", response[i].eventid);
                let eventhtml = `<div class="swiper-slide slider-simple__slide" data-eventid="${response[i].eventid}"><div class="event-info-wrap" data-topbottom="${response[i].eventid}"><div class="event-top-content details-page" data-btntype="detailsPage" data-top="${response[i].eventid}"><img src="imgs/event-db-img.jpg" class="img-fluid event-db-img"><div class="event-db-details"><h2 class="caption__title">${response[i].eventname}</h2><div class="event-db-bottom-details"><div class="caption__desc"><img src="imgs/calendar (2).svg"><span>${response[i].startdate} to ${response[i].enddate}</span></div><div class="caption__desc"><img src="imgs/location.svg"> <span>${response[i].cityname}</span></div></div></div></div><div class="event-bottom-content" data-bottom="${response[i].eventid}"><div class="plan-a-trip-wrap"><div class="page__title-bar"><h2>Plan a Trip</h2></div><div class="row plan-trip-content-wrap" data-plantrip="${response[i].eventid}"></div></div><div class="my-bookings-wrap pb-20 pt-20"><div class="page__title-bar"><h2>My Bookings</h2></div><div class="my-bookings-content" data-mybookingevent="${response[i].eventid}"></div></div></div></div></div>`;
                $('div[data-allevents="all-events"]').append(eventhtml);
                //_getpreference(response[i].eventid);
                getpreference(response[i].eventid).then(function (preferResponse) {
                    let preferRes = JSON.parse(preferResponse.result);
                    
                    for(var k = 0; k < preferRes.length; k++){
                        if(preferRes[k] !=null && preferRes[k] !='' && preferRes[k] !=undefined){
                            let activeBtn ='';
                            if(k==0){
                                activeBtn = 'btn-active';
                            }
                            let preferHtml = `<div class="col-3"><a href="javascript:;" onclick="PreferenceBtn(this)"class="travel-btn plan-trip-item plan-trip-content-btn ${activeBtn}" data-eventname="${preferRes[k].eventname}" data-preferid="${preferRes[k].preferenceid}" data-btntype="${preferRes[k].preferencename}"><div class="trip-img-wrap"><img src="imgs/car-white.svg" class="img-fluid trip-img"></div><span class="trip-title m-0">${preferRes[k].preferencename}</span></a></div>`;
                            let noBookingHtml = `<div class="my-bookings-list" id="mySetPreferList"><div class="my-bookings-card d-block text-center"><h5 class="dining-text">Please Choose your ${preferRes[k].eventname} preferences</h5><a class="btn btn-preferences" onclick='btnbookingList(this)' href="javascript:void(0)">Set preferences</a></div></div>`;
                            $(`div[data-planTrip="${preferRes[k].eventid}"]`).append(preferHtml);
                            $(`div[data-mybookingevent="${preferRes[k].eventid}"]`).html(noBookingHtml);
                            console.log("guestId : " +guestid,"Event : "+preferRes[k].eventid,"preferencename :"+preferRes[k].preferencename)
                            getBooking(guestid,preferRes[k].eventid, preferRes[k].preferencename).then(function (bookingRes) {
                                if(bookingRes.result !=null && bookingRes.result !='' && bookingRes.result != undefined){
                                    let bookRes = JSON.parse(bookingRes.result);
                                    let bookListHtml = '', eventId, type;
                                    for(var b=0; b<bookRes.length; b++){
                                        eventId = bookRes[b].eventid;
                                        type = bookRes[b].preferencename
                                        if(type == 'Food'){
                                            bookListHtml +=`<div class="my-bookings-list mt-20" id="myBookingsList_${bookRes[b].eventid}" data-prefername="${bookRes[b].preferencename}"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100" style="font-size:22px"><li class="text-white">${bookRes[b].preferencename}</li><li class="text-white"><span><i class="las la-utensils"></i></span></li></ul><ul class="d-flex justify-content-between py-1 pt-2 align-items-center w-100"><li class="text-white">Type</li><li class="text-white">${bookRes[b].optionname}</li></ul></div></div>`;
                                        }if(type == 'Travel'){
                                            bookListHtml += `<div class="my-bookings-list mt-20" id="myBookingsList_${bookRes[b].eventid}" data-prefername="${bookRes[b].preferencename}"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100"><li class="text-white">From</li><li class="text-white">To</li></ul><ul class="d-flex align-items-center w-100"><li class="from-city text-truncate w-30">${bookRes[b].fromcity}</li><li class="w-40"><ul class="d-flex align-items-center w-100"><li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/event-flight.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul></li><li class="to-city w-30 text-right text-truncate">${bookRes[b].tocity}</li></ul><ul class="d-flex justify-content-between align-items-center w-100"><li class="from-city-details w-50 text-left text-white">Rajiv Gandhi International Airport</li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul><ul class="d-flex justify-content-between align-items-center w-100 pt-20"><li><div class="d-flex status-checking align-items-center text-white"><img src="imgs/booking-clock.svg"> <span class="px-2">${bookRes[b].status}</span></div></li><li><button class="btn btn-download" disabled>Download</button></li></ul></div></div>`;
                                        }if(type == 'Accommodation'){
                                            bookListHtml += `<div class="my-bookings-list mt-20" id="myBookingsList_${bookRes[b].eventid}" data-prefername="${bookRes[b].preferencename}"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100" style="font-size:22px"><li class="text-white">${bookRes[b].optionname}</li><li class="text-white"><span><i class="las la-bed"></i></span></li></ul><ul class="d-flex justify-content-between py-1 pt-2 align-items-center w-100"><li class="text-white">Check-in</li><li class="text-white">Check-out</li></ul><ul class="d-flex justify-content-between py-1 pt-2 align-items-center w-100"><li class="text-white">${bookRes[b].fromdate}</li><li class="text-white">${bookRes[b].fromdate}</li></ul><ul class="d-flex justify-content-center pt-2 align-items-center w-100"><li class="text-white">${bookRes[b].guestcount} Adults</li></ul></div></div>`;
                                        }
                                        if(type== 'Transport'){
                                            bookListHtml += ``;
                                        }
                                    }
                                    $(`a.plan-trip-item.plan-trip-content-btn`).removeClass('btn-active')
                                    $(`a.plan-trip-item[data-btntype="${type}"]`).addClass('btn-active')
                                    $(`div[data-mybookingevent="${eventId}"]`).html(bookListHtml);
                                }
                            });
                        }
                    }
                });
            }
            clickEvent();
            swipper_carousel();
        }
    });

//$(".my-bookings-content").html(travel_content); // firsttime loading by default
//clickEvent();
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

    // click event binding Start Here

    function PreferenceBtn(e){
        $(".plan-trip-content-btn").removeClass("btn-active");
        $(e).addClass("btn-active");
        let preferenceType = $(e).attr('data-btntype');
        let guestid = localStorage.getItem('guestid');
        let eventid = $('.slider-simple__slide.swiper-slide-active').attr('data-eventid');
        let eventTitle = $('.slider-simple__slide.swiper-slide-active').find('.caption__title').text();
        let noBookingHtml = `<div class="my-bookings-list" id="mySetPreferList"><div class="my-bookings-card d-block text-center"><h5 class="dining-text">Please Choose your ${eventTitle} preferences</h5><a class="btn btn-preferences" onclick='btnbookingList(this)' href="javascript:void(0)">Set preferences</a></div></div>`;                       
        let bookRes;
        getBooking(guestid,eventid,preferenceType).then(function (response) {
            bookRes = JSON.parse(response.result);
            let bookListHtml ='';
            for(var b=0; b<bookRes.length; b++){
                eventid = bookRes[b].eventid;
                //localStorage.getItem('eventid',eventid )
                if(bookRes[b].preferencename == 'Food'){
                    bookListHtml +=`<div class="my-bookings-list mt-20" id="myBookingsList_${bookRes[b].eventid}" data-prefername="${bookRes[b].preferencename}"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100" style="font-size:22px"><li class="text-white">${bookRes[b].preferencename}</li><li class="text-white"><span><i class="las la-utensils"></i></span></li></ul><ul class="d-flex justify-content-between py-1 pt-2 align-items-center w-100"><li class="text-white">Type</li><li class="text-white">${bookRes[b].optionname}</li></ul></div></div>`;
                }if(bookRes[b].preferencename == 'Travel'){
                    bookListHtml += `<div class="my-bookings-list mt-20" id="myBookingsList_${bookRes[b].eventid}" data-prefername="${bookRes[b].preferencename}"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100"><li class="text-white">From</li><li class="text-white">To</li></ul><ul class="d-flex align-items-center w-100"><li class="from-city text-truncate w-30">${bookRes[b].fromcity}</li><li class="w-40"><ul class="d-flex align-items-center w-100"><li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/event-flight.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul></li><li class="to-city w-30 text-right text-truncate">${bookRes[b].tocity}</li></ul><ul class="d-flex justify-content-between align-items-center w-100"><li class="from-city-details w-50 text-left text-white">Rajiv Gandhi International Airport</li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul><ul class="d-flex justify-content-between align-items-center w-100 pt-20"><li><div class="d-flex status-checking align-items-center text-white"><img src="imgs/booking-clock.svg"> <span class="px-2">${bookRes[b].status}</span></div></li><li><button class="btn btn-download" disabled>Download</button></li></ul></div></div>`;
                }if(bookRes[b].preferencename == 'Accommodation'){
                    bookListHtml += `<div class="my-bookings-list mt-20" id="myBookingsList_${bookRes[b].eventid}" data-prefername="${bookRes[b].preferencename}"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100" style="font-size:22px"><li class="text-white">${bookRes[b].optionname}</li><li class="text-white"><span><i class="las la-bed"></i></span></li></ul><ul class="d-flex justify-content-between py-1 pt-2 align-items-center w-100"><li class="text-white">Check-in</li><li class="text-white">Check-out</li></ul><ul class="d-flex justify-content-between py-1 pt-2 align-items-center w-100"><li class="text-white">${bookRes[b].fromdate}</li><li class="text-white">${bookRes[b].fromdate}</li></ul><ul class="d-flex justify-content-center pt-2 align-items-center w-100"><li class="text-white">${bookRes[b].guestcount} Adults</li></ul></div></div>`;
                }
                if(bookRes[b].preferencename == 'Transport'){
                    bookListHtml += ``;
                }
            }
            $(`div[data-mybookingevent="${eventid}"]`).html(bookListHtml);
        });
        if(bookRes == undefined || bookRes == null || bookRes == ''){
            $(`div[data-mybookingevent="${eventid}"]`).html(noBookingHtml);
        }
    }
    function btnbookingList(e){
        let bookingType = $(e).parents('.event-bottom-content').find('.plan-a-trip-wrap .plan-trip-content-btn.btn-active').text();
        let preferenceId = $(e).parents('.event-bottom-content').find('.plan-a-trip-wrap .plan-trip-content-btn.btn-active').attr('data-preferid');
        localStorage.setItem("preferenceType", bookingType);
        localStorage.setItem("preferenceId",preferenceId)
        localStorage.setItem("eventid", $('.slider-simple__slide.swiper-slide-active').attr('data-eventid'));
        if(bookingType =='Food'){
            window.location.href = "/food-form.html";
        }
        if(bookingType =='Travel'){
            window.location.href = "/welcome.html";
        }
        if(bookingType =='Transport'){
            window.location.href = "/car-form.html";
        }
        if(bookingType =='Accommodation'){
            window.location.href = "/welcome.html";
        }
    }
    function clickEvent(){
        $('a[data-btntype="Travel"]').click(function(){
            $(".plan-trip-content-btn").removeClass("btn-active");
            $(this).addClass("btn-active");
        $(".my-bookings-content").empty().html(set_preferenece).hide().fadeIn(500);
        $('#mySetPreferList').append(travelOptionsModal);
        });
        $('a[data-btntype="Transport"]').click(function(){
            $(".plan-trip-content-btn").removeClass("btn-active");
            $(this).addClass("btn-active");
            $(".my-bookings-content").html(commute_content).hide().fadeIn(500);
        });
        $('a[data-btntype="Accommodation"]').click(function(){
            $(".plan-trip-content-btn").removeClass("btn-active");
            $(this).addClass("btn-active");
            $(".my-bookings-content").html(stay_content).hide().fadeIn(500);
        });
        $('a[data-btntype="Food"]').click(function(){
            $(".plan-trip-content-btn").removeClass("btn-active");
            $(this).addClass("btn-active");
            $(".my-bookings-content").html(dine_content).hide().fadeIn(500);
        });
        $('.details-page[data-btntype="detailsPage"]').click(function(){
            localStorage.setItem('eventid', $('.slider-simple__slide.swiper-slide-active').attr('data-eventid'));
            window.location.href = '/details.html';
        })
    }
    // click event binding End Here

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

    // Swipper Start Here 
    function swipper_carousel(){
        var simplesliders = [];
        var simpleslider = [];
        $('.slider-init').each(function(index, element){        
            var paginationtype = $(this).attr("data-paginationtype");
            var spacebetweenitems = $(this).data("spacebetweenitems");
            var itemsperview = $(this).data("itemsperview");
            $(this).addClass('s'+index);
            $(this).prev().children(".page__title-right").children(".swiper-button-next").addClass('swiper-button-next'+index);
            $(this).prev().children(".page__title-right").children(".swiper-button-prev").addClass('swiper-button-prev'+index);
            $(this).children(".swiper-pagination").addClass('swiper-pagination'+index);
            simpleslider[index] = new Swiper('.s'+index, {
                    direction: 'horizontal',
                    effect: 'slide',
                    slidesPerView: itemsperview,
                    spaceBetween: spacebetweenitems,
                    pagination: {
                    el: '.swiper-pagination'+index,
                    type: paginationtype,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next'+index,
                        prevEl: '.swiper-button-prev'+index
                    }               
                });
            simplesliders.push(simpleslider[index]);
        });
        $('.swiper-button-prev, .swiper-button-next').on('click', function(){
            let eventid;
            eventid = parseInt($('.swiper-slide.swiper-slide-active').attr('data-eventid'))
            localStorage.setItem("eventid", eventid);
        })
    }
    // Swipper End Here 

        
       
