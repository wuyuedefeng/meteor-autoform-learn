Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

Router.route('/', {
    name: 'home'
    //controller: 'HomeController',
    //action: 'action',
    //where: 'client'
});

Router.route('/insertBook', {
    name: 'insertBook'
    //controller: 'HomeController',
    //action: 'action',
    //where: 'client'
});