Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
      message: '안녕하세요 Vue!',
      seen: true,
      todos: [
          {text: 'learn JS'},
          {text: 'learn Vue'},
          {text: 'build something awesome'}
      ],
      groceryList: [
          {id: 0, text: 'Vegetables'},
          {id: 1, text: 'Cheese'},
          {id: 2, text: 'Apple'}
      ]
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
  });

  app.todos.push({text: 'New item'});