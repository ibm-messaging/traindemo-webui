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

// Read specified config file, or defaultConfig.js if none specified
var configFileName = (process.env.CONFIG_FILE_NAME || 'defaultConfig.js');
var configFilePath = "./config/" + configFileName;
console.log("Reading config file " + configFilePath);
var config = require(configFilePath);
console.log("config: " + JSON.stringify(config));

app.get('/', function(req, res){
	res.render('index',
                   {
                       'mapCenterLat': config.mapCenterLat,
                       'mapCenterLon': config.mapCenterLon,
                       'BaseMap': config.BaseMap,
                       'mapZoom': config.mapZoom,
                       'useSSL': req.query.useSSL || config.useSSL ,
                       'mqttServer': config.mqttServer,
                       'mqttPort': req.query.mqttPort || config.mqttPort});
});

var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

app.listen(port, host);
console.log('App started on port ' + port);
