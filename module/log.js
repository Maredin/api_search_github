export class LOG {
    constructor() {
    }

    // Сообщение с числом пользователей
    counterMessage(usersCount) {
        return (usersCount > 0) ? `Найдено ${usersCount} репозитория по теме` : 'По вашему запросу пользователей не найдено';
    }
}
