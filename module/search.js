export class Search {

    // Получаем текущую страницу поиска
    get currentPageNumber() {
        return this.currentPage;
    }

    // Устанавливаем текущую страницу поиска
    setCurrentPageValue(pageNumber) {
        this.currentPage = pageNumber;
    }

    constructor(log, api, view) {
        this.log = log;
        this.api = api;
        this.view = view;

        this.view.searchLine.addEventListener('submit', () => {
            this.view.clearUsers();
            this.view.setUserCounter('');
        });
        this.view.searchLine.onsubmit = this.loadMoreUsers.bind(this);

        this.view.loadMore.addEventListener('click', this.loadMoreUsers.bind(this));
        this.currentPage = 1;
    }


    // Подгружаем пользователей при нажатии на кнопку "Загрузить еще"
    loadMoreUsers(event) {
        event.preventDefault();
        this.setCurrentPageValue(this.currentPage + 1);
        this.api.loadUsers(this.view.searchInput.value, this.currentPageNumber).then(response => this.updateUsers(response, true))
    }

    // Обновляем текущее состояние пользователей
    updateUsers(response, isUpdate = false) {
        let users;
        let usersCount;
        if (response.ok) {
            this.view.usersError.textContent = '';
            if (!isUpdate) {
                // Если новый поиск а не подгрузка, то очищаем ранее найденных пользователей
                this.view.clearUsers();
            }
            response.json().then((res) => {
                if (res.items) {
                    users = res.items;
                    usersCount = res.total_count;
                    this.view.toggleStateLoadMoreButton(usersCount > 10 && users.length * this.currentPageNumber !== usersCount);
                    users.forEach(user => this.view.createUser(user));
                } else {
                    this.view.clearUsers();
                }
                this.view.setUserCounter(this.log.counterMessage(usersCount));
            });
        } else {
            console.log(response.status);
            if(response.status == '422') {
                this.view.usersError.textContent = 'Ошибка. Поле ввода пустое!';
                this.view.loadMore.style.display = 'none';
            }
        }
    }

}
