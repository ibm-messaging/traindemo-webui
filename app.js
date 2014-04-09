/******************************************************************************
 * Copyright (c) 2014 IBM Corporation and other Contributors.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html 
 ******************************************************************************/

var express = require('express');

var app = express();
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var mapCenterLat = (process.env.mapCenterLat || 50.992717);
var mapCenterLon = (process.env.mapCenterLon || -1.493298);
var mapZoom = (process.env.mapZoom || 10);
var BaseMap = String(process.env.BaseMap || 'topo');
var mqttServer = String(process.env.mqttServer || '192.168.56.12');
var mqttPort = (process.env.mqttPort || 1883);

app.get('/', function(req, res){
	res.render('index',
                   {
                       'mapCenterLat': mapCenterLat,
                       'mapCenterLon': mapCenterLon,
                       'BaseMap': BaseMap,
                       'mapZoom': mapZoom,
                       'mqttServer': mqttServer,
                       'mqttPort': mqttPort});
});

var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

app.listen(port, host);
console.log('App started on port ' + port);
