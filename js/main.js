var app = angular.module('myApp', []);

app.filter('unique', function() {
    return function(collection, keyname) {
        var output = [], 
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});

app.filter('selectedCategories', function() {
    return function(names, selected) {
        if (names) {
            return names.filter(function(name) {
    
                for (var i in name.Wissenschaftskategorie) {
                    if (selected.indexOf(name.Wissenschaftskategorie[i]) != -1) {
                        return true;
                    }
                }
                return false;
    
            });
        }
        return false;
    };
});

app.controller('blogCtrl', function($scope) {

    var oBtn = $('#myBtn');

    function readJSON() {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var oJson = JSON.parse(this.responseText);
                $scope.names = oJson;
                $scope.$apply();
                
            }
        };

        request.open('GET', 'js/literature.json', true);
        request.send();
        
        if (request.status === 200) {
            return JSON.parse(request.responseText);
        }
    }

    function filterChange() {
        for (var category in $scope.categories) {
            if ($scope.categories[category]) {
                if ($scope.selected.indexOf(category) < 0) {
                    $scope.selected.push(category);
                }
            } else {
                if ($scope.selected.indexOf(category) > -1) {
                    var index = $scope.selected.indexOf(category);
                    $scope.selected = $scope.selected.slice(index, 0);
                }
            }
        }
    }

    function filterFn(x){
        // Show all entries if none category is selected
        if ($scope.selected.length == 0) {
            return true;
        } else {
            return $scope.selected.indexOf(x.Wissenschaftskategorie) > -1;
        }
    }
    
    $scope.names = readJSON();
    $scope.categories = {};
    $scope.selected = [];
    $scope.filterChange = filterChange;
    $scope.filterFn = filterFn;
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

$(document).ready(function() {
    $('#myBtn').click(function(){
        $('html,body').scrollTop(0);
    });
});