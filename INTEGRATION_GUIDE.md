# Angular Frontend - Spring Boot API Integration

## Quick Start

### Prerequisites
- Angular dev server running: `npm start`
- Spring Boot API running on `http://localhost:8080`

### Development

1. **Start the Angular dev server**
   ```bash
   npm start
   ```
   App will be available at `http://localhost:4200`

2. **Ensure your Spring Boot API is configured with CORS**
   ```java
   @Configuration
   public class CorsConfig {
       @Bean
       public WebMvcConfigurer corsConfigurer() {
           return new WebMvcConfigurer() {
               @Override
               public void addCorsMappings(CorsRegistry registry) {
                   registry.addMapping("/api/**")
                       .allowedOrigins("http://localhost:4200")
                       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                       .allowedHeaders("*")
                       .allowCredentials(false)
                       .maxAge(3600);
               }
           };
       }
   }
   ```

## Project Architecture

### Services
- **ProductService** ([src/app/services/product.service.ts](src/app/services/product.service.ts))
  - Handles all HTTP communication with the backend
  - CRUD operations for products
  - Error handling and observables

### Components
- **ProductComponent** ([src/app/components/product/product.component.ts](src/app/components/product/product.component.ts))
  - Displays product list in table
  - Modal form for create/update
  - Delete confirmation dialog

### Models
- **Product** ([src/app/models/product.model.ts](src/app/models/product.model.ts))
  - TypeScript interface matching backend model

## API Contract

### Request/Response Format

**Product Object:**
```json
{
  "id": 1,
  "designation": "Product Name",
  "price": 99.99,
  "quantity": 10,
  "reference": "REF-001"
}
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

## Common Issues and Solutions

### CORS Error: "Access to XMLHttpRequest blocked"
**Solution**: Ensure your Spring Boot API has CORS enabled for origin `http://localhost:4200`

### 404 Error on API calls
**Solution**: Verify the API URL in `ProductService.apiUrl` matches your backend address

### Port Already in Use
**Solution**: 
- Angular: Change port with `ng serve --port 4300`
- Spring: Change port in `application.properties`: `server.port=8081`

## Production Build

```bash
npm run build
```

The build artifacts will be generated in the `dist/` directory and ready to be deployed.

## Debugging

### Enable CORS Logging
Add to your Spring Boot application:
```java
@Configuration
public class LoggingConfig {
    private static final Logger logger = LoggerFactory.getLogger(LoggingConfig.class);
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                   .allowedOrigins("http://localhost:4200")
                   .allowedMethods("*")
                   .allowedHeaders("*")
                   .allowCredentials(false);
                logger.info("CORS configured for http://localhost:4200");
            }
        };
    }
}
```

### Check Network Requests
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Look for API calls to `localhost:8080/api/products`
4. Check response status and data
