const Service = require('node-windows').Service

const svc = new Service({
    name: 'XSOverlayJoinNotifyer',
    description: 'Neos Join Notifyer for XSOverlay',
    script: '../code.js'
})

svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
});
svc.uninstall();