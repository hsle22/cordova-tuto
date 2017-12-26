// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    //var homeTpl = Handlebars.compile($("#home-tpl").html());
    //var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    /*
    service.initialize().done(function () {
        console.log("Service initialized");
        renderHomeView();
    });*/
    service.initialize().done(function () {
        router.addRoute('', function(){
            $('body').html(new HomeView(service).render().$el);
        })
        router.addRoute('employees/:id', function(id){
            //console.log('id -->', id);
            //console.log('parse id-->', Number.parseInt(id));

            service.findById(parseInt(id)).done(function(employee){
                $('body').html( new EmployeeView(employee).render().$el)
            })
        })
        router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */
   // $('.search-key').on('keyup', findByName);
    $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });

    document.addEventListener('deviceready', function () {
       // FastClick.attach(document.body);
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();


        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                    navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
              );
            };
        }
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    /*function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i = 0; i < l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    }*/

    /*
    function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            $('.content').html(employeeListTpl(employees));
        });
    }*/

    /*
    function renderHomeView() {
        var html =
          "<h1>Directory</h1>" +
          "<input class='search-key' type='search' placeholder='Enter name'/>" +
          "<ul class='employee-list'></ul>";

        $('body').html(html);
        $('.search-key').on('keyup', findByName);
    }*/

    /*
    function renderHomeView() {
        $('body').html(homeTpl());
        $('.search-key').on('keyup', findByName);
    }*/

}());