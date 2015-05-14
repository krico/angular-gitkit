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