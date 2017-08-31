'use strict';

var config ={
    'site_logo': '/toinotification/toi_logo.png',
    'swjs_path' : 'sw.js',

    'web_url' : 'http://timesofindia.indiatimes.com',
    'web_source' : 'toiweb',
    'web_domain' : '.indiatimes.com',

    'web_allow_cookie' : '_tointfcallow',
    'web_allow_cookie_value' : 'true',
    'web_block_cookie' : '_tointfcblock',
    'web_block_cookie_value' : 'true',
    
    'wap_url' : 'http://m.timesofindia.com/',
    'wap_source' : 'toiwap',
    'wap_domain' : '.timesofindia.com',
    
    'wap_allow_cookie' : 'gcm_enbl',
    'wap_allow_cookie_value' : 'true',
    'wap_block_cookie' : 'gcm_enbl',
    'wap_block_cookie_value' : 'false',

    'ntfc_tag' : 'toinews-notification',
    'ntfc_allow_cookie_expiry' : 365,
    'ntfc_block_cookie_expiry' : 30,

    'auto_redirect_timer' : 5,
    'redirection_param_enabled' : true,

    'ga_enable' : true,
    'ga_category' : 'Browser Notification',
    'ga_allow_event' : 'Notification_Allow',
    'ga_block_event' : 'Notification_Block',
    'ga_ignore_event' : 'Ignore',
    'ga_autoredirect_event' : 'Auto',
    'ga_btn_allow' : 'GotIT_Allow',
    'ga_btn_block' : 'GotIT_Block',
    
    'utm_enabled' : true,
    'utm_source' : 'browser_notification',
    'utm_medium' : '',
    'utm_campaign' : 'TOI_browsernotification',

    'subscription_api' : 'https://timesnotifications.indiatimes.com/push-notification/subscribe',

    'wlcm_ntfc_title' : 'Times of India',
    'wlcm_ntfc_msg' : 'Thank you for subscribing to TOI notifications.',

    'safari_pushId': 'web.com.times.push',
    'safari_requestUrl': 'https://timesnotifications.indiatimes.com/push-notification/safari',
    'safari_notification_init': false
};

   
function getSource(){
    return (isMobile() === true) ? config.wap_source : config.web_source;
}

function getBrowser(){
    if(/Chrome/i.test(navigator.userAgent)){
        return 'chrome';
    }else if(/firefox/i.test(navigator.userAgent)){
        return 'mozilla';
    }else if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)){
        return 'safari';
    }
    return '';
}

function getAction(act){
    return (isMobile() === true) ? act : act+'_Web';
}

function getUrl(){
    return (isMobile() === true) ? config.wap_url : config.web_url;
}

function getRedirectionUrl(action){
    var url = getUrl(),
        ga_action = getAction(action); 
    
    if(!!document.referrer){
        url = document.referrer;
    }
     
    if(action=='wlcm'){
       return appendUTMParams(url);
    }else{
        url = appendRedirectionParam(url);
    }
    
    triggerGAEvent(config.ga_category, ga_action, getBrowser());
    
    return url;
}

function appendUTMParams(url){
    if(!config.utm_enabled)
        return url;
    var utm_params = "utm_source="+config.utm_source+"&utm_medium="+((config.utm_medium.length) ? config.utm_medium : getBrowser())+"&utm_campaign="+config.utm_campaign;
    return url + ((url.indexOf('?')!=-1) ? '&' : '?') + utm_params;
}

function appendRedirectionParam(url){
    if(!config.redirection_param_enabled)
        return url;
    return url + ((url.indexOf('?')!=-1) ? '&' : '?')+ config.utm_campaign +"=true";
}

function getEndPoint(){
    var is_firefox = /firefox/i.test(navigator.userAgent),
        endpoint = is_firefox ? 'https://updates.push.services.mozilla.com/wpush/v1':'https://android.googleapis.com/gcm/send';
    return endpoint;
}

function isMobile(){
    return (function(a) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    })(navigator.userAgent || navigator.vendor || window.opera);
}

function setCookie(name, value, days, path, domain, secure ) {
    var expires = '';
    days = ( days !== undefined ) ? days : 30;
    var date = new Date();
    date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
    expires = '; expires=' + date.toGMTString();
    domain = ( domain || document.location.host ).split( ":" )[ 0 ]; //removing port
    path = path || document.location.pathname;
    //Removing file name, fix for IE11
    if( /\/.*\..*/.test( path ) ) { //if path contains file name
        path = path.split( "/" );
        path.pop();
        path = path.join( "/" );
    }
    document.cookie = name + '=' +
    value + expires +
    ( ( path ) ? ';path=' + path : '' ) +
    ( ( domain && domain !='localhost' ) ? ';domain=' + domain : '' ) +
    ( ( secure ) ? ';secure' : '' );
}

