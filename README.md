# Vivek Kumar Yadav - Portfolio Website

A modern, responsive portfolio website showcasing full-stack development skills with clean, static HTML/CSS architecture.


## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── script.js               # Basic JavaScript functionality
├── css/                    # Stylesheets directory
│   ├── main.css           # Main stylesheet (imports all modules)
│   ├── base.css           # CSS variables, global styles, animations
│   ├── header.css         # Navigation and header styles
│   ├── hero.css           # Hero section styles
│   ├── components.css     # Reusable component styles
│   ├── about.css          # About section styles
│   ├── skills.css         # Skills section styles
│   ├── projects.css       # Projects section styles
│   ├── contact.css        # Contact section styles
│   └── footer.css         # Footer styles
└── README.md              # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)**: Basic interactivity and DOM manipulation
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Inter font family for typography

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local development server (optional, but recommended)

### Running the Project

1. **Clone or download** the project files
2. **Navigate** to the project directory
3. **Start a local server** (recommended):
   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Using Node.js (if installed)
   npx serve .

   # Or open index.html directly in browser
   ```
4. **Open** `http://localhost:8000` in your browser

## 📝 Development

### Adding New Styles
1. Create a new CSS file in the `css/` directory
2. Import it in `css/main.css`
3. Follow the existing naming conventions

### CSS Architecture
- **base.css**: Global styles, CSS variables, keyframe animations
- **Component-specific files**: Section-based styling
- **main.css**: Central import file

## 🎨 Customization

### Colors
Edit CSS variables in `css/base.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --text-color: #your-color;
  /* ... */
}
```

### Content
Update personal information in `index.html`:
- Name, bio, and contact details
- Skills and technologies
- Project descriptions and links
- Social media profiles

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Vivek Kumar Yadav**
- Email: v8004282@gmail.com
- GitHub: [vivekYadav129](https://github.com/vivekYadav129)
- LinkedIn: [vivek-yadav-129](https://linkedin.com/in/vivek-yadav-129)

---

*Built with ❤️ using modern web technologies*