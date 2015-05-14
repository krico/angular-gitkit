(function (angular) {
    'use strict';
    angular.module('ngGITkit').provider('GITKit', GITKitProvider);

    function GITKitProvider() {
        this.$get = GITKitService;
        function GITKitService($window) {
            var GITKit = {};
            GITKit.yes = true;
            return GITKit;
        }
    }
})(angular);