function triggerGAEvent(catg, action, label){
    if(typeof ga!="undefined" && config.ga_enable){
        ga('send', 'event', catg, action, label);
    }
}

var GCM_ENDPOINT = getEndPoint();
// This method handles the removal of subscriptionId
// in Chrome 44 by concatenating the subscription Id 
// to the subscription endpoint
function endpointWorkaround(pushSubscription) {
    if (pushSubscription.endpoint.indexOf(GCM_ENDPOINT) !== 0) {
        return pushSubscription.endpoint;
    }

    var mergedEndpoint = pushSubscription.endpoint;
    // chrome 42 + 43 will not have the subscriptionId attached to the endpoint.
    if (pushSubscription.subscriptionId &&
        pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
        // handle version 42 where you have separate subId and Endpoint
        mergedEndpoint = pushSubscription.endpoint + '/' +
            pushSubscription.subscriptionId;
    }
    return mergedEndpoint;
}

function sendSubscriptionToServer(subscription) {
    var mergedEndpoint = endpointWorkaround(subscription);
    showCurlCommand(mergedEndpoint);
}

function showCurlCommand(mergedEndpoint) {
    if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
        console.log('This browser isn\'t currently ' +
            'supported for this demo');
        return;
    }

    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];
    try {
        var dataObj = {};
        dataObj.subscribeId = subscriptionId;
        dataObj.source = getSource();
        dataObj.sections = '';
        dataObj.browser = getBrowser();
        dataObj.cities = '';
    
        $.post(config.subscription_api, dataObj)
          .done(function( data ) {
            showSubscribeMsg();
          });
    } catch (ex) {
        alert("EX" + ex);
    }

}

function subscribe() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true
            })
            .then(function(subscription) {
                if(isMobile()===true){
                    setCookie(config.wap_allow_cookie, config.wap_allow_cookie_value , config.ntfc_allow_cookie_expiry, "/", config.wap_domain, false);
                }else{
                    setCookie(config.web_allow_cookie, config.web_allow_cookie_value , config.ntfc_allow_cookie_expiry, "/", config.web_domain, false);
                }
                triggerGAEvent(config.ga_category, getAction(config.ga_allow_event), getBrowser());
                showSubscribeMsg();
                showWelcomeNotification(serviceWorkerRegistration);
                return sendSubscriptionToServer(subscription);
            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    if(isMobile()===true){
                        setCookie(config.wap_block_cookie, config.wap_block_cookie_value , config.ntfc_block_cookie_expiry, "/", config.wap_domain, false);
                    }else{
                        setCookie(config.web_block_cookie, config.web_block_cookie_value , config.ntfc_block_cookie_expiry, "/", config.web_domain, false);
                    }
                    triggerGAEvent(config.ga_category, getAction(config.ga_block_event), getBrowser());
                    showBlockMsg();
                    console.log('Permission for Notifications was denied');
                } else if (Notification.permission === 'default') {
                    triggerGAEvent(config.ga_category, getAction(config.ga_ignore_event), getBrowser());
                    showIgnoreMsg();
                } else {
                    console.log('Unable to subscribe to push.', e);
                }
            });
    });
}

function showMsg(type){    
    $('.msg-wrapper').hide();
    $('#subscribe-'+type).show();
}   

function showBlockMsg(){
    showMsg('block');
}

function showIgnoreMsg(){
    showMsg('ignore');
}

function showSubscribeMsg(){
    showMsg('success');
    var timerEle = $('[data-plugin="timer"]');
    (function(){
        var timeLeft = config.auto_redirect_timer;
        setInterval(function(){
            timeLeft--;
            if(timeLeft >= 0)
                timerEle.text(timeLeft);
            if(timeLeft == 0){
                    window.location.href = getRedirectionUrl(config.ga_autoredirect_event);
                }
        },1000);
    })();
}

