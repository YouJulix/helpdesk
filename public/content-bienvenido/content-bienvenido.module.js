angular.module('contentBienvenido', [
	'ngRoute',
	'ngSanitize', //Module Angular for are going to use 'ng-bind-html = " --- " ' 	: 	The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are then serialized back to properly escaped html string. 
	'chat'
	]);
