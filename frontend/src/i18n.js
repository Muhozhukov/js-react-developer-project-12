import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ru: {
    translation: {
      'Channels title': 'Каналы',
      buttons: {
        close: 'Закрыть',
        send: 'Отправить',
        delete: 'Удалить',
        rename: 'Переименовать',
        enter: 'Войти',
      },
      links: {
        logout: 'Выйти',
        main: 'Hexlet Chat',
      },
      forms: {
        sendMessage: {
          placeholder: 'Введите ообщение...',
        },
        addChannel: {
          title: 'Добавить канал',
          label: 'Имя канала',
          placeholder: 'Введите название канала',
        },
        renameChannel: {
          title: 'Переименовать канал',
          label: 'Имя канала',
          placeholder: 'Введите название канала',
        },
        removeChannel: {
          title: 'Удалить канал',
        },
        login: {
          title: 'Войти',
          name: 'Ваш ник',
          password: 'Пароль',
          loginButton: 'Войти',
          toSignupText: 'Нет аккаунта? ',
          toSignupLink: 'Регистрация',
        },
        signup: {
          title: 'Регистрация',
          name: 'Имя пользователя',
          nameValidationError: 'От 3 до 20 символов',
          passwordValidationError: 'Не менее 6 символов',
          confirmPasswordValidationError: 'Пароли должны совпадать',
          password: 'Пароль',
          repeatPassword: 'Подтвердите пароль',
          signupButton: 'Зарегистрироваться',
        },
      },
      messages: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      alerts: {
        newChannel: 'Канал создан',
        renameChannel: 'Канал переименован',
        removeChannel: 'Канал удалён',
        loginFail: 'Неверные имя пользователя или пароль',
        signupFail: 'Пользователь с таким именем уже существует',
        connectionFailed: 'Ошибка соединения',
      },
    },
  },
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
    },
  },
  fr: {
    translation: {
      'Welcome to React': 'Bienvenue à React et react-i18next',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