function showWelcomeNotification(sw_reg) {
    try {
        var notification = sw_reg.showNotification(config.wlcm_ntfc_title, {
            'body': config.wlcm_ntfc_msg,
            'icon': config.site_logo,
            'vibrate': [300, 100, 400], // Vibrate 300ms, pause 100ms, then vibrate 400ms
            'tag': config.ntfc_tag,
            'data': getRedirectionUrl('wlcm')
        });
        notification.onclick = function (event) {
            event.target.close();
            window.open(event.target.data);
            return;
        };
    } catch (err) {}
}

function showSafariWelcomeNotification(){
    try{
        var notification = new Notification(config.wlcm_ntfc_title, {
            'body': config.wlcm_ntfc_msg,
            'icon': config.site_logo,
            'vibrate': [300, 100, 400],
            'tag' : config.ntfc_tag
        });
        notification.onclick = function () {
            this.close();
            window.open(getRedirectionUrl('wlcm'));
        };
        notification.onclose = function () {

        };
    } catch (err){}
}

// Once the service worker is registered set the initial state
function initialiseState() { 
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.log('Notifications aren\'t supported.');
        return;
    }

    if (Notification.permission === 'denied') {
        console.log('The user has blocked notifications.');
        showBlockMsg();
        return;
    }

    // check for push messaging support
    if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.');
        return;
    }

    // service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (!subscription) {
                    subscribe();
                    return;
                }
                showSubscribeMsg();
                showWelcomeNotification(serviceWorkerRegistration);
            })
            .catch(function(err) {
                console.log('Error during getSubscription()', err);
            });
    });
}

function bindBtnEvent(){
    $('.pop_welcomemsg').on('click','#subscribegotit',function(){
        window.location.href = getRedirectionUrl(config.ga_btn_allow);
        return false;
    });
    $('.pop_welcomemsg').on('click','#blockgotit',function(){
        window.location.href = getRedirectionUrl(config.ga_btn_block);
        return false;
    });
    $('#subscribe-block').on('click','h3',function(){
        $(this).toggleClass('up');
        var browser = getBrowser();
        if(browser == 'safari'){
            $('.steps-safari-web').slideToggle();
        }
        else if(browser == 'mozilla'){
            $('.steps-mozilla-web').slideToggle();
        }else{
            $('.steps-web').slideToggle();
        }
        
        $('#blockgotit').toggle();
        return false;
    });
    $('body').addClass(getBrowser());
}

window.addEventListener('load', function() {
    bindBtnEvent();
    if(getBrowser() == 'safari'){
        safariNotificationInit();
    }else{
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(config.swjs_path)
                .then(initialiseState);
        }
    }
});

function safariNotificationInit(){
    "use strict";
    if ('safari' in window && 'pushNotification' in window.safari) {
        var permissionData = window.safari.pushNotification.permission(config.safari_pushId);
        checkRemotePermission(permissionData);
    } else {
        alert("Push notifications not supported.");
    }
}

function checkRemotePermission(permissionData) {
    "use strict";
    if (permissionData.permission === 'default') {
        console.log("The user is making a decision");
        config.safari_notification_init = true;
        window.safari.pushNotification.requestPermission(
        config.safari_requestUrl,
        config.safari_pushId, {
        "name" : "Deepak",
        "source" : "TOI"
        },
        checkRemotePermission);
    } else if (permissionData.permission === 'denied') {
        console.log(arguments);
        if(config.safari_notification_init){
            if(isMobile()===true){
                setCookie(config.wap_block_cookie, config.wap_block_cookie_value , config.ntfc_block_cookie_expiry, "/", config.wap_domain, false);
            }else{
                setCookie(config.web_block_cookie, config.web_block_cookie_value , config.ntfc_block_cookie_expiry, "/", config.web_domain, false);
            }
            triggerGAEvent(config.ga_category, getAction(config.ga_block_event), getBrowser());
        }
        showBlockMsg();
    } else if (permissionData.permission === 'granted') {
        console.log("The user said yes, with token: "
        + permissionData.deviceToken);
        if(config.safari_notification_init){
            if(isMobile()===true){
                setCookie(config.wap_allow_cookie, config.wap_allow_cookie_value , config.ntfc_allow_cookie_expiry, "/", config.wap_domain, false);
            }else{
                setCookie(config.web_allow_cookie, config.web_allow_cookie_value , config.ntfc_allow_cookie_expiry, "/", config.web_domain, false);
            }
            triggerGAEvent(config.ga_category, getAction(config.ga_allow_event), getBrowser());
        }
        showSafariWelcomeNotification();
        showSubscribeMsg();
    }
}
    