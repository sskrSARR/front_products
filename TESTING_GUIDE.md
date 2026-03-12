# Testing the Angular Frontend

## Prerequisites

Before running the tests, ensure:
- Node.js 18+ is installed
- Spring Boot API is running on `http://localhost:8080`
- The API has CORS enabled for `http://localhost:4200`

## Running the Development Server

```bash
npm start
```

This will:
- Start the Angular dev server on `http://localhost:4200`
- Enable hot reloading for any source code changes
- Show compilation errors in the browser console

## Testing the Application

### 1. View Products
1. Navigate to `http://localhost:4200`
2. You should see a list of products from your Spring Boot API
3. If you see "Chargement des produits..." it's loading
4. If you see "Aucun produit trouvé" the API returned an empty list (this is normal for a new database)

### 2. Create a Product
1. Click "+ Ajouter un produit"
2. Fill in the form:
   - **Désignation**: Product name (e.g., "Laptop")
   - **Prix**: Price as decimal (e.g., 999.99)
   - **Quantité**: Quantity as integer (e.g., 5)
   - **Référence**: Reference code (e.g., "LAP-001")
3. Click "Enregistrer"
4. The product should appear in the table

### 3. Update a Product
1. Find a product in the table
2. Click "Modifier"
3. Update the fields
4. Click "Enregistrer"
5. Changes should be reflected in the table

### 4. Delete a Product
1. Find a product in the table
2. Click "Supprimer"
3. Confirm the deletion dialog
4. Product should be removed from the table

## Troubleshooting

### API Connection Issues

**Error: "Erreur lors du chargement des produits"**
- Check if Spring Boot API is running on `http://localhost:8080`
- Open browser Console (F12) to see detailed error
- Look for CORS errors in the network tab
- Verify API endpoint: `GET http://localhost:8080/api/products`

**Error: "Http failure response for http://localhost:8080/api/products: 0 Unknown Error"**
- This usually means the API is not running
- Start your Spring Boot application first
- Then refresh the Angular app in your browser

### CORS Errors

If you see CORS errors in the browser console:
- Ensure your Spring Boot application has CORS configuration
- The `@CrossOrigin(origins = "http://localhost:4200")` annotation must be present
- Or use a global CORS configuration in your Spring Boot app

### Port Conflicts

If port 4200 is already in use:
```bash
ng serve --port 4300
# or
ng serve --port 4200 --csr
```

If port 8080 is already in use:
- Update `private apiUrl = 'http://localhost:YOUR_PORT/api/products'` in `ProductService`

## Expected API Responses

### GET /api/products (Success)
```json
[
  {
    "id": 1,
    "designation": "Sample Product",
    "price": 99.99,
    "quantity": 10,
    "reference": "REF-001"
  }
]
```

### POST /api/products (Success)
```json
{
  "id": 2,
  "designation": "New Product",
  "price": 49.99,
  "quantity": 5,
  "reference": "REF-002"
}
```

### Error Response (400 Bad Request)
```json
{
  "timestamp": "2024-03-12T...",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input"
}
```

## Build for Production

```bash
npm run build
```

This creates:
- Optimized production build in `dist/angularforjava/`
- Ready to deploy to a web server (Apache, Nginx, etc.)
- Can be served as static files with your Spring Boot app

## Browser DevTools

Open Developer Tools (F12) and check:

**Console Tab**
- Look for API errors or TypeScript errors
- Check network requests

**Network Tab**
- Monitor HTTP requests to `/api/products`
- Check response status codes and data
- Verify CORS headers in request/response

**Application Tab**
- Check LocalStorage if needed
- Verify cookies (if authentication is added later)

## Performance Tips

1. Build for production: `npm run build`
2. Enable gzip compression on your server
3. Use a CDN for static assets
4. Implement lazy loading for larger components
5. Monitor bundle size: `npm run analyze` (if configured)
