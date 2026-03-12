# AngularForJava - Frontend

This is an Angular 17 frontend application designed to consume a Spring Boot REST API for managing products.

## Prerequisites

- Node.js 18.x or higher
- Angular CLI 17.x
- A Spring Boot backend API running on `http://localhost:8080`

## Environnements

Configuration des endpoints et des settings selon l'environnement (dev/production) est gérée via les fichiers `src/environments/environment.ts` et `environment.prod.ts`. Lors du build, Angular remplace automatiquement selon `fileReplacements` dans `angular.json`.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── product/          # Product management component
│   ├── models/
│   │   └── product.model.ts  # Product interface
│   ├── services/
│   │   └── product.service.ts # API communication service
│   ├── app.component.*       # Root component
│   ├── app.config.ts         # App configuration with HttpClient
│   └── app.routes.ts         # Application routes
```

## Setup and Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL**
   - Edit [src/app/services/product.service.ts](src/app/services/product.service.ts#L11)
   - Update the `apiUrl` to match your Spring Boot API endpoint
   - Default: `http://localhost:8080/api/products`

## Development Server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Features

- **Product List**: View all products from the API
- **Create Product**: Add new products via form
- **Update Product**: Edit existing product details
- **Delete Product**: Remove products from the database
- **Error Handling**: Display user-friendly error messages
- **Loading State**: Show loading indicator during API calls

## API Endpoints Used

The application expects the following REST API endpoints from your Spring Boot backend:

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Product Model

```typescript
interface Product {
  id: number;
  designation: string;
  price: number;
  quantity: number;
  reference: string;
}
```

## CORS Configuration

Make sure your Spring Boot API has CORS enabled for requests from `http://localhost:4200`:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    // ...
}
```

Or globally in your Spring configuration.

## Running Tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Documentation](https://angular.dev/cli).

