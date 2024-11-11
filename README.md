# ClinicApp

ClinicApp es una aplicación web construida con Angular que utiliza Client-Side Rendering (CSR) y consume una API en formato GraphQL. La aplicación está desplegada en AWS usando Amazon S3, CloudFront y GitHub Actions para la integración y despliegue continuo.

## Tecnologías Utilizadas

- **Angular**: Framework de JavaScript para construir aplicaciones de una sola página (SPA).
- **Client-Side Rendering (CSR)**: La aplicación se renderiza en el lado del cliente, ofreciendo una experiencia de usuario dinámica.
- **GraphQL**: Para el consumo de datos, la aplicación usa una API en formato GraphQL.
- **AWS S3**: Almacena y distribuye los archivos estáticos de la aplicación.
- **AWS CloudFront**: Actúa como red de distribución de contenido (CDN) para mejorar la velocidad de carga y la disponibilidad global.
- **GitHub Actions**: Configurado para la automatización de despliegues continuos.

## Despliegue en AWS

La aplicación está configurada para ser desplegada automáticamente en AWS mediante GitHub Actions. Aquí se detalla el flujo de despliegue:

### 1. Almacenamiento en Amazon S3

Los archivos estáticos de Angular (generados al compilar el proyecto) se almacenan en un bucket de S3 configurado para hosting de sitios web estáticos.

### 2. Distribución mediante CloudFront

Se utiliza CloudFront para servir los archivos estáticos desde ubicaciones de caché cercanas al usuario, mejorando así el rendimiento y reduciendo el tiempo de carga de la aplicación. CloudFront está configurado para apuntar al bucket de S3 como origen.

### 3. GitHub Actions para Despliegue Continuo

El flujo de trabajo en GitHub Actions se ejecuta en cada push al repositorio, compilando la aplicación y sincronizando los archivos con el bucket de S3. Esto asegura que cada cambio en el código se despliegue automáticamente.

:
