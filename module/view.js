export class VIEW {
    constructor(api) {
        this.api = api;

        this.app = document.getElementById('app');

        // Заголовок
        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Github Search repositories';

        // Основной блок
        this.mainContent = this.createElement('div', 'main');

        // Список пользователей
        this.usersListWrapper = this.createElement('div', 'users-wrapper');
        this.usersList = this.createElement('ul', 'users');
        this.usersListWrapper.append(this.usersList);

        // Поле поиска
        this.searchLine = this.createElement('form', 'search-line');
        this.searchInput = this.createElement('input', 'search-input');
        this.usersCounter = this.createElement('span', 'counter');
        this.usersError = this.createElement('span', 'error');
        this.searchBtn = this.createElement('button', 'search-btn');
        this.searchBtn.textContent = 'Поиск';
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchBtn);
        this.searchLine.append(this.usersCounter);
        this.searchLine.append(this.usersError);

        // Кнопка "Загрузить еще"
        this.loadMore = this.createElement('button', 'btn');
        this.loadMore.textContent = 'Загрузить еще';
        this.loadMore.style.display = 'none';
        this.usersListWrapper.append(this.loadMore);

        //Добавление всех блоков в приложение
        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.mainContent.append(this.usersListWrapper);
        this.app.append(this.mainContent);
    }

    // Функция для создания элемента
    createElement(elementName, className) {
        const element = document.createElement(elementName);
        if (className) {
            element.classList.add(className)
        }
        return element;
    }

    // Создаем каждого найденного пользователя
    createUser(userData) {
        const user = this.createElement('li', 'user-prev');
        user.innerHTML = `<img class="user-prev-photo" src="${userData.owner.avatar_url}" alt="${userData.owner.login}"><span class="user-prev-name">${userData.owner.login}</span>
        <a href="${userData.owner.html_url}" target="_blank" class="search-link">${userData.owner.html_url}</a>`;
        this.usersList.append(user);
    }


    // Очистка найденных пользователей
    clearUsers() {
        this.usersList.innerHTML = '';
    }

    // Устанавливаем сообщение о количестве найденных пользователей
    setUserCounter(message) {
        this.usersCounter.textContent = message
    }

    //Показываем или скрываем кнопку "Загрузить еще"
    toggleStateLoadMoreButton(show) {
        this.loadMore.style.display = show ? 'block' : 'none';
    }
}
