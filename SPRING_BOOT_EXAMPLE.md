# Spring Boot Backend Configuration Example

This file shows example Spring Boot code for the backend API that this Angular frontend consumes.

## Spring Boot Model (Entity)

```java
package com.example.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "designation", length = 255)
    private String designation;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "quantity")
    private Integer quantity;
    
    @Column(name = "reference", length = 255)
    private String reference;
    
    // Constructors
    public Product() {}
    
    public Product(String designation, Double price, Integer quantity, String reference) {
        this.designation = designation;
        this.price = price;
        this.quantity = quantity;
        this.reference = reference;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public String getReference() { return reference; }
    public void setReference(String reference) { this.reference = reference; }
}
```

## Spring Boot Repository

```java
package com.example.api.repositories;

import com.example.api.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

## Spring Boot Controller

```java
package com.example.api.controllers;

import com.example.api.models.Product;
import com.example.api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    // GET all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    // GET product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // POST create new product
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if (product.getDesignation() == null || product.getPrice() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Product savedProduct = productRepository.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
    
    // PUT update product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Optional<Product> productOpt = productRepository.findById(id);
        
        if (!productOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Product product = productOpt.get();
        
        if (productDetails.getDesignation() != null) {
            product.setDesignation(productDetails.getDesignation());
        }
        if (productDetails.getPrice() != null) {
            product.setPrice(productDetails.getPrice());
        }
        if (productDetails.getQuantity() != null) {
            product.setQuantity(productDetails.getQuantity());
        }
        if (productDetails.getReference() != null) {
            product.setReference(productDetails.getReference());
        }
        
        Product updatedProduct = productRepository.save(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    
    // DELETE product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        
        if (!product.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        productRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
```

## Spring Boot Application Properties

```properties
# application.properties

# Server Configuration
server.port=8080
server.servlet.context-path=/

# Database Configuration (MySQL Example)
spring.datasource.url=jdbc:mysql://localhost:3306/productdb
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.example.api=DEBUG
```

## Maven Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    
    <!-- Spring Boot DevTools -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
    
    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## Running the Backend

1. **Create the database**
   ```sql
   CREATE DATABASE productdb;
   ```

2. **Update application.properties** with your database credentials

3. **Run the Spring Boot application**
   ```bash
   mvn spring-boot:run
   ```

4. **Verify it's running**
   ```bash
   curl http://localhost:8080/api/products
   ```

## CORS Configuration Alternative (Global)

If you prefer global CORS configuration instead of @CrossOrigin:

```java
package com.example.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(false)
            .maxAge(3600);
    }
}
```

## Testing the API

### Using cURL

```bash
# Get all products
curl http://localhost:8080/api/products

# Get product by ID
curl http://localhost:8080/api/products/1

# Create product
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"designation":"Test Product","price":99.99,"quantity":5,"reference":"TEST-001"}'

# Update product
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"designation":"Updated Product","price":149.99,"quantity":10,"reference":"TEST-002"}'

# Delete product
curl -X DELETE http://localhost:8080/api/products/1
```

### Using Postman

1. Create a new collection "Product API"
2. Create requests for each endpoint (GET, POST, PUT, DELETE)
3. Set the request body for POST/PUT as JSON:
   ```json
   {
     "designation": "Test Product",
     "price": 99.99,
     "quantity": 5,
     "reference": "TEST-001"
   }
   ```

## Troubleshooting

### CORS Issues
- Ensure `@CrossOrigin` is present on controller
- Check that the origin matches exactly: `http://localhost:4200`

### Port Already in Use
```bash
# Find and kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Database Connection Issues
- Verify MySQL is running
- Check credentials in application.properties
- Ensure database exists: `CREATE DATABASE productdb;`

This setup provides a complete backend API that works seamlessly with the Angular frontend.
