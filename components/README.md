# Portfolio Components

This directory contains modular HTML components that can be included in the main portfolio pages.

## How to Use Components

Components can be included in any HTML file using the component system:

```html
<div data-component="./components/component-name.html">
    <!-- Loading indicator will be added automatically -->
</div>
```

## Available Components

- `services.html` - Services section content
- `portfolio-header.html` - Portfolio section header
- `portfolio-filter.html` - Portfolio filter buttons
- `portfolio-grid.html` - Portfolio project grid

## Creating New Components

1. Create a new HTML file in this directory
2. Extract the component content from the main HTML file
3. Add the component to the main file using the data-component attribute

## Component Loading System

The component loading system is handled by `js/components.js` which:

- Finds all elements with `data-component` attribute
- Adds a loading indicator automatically if needed
- Fetches the component HTML from the specified path
- Replaces the element's content with the component HTML
- Dispatches a `componentLoaded` event when the component is loaded

## Benefits of This Component System

- **Better Code Organization**: Separates sections into manageable chunks
- **Reusability**: Components can be used across multiple pages
- **Maintainability**: Changes to components are reflected everywhere they're used
- **Performance**: Components are loaded asynchronously

## Production Use

For production, consider:
- Server-side includes for better performance
- Pre-rendering components at build time
- Using a proper front-end framework if the site grows complex
