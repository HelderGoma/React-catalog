# React Catalog with Cart

Мини-приложение на React для просмотра каталога товаров с корзиной.  

## Функционал

- Каталог товаров с карточками  
- Фильтр по категориям и поиск с debounce  
- Сортировка товаров (по цене и названию)  
- Пагинация (12 товаров на странице)  
- Корзина:
  - Добавление/удаление товаров
  - Изменение количества
  - Подсчет общей стоимости
  - Сохранение в localStorage
- UI/UX:
  - Skeleton loader при загрузке
  - Toast-уведомления
  - Адаптивная верстка (mobile/desktop)
  - Темная тема

## Технологии

- **React**
- **TypeScript**  
- **Redux Toolkit** 
- **CSS Modules**  
- **React Router** 
- **FakeStore API** 
- **Lodash**   
- **Vitest + Testing Library** 


## Установка и запуск

1. Клонируем репозиторий:

```bash
git clone https://github.com/<YOUR_USERNAME>/react-catalog.git
cd react-catalog
```
2. Устанавливаем зависимости:

```bash
npm install
```
3. Запускаем приложение:

```bash
npm run dev
``` 
4. Открываем [http://localhost:5173] в браузере.

5. Запускаем тесты:

```bash
npx vitest
``` 


