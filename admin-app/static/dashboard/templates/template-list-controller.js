(function() {

/**
 *
 * @type {*}
 */
var adminApp = angular.module('adminApp');
adminApp.controller("TemplateListController", function($scope, $rootScope, $routeParams, $location, templateService) {

    $rootScope.pageTitle = "Templates";

    $scope.templates = [];

    templateService.getTemplates().success(function(templates) {
        $scope.templates = templates;
    }).error(function(err) {
        $rootScope.showError("Error getting templates", err);
    });

});

})();