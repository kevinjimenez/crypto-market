<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <h1 align="center">API de Criptomonedas</h1>
</p>

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-14.x+-339933?style=flat-square&logo=node.js" alt="Node.js Version" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core/latest.svg?style=flat-square" alt="NestJS Version" />
  </a>
  <a href="https://github.com/nestjs/nest/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg?style=flat-square" alt="License" />
  </a>
</p>

## Descripción

API RESTful construida con NestJS para obtener información en tiempo real sobre criptomonedas. Esta API proporciona datos actualizados de precios, volúmenes y estadísticas del mercado de criptomonedas.

## Demo en Vivo

Puedes probar la API en producción aquí: [https://crypto-market-6dn5.onrender.com](https://crypto-market-6dn5.onrender.com)

### Estado del Servidor

Si el servidor está inactivo (en estado sleep), la primera solicitud puede tardar unos segundos en responder mientras se reactiva. Puedes verificar el estado del servidor en el siguiente endpoint:

```
GET /health
```

Este endpoint devolverá el estado actual del servidor y sus dependencias.

## Características

- Obtener listado de criptomonedas con información actualizada
- Consultar detalles específicos de cada criptomoneda
- Estadísticas del mercado en tiempo real
- Filtrado y ordenamiento de resultados
- Documentación de la API disponible en `/api`

## Instalación

```bash
# Clonar el repositorio
$ git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
$ npm install

# Configurar variables de entorno
$ cp .env.example .env
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
# Agrega aquí tus claves de API si son necesarias
```

## Ejecución

```bash
# Modo desarrollo
$ npm run start:dev

# Modo producción
$ npm run build
$ npm run start:prod
```

## Documentación de la API

La documentación interactiva de la API está disponible en:
- `/api` - Documentación Swagger
- `/graphql` - Playground de GraphQL (si está habilitado)

## Pruebas

```bash
# Ejecutar pruebas unitarias
$ npm run test

# Ejecutar pruebas e2e
$ npm run test:e2e

# Ver cobertura de pruebas
$ npm run test:cov
```

## Contribución

Las contribuciones son bienvenidas. Por favor, lee las [guías de contribución](CONTRIBUTING.md) para más detalles.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---
With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
