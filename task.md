# Jewellery Website Project Assignment

## 1. Project Objective

Develop a complete jewellery website with a clean, modern UI and a fully functional backend system. The platform should display jewellery products and dynamically calculate their prices based on the current gold rate.

## 2. Project Timeline

This project must be completed within 5 to 6 days following the structured timeline below:

### Day 1: Planning & UI Structure

- Understand full project flow
- Define all pages and sections
- Start building homepage layout (header, banner, footer)

### Day 2: Complete Frontend UI

- Build all remaining pages:
  - Product listing
  - Product detail
  - Contact page
- Ensure design consistency and responsiveness

### Day 3: Backend Setup & Database

- Setup backend using Node.js
- Create database structure (products, gold price)
- Build basic APIs

### Day 4: Product Integration

- Connect frontend with backend
- Display products dynamically
- Ensure proper data flow

### Day 5: Dynamic Pricing + Admin Panel

- Implement gold price logic:
  - Price = (gold price × weight) + making charges
- Build admin panel:
  - Update gold price
  - Manage products

### Day 6: Testing & Deployment

- Test complete system
- Fix bugs and edge cases
- Deploy frontend and backend

## 3. Website Pages & Features

### 3.1 Homepage

- Header with navigation
- Hero/banner section
- Categories section
- Featured products
- About section
- Why choose us
- Call-to-action section
- Footer

### 3.2 Product Listing Page

- Grid layout of products
- Each product includes:
  - Image
  - Name
  - Dynamic price
  - Action button

### 3.3 Product Detail Page

- Product images
- Product details (weight, making charges)
- Final calculated price
- Enquiry/contact button

### 3.4 Contact Page

- Contact form (Name, Phone, Message)
- Business details

## 4. Admin Panel Requirements

### 4.1 Gold Price Management

- Input field to update gold price (per gram)
- Save/update functionality

### 4.2 Product Management

- Add product
- Edit product
- Delete product

Each product must include:

- Name
- Weight (grams)
- Making charges
- Image
- Category
- Description

## 5. Database Structure

### Gold Price Table

- `id`
- `price_per_gram`
- `updated_at`

### Products Table

- `id`
- `name`
- `weight`
- `making_charges`
- `image`
- `category`
- `description`

## 6. Core Feature: Dynamic Pricing System

This is the most critical functionality.

**Rule:** Final product price must NOT be stored in the database

**Formula:** Final Price = (Gold Price × Weight) + Making Charges

**Behavior:**

- Updating gold price automatically updates all product prices
- Pricing must be calculated in real-time from backend

## 7. Backend Requirements

Develop APIs for:

- Fetch gold price
- Update gold price
- Fetch products
- Add/edit/delete products

Ensure:

- Proper validation
- Error handling
- Clean structure

## 8. Frontend Integration

- Fetch data from backend APIs
- Display products dynamically
- Show calculated prices
- Maintain reusable component structure

## 9. Development Guidelines

- Do not hardcode values
- Do not store final price in database
- Write clean and readable code
- Follow component-based structure
- Maintain proper folder organization

## 10. Testing Requirements

- Verify price updates when gold price changes
- Test all pages responsiveness
- Validate form inputs
- Check edge cases

## 11. Deployment

- Deploy frontend and backend
- Ensure full functionality in live environment

## 12. Expected Outcome

- Fully functional jewellery website
- Admin panel for managing products and gold price
- Automatic price updates based on gold rate

## Final Note

Focus on accuracy, clean architecture, and correct implementation of dynamic pricing. The system should be scalable and easy to manage.
