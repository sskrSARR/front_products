# Angular Project Setup Instructions

This is an Angular frontend application designed to consume a Spring Boot REST API for managing products.

## Project Overview
- **Framework**: Angular 17.3.0
- **Language**: TypeScript
- **Build Tool**: Angular CLI
- **Node Version Required**: 18.x or higher
- **Purpose**: Frontend for Spring Boot Product API

## Key Scripts
- `npm start` - Start development server (http://localhost:4200)
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `ng generate component <name>` - Generate new components

## Project Structure
- `src/` - Source code
  - `app/components/` - Angular components
  - `app/services/` - API services
  - `app/models/` - TypeScript interfaces
  - `app/app.routes.ts` - Application routing
- `src/assets/` - Static assets
- `angular.json` - Angular configuration
- `tsconfig.json` - TypeScript configuration

## Important Configuration

### API Endpoint
Update the API URL in [src/app/services/product.service.ts](src/app/services/product.service.ts#L11):
```typescript
private apiUrl = 'http://localhost:8080/api/products';
```

### CORS Setup
Your Spring Boot API must have CORS enabled for `http://localhost:4200`:
```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/products")
public class ProductController { ... }
```

## Product Component Features
- View all products in a table
- Add new products with a modal form
- Edit existing products
- Delete products
- Error handling and loading states

## Development Workflow
1. Ensure Spring Boot API is running on port 8080
2. Run `npm start` to launch the Angular dev server
3. Navigate to http://localhost:4200
4. Make changes to components (hot reload enabled)
5. Build with `npm run build` for production

## API Contract
The application communicates with these endpoints:
- GET /api/products - List all products
- GET /api/products/{id} - Get product details
- POST /api/products - Create product
- PUT /api/products/{id} - Update product
- DELETE /api/products/{id} - Delete product

