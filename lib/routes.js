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

Router.route('/insertBook1', {
    name: 'insertBook1'
});
Router.route('/insertBook4', {
    name: 'insertBook4'
});
Router.route('/insertBook5', {
    name: 'insertBook5'
});
Router.route('/insertBook2', {
    name: 'insertBook2'
});
Router.route('/insertBook3', {
    name: 'insertBook3'
});