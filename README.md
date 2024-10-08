<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Instalaciones

* instalar dependencias
  ```bash
  $ yarn install
  ```

* Remove pettrier
  ```bash
  $ yarn remove prettier eslint-config-prettier eslint-plugin-prettier
  ```

* Instalar nest config
  ```bash
  $ yarn add @nestjs/config
  ```

* Instalar class validator y class transformer
  ```bash
  $ yarn add class-validator class-transformer
  ```

* Instalar typeorm
  ```bash
  $ yarn add @nestjs/typeorm typeorm
  ```

* Instalar el conector a Sql server
  ```bash
  $ yarn add mssql
  ```
* Instalar mailer para enviar correos
  ```bash
  $ yarn add @nestjs-modules/mailer nodemailer handlebars
  ```

  * Instalar los tipos para enviar correos
  ```bash
  $ yarn add --save-dev @types/nodemailer
  ```
  * Instalar las colas de trabajo
  ```bash
  $ yarn add --save @nestjs/bull bull
  ```
  




## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```



