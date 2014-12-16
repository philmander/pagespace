(function() {

/**
 *
 * @type {*}
 */
var adminApp = angular.module('adminApp');
adminApp.controller('PublishingController', function($scope, $rootScope, $routeParams, $window, $location, publishingService) {
    $rootScope.pageTitle = 'Publishing';

    //get all pages with drafts
    publishingService.getDrafts().success(function(drafts) {
        $scope.drafts = drafts;
    }).error(function(err) {
        $rootScope.showError('Error getting drafts to publish', err);
    });

    $scope.cancel = function() {
        $location.path('/');
    };

    $scope.publish = function() {
        var toPublishIds = $scope.drafts.filter(function(page) {
            return page.queued;
        }).map(function(page) {
            return page._id;
        });

        if(toPublishIds.length === 0) {
            $window.scrollTo(0,0);
            $scope.submitted = true;
            return;
        }

        publishingService.publish(toPublishIds).success(function() {
            $rootScope.showSuccess('Publishing successful');
            $location.path('/');
        }).error(function(err) {
            $rootScope.showError('Error performing publish', err);
        });
    };
});

})();