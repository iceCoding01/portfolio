# Tailwind CSS Migration Examples

## How to Gradually Replace Your Existing CSS with Tailwind

### 1. Navigation Links
#### Before (Your current CSS):
```css
.nav-link {
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.65rem 0.7rem;
  border-radius: 1.4rem;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
```

#### After (Tailwind equivalent):
```html
<a href="#about" class="text-white/95 no-underline text-base font-semibold px-3 py-2 rounded-xl transition-all duration-300 ease-out hover:bg-white/20 hover:text-white hover:-translate-y-1">
  <i class='bx bx-user'></i>
  <span>About</span>
</a>
```

### 2. Glass Morphism Cards
#### Before (CSS):
```css
.service-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.2rem;
  padding: 2rem;
  transition: all 0.3s ease;
}
```

#### After (Tailwind):
```html
<div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-xl p-8 transition-all duration-300 hover:bg-white/15 hover:-translate-y-2">
  <!-- Card content -->
</div>
```

### 3. Buttons
#### Before (CSS):
```css
.btn-primary {
  background: linear-gradient(135deg, #0a174e, #0066cc);
  color: white;
  padding: 1.4rem 2.8rem;
  border-radius: 2rem;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
}
```

#### After (Tailwind):
```html
<button class="bg-gradient-to-r from-main-color to-blue-600 text-white px-8 py-4 rounded-2xl border-none font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  Get Started
</button>
```

### 4. Layout Containers
#### Before (CSS):
```css
.container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 2vw;
}
```

#### After (Tailwind):
```html
<div class="max-w-7xl mx-auto px-4 lg:px-8">
  <!-- Content -->
</div>
```

### 5. Responsive Grid
#### Before (CSS):
```css
.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
```

#### After (Tailwind):
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
  <!-- Grid items -->
</div>
```

## Quick Reference: Common Patterns

### Colors (Your Brand Colors)
- `text-main-color` → #0a174e
- `bg-main-color` → #0a174e
- `text-white/95` → rgba(255, 255, 255, 0.95)
- `bg-white/10` → rgba(255, 255, 255, 0.1)

### Spacing
- `p-4` → padding: 1rem
- `px-8` → padding-left/right: 2rem
- `m-6` → margin: 1.5rem
- `gap-4` → gap: 1rem

### Effects
- `backdrop-blur-md` → backdrop-filter: blur(12px)
- `rounded-xl` → border-radius: 0.75rem
- `shadow-lg` → box-shadow: large
- `hover:-translate-y-1` → transform: translateY(-0.25rem)

### Flexbox & Grid
- `flex items-center justify-between` → display: flex + alignment
- `grid grid-cols-3` → display: grid + 3 columns
- `space-x-4` → gap between child elements

### Typography
- `text-xl` → font-size: 1.25rem
- `font-semibold` → font-weight: 600
- `leading-relaxed` → line-height: 1.625
- `tracking-wide` → letter-spacing: 0.025em

## Migration Strategy

1. **Start with new components** - Use Tailwind for any new elements
2. **Replace utility styles first** - margins, padding, colors
3. **Keep complex animations** in your CSS initially
4. **Gradually convert sections** one at a time
5. **Remove unused CSS** as you convert

## Benefits You'll Get

✅ **Faster Development**: No more switching between HTML and CSS files
✅ **Consistent Spacing**: Predefined spacing scale
✅ **Responsive Design**: Built-in responsive utilities
✅ **Smaller CSS**: Only used styles are included
✅ **Better Maintainability**: Styles are co-located with HTML
✅ **Design System**: Consistent colors, spacing, and typography
