# VR Tech - Local Version

This is a localized version of the VR Tech Webflow website, converted to work offline with local assets.

## Files Structure

```
vr_tech_local/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Original Webflow CSS
│   └── custom.css      # Custom styles for local version
├── js/
│   ├── jquery.min.js   # jQuery library
│   ├── webflow.js      # Webflow interactions
│   └── custom.js       # Custom JavaScript for local functionality
├── images/             # All images and SVG assets
└── README.md          # This file
```

## Features

- **Fully Local**: All assets are stored locally, no external dependencies except Google Fonts
- **Responsive Design**: Maintains original responsive layout
- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Contact Form**: Basic contact form with demo functionality
- **Animations**: Fade-in animations on scroll

## Usage

1. Open `index.html` in any modern web browser
2. Navigate using the menu or scroll through sections
3. All links point to local sections or display demo messages

## Browser Compatibility

- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers supported

## Notes

- Google Fonts are still loaded from CDN for typography
- WebFont loader is used for font loading optimization
- Contact form shows demo message when submitted
- All external links have been converted to local navigation or placeholders
