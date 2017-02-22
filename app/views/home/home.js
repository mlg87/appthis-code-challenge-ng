'use strict'

angular.module('ngAppThis.home', ['ngRoute'])

.config(['$routeProvider', ($routeProvider) => {
  $routeProvider.when('/home', {
    templateUrl: '/views/home/home.html',
    controller: 'HomeCtrl'
  })
}])

.controller('HomeCtrl', [
  '$scope',
  '$http',
  '$httpParamSerializer',
  function($scope, $http, $httpParamSerializer) {

  console.log('Initializing Home Controller');

  const getPageOptions = () => {
    // empty string for null option
    const options = []
    let i = 1
    while(i <= 200) {
      options.push({val: i})
      i++
    }
    return options
  }

  $scope.filters = [
    {
      type: 'select',
      name: 'orderBy.key',
      display: 'key',
      options: [
        {
          val: 'name',
          display: 'name'
        },
        {
          val: 'email',
          display: 'email'
        },
        {
          val: 'created',
          display: 'created'
        },
        {
          val: 'balance',
          display: 'balance'
        },
        {
          val: 'address.city',
          display: 'city'
        },
        {
          val: 'address.country',
          display: 'country'
        },
        {
          val: 'address.street',
          display: 'street'
        },
        {
          val: 'address.zip',
          display: 'zip'
        }
      ]
    },
    {
      type: 'radio',
      name: 'orderBy.dir',
      display: 'sort direction',
      options: [
        'asc',
        'desc'
      ]
    },
    {
      type: 'select',
      name: 'page.current',
      display: 'current page',
      options: getPageOptions()
    },
    {
      type: 'select',
      name: 'page.limit',
      display: 'record limit',
      options: getPageOptions()
    }
  ]

  $scope.query = {}
  $scope.records = []
  // events
  $scope.getRequest = () => {
    $http({
      method: 'GET',
      url: `https://appthis-code-challenge-api.herokuapp.com/people`,
      params: $scope.query
    })
    .then(res => {
      $scope.records = res.data.records
    })
    .catch(err => {
      alert('There was an error with the request. :(')
    })
  }

  $scope.formatDate = (d) => {
    const date = new Date(d)
    const day = date.getDay() + 1
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }
}])
