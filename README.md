📖 Access Control System

Простая система управления доступом на React, реализующая:
Авторизацию по hardcoded логину и паролю (admin / 1234)
Просмотр списка пользователей
Изменение имени, роли и уровня доступа пользователей
Подтверждение изменений с валидацией
Удаление пользователей
Логирование всех изменений с отметкой времени
Интерфейс на Material UI
State-менеджмент через Redux Toolkit

📦 Установка и запуск

npm install
npm run dev
Приложение будет доступно по адресу http://localhost:5173

📂 Структура проекта

src/
├── app/                // Redux store
├── components/         // UI-компоненты
├── features/           // Redux slices
├── types/              // Типы TypeScript
├── App.tsx             // Точка входа приложения
└── main.tsx            // Инициализация React

📌 Логин для входа
Логин: admin
Пароль: 1234

🛠️ Технологии
React + TypeScript
Redux Toolkit
Material UI
DOMPurify (для безопасной обработки ввода)
Vite