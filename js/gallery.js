
 let serverUrl = localStorage.getItem("serverUrl")
 let guestid = localStorage.getItem("guestid");
 let sessionId = localStorage.getItem("sessionId");
 
 getPhotos(guestid).then(function(res){
    let response = JSON.parse(res.result), html;
    if(response != '' && response != null && response != undefined){
        for(var i=0; i<response.length; i++){
            html +=`<figure data-src="${serverUrl}${response[i].path}"><img src="${serverUrl}${response[i].path}" alt="Not Found"></figure>`;
        }
        $('.container.hk-gallery').html(html)
        $('.hk-gallery').lightGallery({  showThumbByDefault: false,hash: false});
    }
 })
 function getPhotos(guestid) {
    const url = `${serverUrl}/apis/v4/bizgaze/integrations/events/myphotos/guestid/${guestid}`;
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
        
       
