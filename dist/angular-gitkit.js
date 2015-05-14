/**
 * angular-gitkit - An AngularJS module to integrate with Google Identity Toolkit (GITkit)
 * @version v0.0.1
 * @link https://github.com/krico/angular-gitkit
 * @license MIT
 * @author Christian Asmussen
 */
(function (angular) {
    'use strict';
    angular.module('ngGITkit', []);
})(angular);
(function (angular) {
    'use strict';
    angular.module('ngGITkit').provider('GITKit', GITKitProvider);

    function GITKitProvider() {
        this.$get = GITKit;

        function GITKit($window) {
            var GITKit = {};

            return GITKit;
        }
    }
})(angular);