var travel_content = '<div class="my-bookings-list" id="myBookingsList"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">HYD</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/event-flight.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">BNG</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white"> Rajiv Gandhi International Airport </li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/booking-clock.svg"> <span class="px-2">In Progress</span> </div></li><li> <button class="btn btn-download" disabled>Download</button> </li></ul> </div></div><div class="my-bookings-list mt-20" id="myBookingsList"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">BNG</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/event-flight_black.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">HYD</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white">Kempegowda International Airport Bengaluru </li><li class="to-city-details w-50 text-right text-white">Rajiv Gandhi International Airport </li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/conform-right.svg"> <span class="px-2">Confirmed</span> </div></li><li> <button class="btn btn-download" >Download</button> </li></ul> </div></div>';

 var commute_content = '<div class="my-bookings-list " id="myBookingsList"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">HYD</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/commute-car.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">BNG</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white"> Rajiv Gandhi International Airport </li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/conform-right.svg"> <span class="px-2">Confirmed</span> </div></li><li> <button class="btn btn-download" >Download</button> </li></ul> </div><div class="my-bookings-list mt-20" id="myBookingsList"> <div class="my-bookings-card d-block"> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="text-white">From</li><li class="text-white">To</li></ul> <ul class="d-flex align-items-center w-100"> <li class="from-city w-30">HYD</li><li class="w-40"><ul class="d-flex align-items-center w-100"> <li class="border-bottom px-20 w-100"></li><li class="px-2 w-100"><img src="imgs/commute-car.svg" class="w-100"></li><li class="border-bottom px-20 w-100"></li></ul> </li><li class="to-city w-30 text-right">BNG</li></ul> <ul class="d-flex justify-content-between align-items-center w-100"> <li class="from-city-details w-50 text-left text-white"> Rajiv Gandhi International Airport </li><li class="to-city-details w-50 text-right text-white">Kempegowda International Airport Bengaluru</li></ul> <ul class="d-flex justify-content-between align-items-center w-100 pt-20"> <li><div class="d-flex status-checking align-items-center text-white"> <img src="imgs/booking-clock.svg"> <span class="px-2">In Progress</span> </div></li><li> <button class="btn btn-download" disabled>Download</button> </li></ul> </div></div></div>';

 var stay_content = '<div class="my-bookings-list " id="myBookingsList"><div class="my-bookings-card d-block"><ul class="d-flex justify-content-between align-items-center w-100"><li class="text-white w-70 guest-hotel-name">Lemon Tree Hotels</li><li class="text-white w-30 text-right"><img src="imgs/bed-white.svg"></li></ul><ul class="d-flex align-items-center w-100 mt-10"><li class=" w-50"><div>Check In</div><div class="check-in mt-10">23 Feb 22  thursday</div></li> <li class=" w-50 text-right"><div>Check Out</div><div class="check-out mt-10">25 Feb 22 saturday</div></li></ul> <div class="text-center mt-20 noof-guests">2 Adults</div></div></div>';

 var dine_content = '<div class="my-bookings-list " id="myBookingsList"><div class="my-bookings-card d-block text-center"><h5 class="dining-text">Please Choose your Dining preferences</h5><a class="btn btn-preferences" href="food-form.html">Set preferences</a></div></div>';
  $(".my-bookings-content").html(travel_content); // firsttime loading by default
$(".travel-btn").click(function(){
    $(".plan-trip-content-btn").removeClass("btn-active");
    $(this).addClass("btn-active");
 $(".my-bookings-content").html(travel_content).hide().fadeIn(500);
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