angular.module("app", ["templates"])
  .directive("app", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/app.tpl.html",
    };
  })
  .directive("contentView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/content-view.tpl.html",
      controller: ["$scope", "$element","Tags", contentViewCtrl],
    };
    function contentViewCtrl($scope, $element, Tags) {
      $scope.showDateFlag = true
      $scope.items = Tags.items
      $scope.orderField = "title"
      $scope.selectedItem = ()=>Tags.current
      
      $scope.setCurrentItem = (el)=>{
        Tags.setCurrent(el)
      }
      $scope.newTitle = '';
      $scope.addTitle = ()=>{
        Tags.create($scope.newTitle)
        $scope.newTitle = ''
      }
      $scope.orderComparator = (a,b)=>{
        if($scope.orderField === "title"){
          return a>b
        }
        return Date.parse(a)>Date.parse(b)
      }
    }
  })
  .directive("sidebarView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/sidebar-view.tpl.html",controller: ["$scope", "$element","Tags", sidebarViewCtrl],
    };
    function sidebarViewCtrl($scope, $element, Tags) {
      
      $scope.newTag = ''
      $scope.addTag = (item,index)=>{
        Tags.current.tags.push($scope.newTag)
        $scope.newTag = ''
      }
      $scope.delTag = (item,index)=>{
        Tags.current.tags.splice(index,1)
      }
      $scope.selectedItem = ()=>Tags.current
    }
  })
  .directive("elementsView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/elements-view.tpl.html",
      controller: ["$scope", "$element","Tags", elementsViewCtrl],
    };
    function elementsViewCtrl($scope, $element, Tags) {
      $scope.model = {
        width: 300,
      };
      $scope.setWidth = () => {
        let width = $scope.model.width;
        if (!width) {
          width = 1;
          $scope.model.width = width;
        }
        $element.css("width", `${width}px`);
      };
      $scope.setWidth();
      console.log(Tags)
    }
  })
  .directive("some1", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-2></some-2>",
    };
  })
  .directive("some2", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-3></some-3>",
    };
  })
  .directive("some3", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<summary-view></summary-view>",
    };
  })
  .directive("summaryView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/summary-view.tpl.html", controller: ["$scope", "$element","Tags", summaryViewCtrl],
    };
    function summaryViewCtrl($scope, $element, Tags) {
      $scope.items = ()=>Tags.items
      $scope.lastItem = ()=>{
        const a = [...$scope.items()];
        a.sort((e,e1)=>Date.parse(e.date)>Date.parse(e1.date))
        return a.length?a[a.length-1]:null
      }
      
      $scope.uniqueTags = ()=>$scope.items().flatMap(el=>el.tags).filter((value, index, self) =>self.indexOf(value) === index).join(',')
      
      
    }
  
  });

