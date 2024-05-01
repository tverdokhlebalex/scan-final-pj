{RU}
«СКАН» - сервис поиска публикаций о компаниях по ИНН. Сервис предназначен для менеджеров по PR, коммуникациям и специалистов по рискам и безопасности. Решает широкий спектр задач, связанных с медиааналитикой.

Компания «СКАН» помогает бизнесу формировать репутацию в интернете. Она предоставляет возможности не только мониторить СМИ и коммуницировать с журналистами, но и проверять своих контрагентов.

Что бы запустить проект нужно:
    1.Выполнить команду npm install (должны установиться все зависимости)
    2.Выполнить npm start (проект должен запуститься без ошибок)

Для авторизации можно использовать пользователя
    логин: sf_student1 | пароль - 4i2385j

Для теста используйте следующие ИНН: 7706074737 или 7710416415

Для проверки http запросов используем postman 
для проверки авторизации: POST запросе  https://gateway.scan-interfax.ru/api/v1/account/login  
        В body - key: {login  password}  value: {соответсвующие параметры}, далее получаем токен авторизации!

для проверки токена авторизации: в GET запросе https://gateway.scan-interfax.ru/api/v1/account/info выставляем авторизацию по токену Bearer! и получаем ответ! 

{EN}
"SCAN" is a service for searching publications about companies by TIN (Taxpayer Identification Number). The service is designed for PR managers, communications specialists, and risk and security professionals. It addresses a wide range of tasks related to media analytics.

The "SCAN" company helps businesses shape their online reputation. It provides opportunities not only to monitor the media and communicate with journalists but also to check counterparties.

To launch the project, follow these steps:

Execute the command npm install (all dependencies should be installed).
Execute npm start (the project should start without errors).
For authorization, you can use the following login credentials: username - sf_student1 | password - 4i2385j.

For testing purposes, use the following TIN (Taxpayer Identification Numbers): 7706074737 or 7710416415.
                   
