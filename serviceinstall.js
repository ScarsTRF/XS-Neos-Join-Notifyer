const Service = require('node-windows').Service

const svc = new Service({
    name: 'XSOverlayJoinNotifyer',
    description: 'Neos Join Notifyer for XSOverlay',
    script: '../code.js'
})

svc.on ('install', function(){
    svc.start()
})

svc.install()