C.db = (function () {

	var supported = ('localStorage' in window) && ('JSON' in window);

	var localStorageKey = 'html5-clear'

	var db = {

		init: function (force) {

			C.log('DB: init');

			if (supported && !force) {
				var raw = localStorage.getItem(localStorageKey);
				if (raw) {
					this.data = JSON.parse(raw);
					if (!this.data) {
						this.useDefaultData();
					} else {
						 C.log('DB: using stored data.');
					}
				} else {
					this.useDefaultData();
				}
			} else {
				this.useDefaultData();
			}
			
		},

		save: function () {

			var start = Date.now();

			if (!supported) return;
			var raw = JSON.stringify(this.data);
			localStorage.setItem(localStorageKey, raw);

			var used = Date.now() - start;

			C.log('DB: saved in ' + used + 'ms');

		},

		deleteItem: function (target, list) {

			var i = list.items.length,
				item;

			while (i--) {
				item = list.items[i];
				if (item === target) {
					list.items.splice(i, 1);
					C.log('DB: deleted item <' + item.title + '> from collection <' + (list.title || 'Lists')+ '>');
					break;
				}
			}

			C.db.save();

		},

		useDefaultData: function () {

			C.log('DB: using default data.');

			this.data = {

				state: {
					view: C.states.LISTS,
					lastTodoCollection: 0
				},

				items: [
					{

						title: 'Things to do',
						order: 0,
						items: [
							{
								order: 0,
								title: 'Buy some milk'
							},
							{
								order: 1,
								title: 'Walk the dog'
							},
							{
								order: 2,
								title: 'Read Node.js book'
							},
							{
								order: 3,
								title: 'Make a game'
							},
							{
								order: 4,
								title: 'Make a CMS'
							},
							{
								order: 5,
								title: 'Wanna fork?'
							},
							{
								order: 6,
								title: 'Fork me yo'
							},
							{
								order: 7,
								title: 'Yeah'
							},
							{
								order: 8,
								title: 'I\'ve run out of stuff'
							},
							{
								order: 9,
								title: 'OK Test'
							},
							{
								order: 10,
								title: 'Moar test'
							},
							{
								order: 11,
								title: 'Moar test'
							},
							{
								order: 12,
								title: 'Moar test'
							},
							{
								order: 13,
								title: 'Moar test'
							}
						]
					},
					{
						title: 'This is a demo',
						order: 1,
						items: [
							{
								order: 0,
								title: 'Test'
							},
							{
								order: 1,
								title: 'Test'
							},
							{
								order: 2,
								title: 'Test'
							}
						]
					},
					{
						title: 'By Evan You',
						order: 2,
						items: [
							{
								order: 0,
								title: 'Test'
							}
						]
					},
					{
						title: 'Test',
						order: 3,
						items: [
							{
								order: 0,
								title: 'Test'
							}
						]
					},
					{
						title: 'Test',
						order: 4,
						items: [
							{
								order: 0,
								title: 'Test'
							}
						]
					},
					{
						title: 'Test',
						order: 5,
						items: []
					},
					{
						title: 'Test',
						order: 6,
						items: []
					},
					{
						title: 'Test',
						order: 7,
						items: []
					},
					{
						title: 'Test',
						order: 8,
						items: []
					},{
						title: 'Test',
						order: 9,
						items: []
					},{
						title: 'Test',
						order: 10,
						items: [
							{
								order: 0,
								title: 'Test'
							}
						]
					}
				]

			};

			this.save();

		}

	};

	return db;

}());