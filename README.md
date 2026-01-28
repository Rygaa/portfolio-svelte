# ✨ Portfolio - Interactive 3D Experience

> A modern, multilingual portfolio website featuring an immersive 3D environment powered by Three.js and SvelteKit.

## 🎯 Overview

This portfolio showcases a unique blend of creativity and technical expertise through an interactive 3D scene. Built with performance and user experience in mind, it features dynamic cube animations, intelligent lighting effects, and smooth transitions - all while maintaining excellent performance.

## 🚀 Features

### 🎨 Visual & Interactive
- **Interactive 3D Scene** - Real-time animated cube field with dynamic height variations
- **Mouse-Reactive Lighting** - Spotlight follows cursor movement for an engaging experience
- **Dynamic Fog System** - Atmospheric fog that enhances depth perception
- **Smooth Animations** - Performant animations using Three.js and custom optimization techniques
- **Responsive Design** - Seamlessly adapts to all screen sizes and devices

### 🌍 Internationalization
- **Multi-language Support** - Currently supporting English and French
- **Language Switcher** - Easy language selection with persistent preferences
- **SEO Optimized** - Language-specific routes for better search engine visibility

### 📊 Analytics & Admin
- **Built-in Analytics** - Track visitor interactions and page views
- **Admin Dashboard** - Protected admin panel for viewing statistics
- **Performance Monitoring** - Optional FPS counter for development

### ⚡ Performance
- **Optimized 3D Rendering** - Efficient cube spawning with configurable probability
- **Sin Lookup Table** - Pre-computed trigonometric values for smooth animations
- **Resource Preloading** - Smart asset loading for faster initial render
- **Production Ready** - Fully optimized build with code splitting

## 🛠️ Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) - Modern web framework with TypeScript
- **3D Graphics:** [Three.js](https://threejs.org/) - WebGL-powered 3D rendering
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Build Tool:** [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Deployment:** Node.js server with Express

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-sv

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

The development server will start at `http://localhost:5173`

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SHOW_FPS=true              # Show FPS counter (development only)
ADMIN_PASSWORD="your-password"   # Password for admin dashboard
VITE_VERSION="1.0.0"            # Application version
```

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start development server with hot reload
pnpm dev -- --open    # Start dev server and open in browser

# Building
pnpm build            # Create production build
pnpm preview          # Preview production build locally

# Production
node server.js        # Start production server (after build)
```

## 🎛️ Configuration

### 3D Scene Settings

Customize the 3D experience in [src/lib/settings.ts](src/lib/settings.ts):

```typescript
{
  showFPS: false,                    // Display performance metrics
  isFogEnabled: true,                 // Atmospheric fog effect
  scrollbarAlwaysOn: true,            // Scrollbar visibility
  cubeSize: 1.5,                      // Size of 3D cubes
  floorSize: 100,                     // Grid dimensions
  maxCubeHeight: 5,                   // Maximum cube animation height
  cubeSpawnProbability: 0.35,         // Density of cube field (0-1)
  rotationSpeed: {
    normal: 0.001,                    // Default camera rotation
    fast: 0.005                       // Accelerated rotation
  },
  mouseLight: {
    color: 0x00ffd1,                  // Cyan spotlight color
    intensity: 10,
    distance: 50,
    height: 10
  }
}
```

## 📁 Project Structure

```
portfolio-sv/
├── src/
│   ├── lib/
│   │   ├── components/          # Svelte components
│   │   │   ├── 3DScene.svelte   # Main Three.js scene
│   │   │   ├── Home.svelte      # Landing section
│   │   │   ├── AboutMe.svelte   # About section
│   │   │   ├── Projects.svelte  # Project showcase
│   │   │   ├── Skills.svelte    # Skills & expertise
│   │   │   └── Contact.svelte   # Contact information
│   │   ├── threejs/             # Three.js utilities
│   │   │   ├── initScene.ts     # Scene initialization
│   │   │   ├── createCubes.ts   # Cube generation
│   │   │   ├── createLights.ts  # Lighting setup
│   │   │   └── updateFog.ts     # Fog effects
│   │   ├── translations/        # i18n translations
│   │   │   ├── en.ts            # English
│   │   │   └── fr.ts            # French
│   │   ├── stores/              # Svelte stores
│   │   │   ├── globalStore.svelte.ts
│   │   │   └── i18n.ts
│   │   ├── utils/               # Utility functions
│   │   └── settings.ts          # Global configuration
│   ├── routes/                  # SvelteKit routes
│   │   ├── +page.svelte         # Root page
│   │   ├── [lang]/              # Language routes
│   │   ├── admin/               # Admin dashboard
│   │   └── stats/               # Analytics
│   └── app.html                 # HTML template
├── static/                      # Static assets
├── build/                       # Production build
├── server.js                    # Production server
└── package.json
```

## 🎨 Customization

### Adding New Languages

1. Create translation file in `src/lib/translations/{lang}.ts`
2. Export translations object with all required keys
3. Update language selector component
4. Add route in `src/routes/[lang]/`

### Modifying 3D Scene

- **Cube Appearance:** Edit `createCubes.ts`
- **Lighting:** Adjust `createLights.ts`
- **Camera Movement:** Modify `rotateCameraAroundScene.ts`
- **Animation Speed:** Update settings in `settings.ts`

### Styling

This project uses Tailwind CSS. Customize the theme in [tailwind.config.js](tailwind.config.js):
- Colors
- Fonts
- Breakpoints
- Custom utilities

## 🚀 Deployment

### Build for Production

```bash
# Create optimized build
pnpm build

# Test production build locally
pnpm preview

# Deploy with Node.js
node server.js
```

### Environment Setup

Ensure production environment variables are set:
- Set `ADMIN_PASSWORD` to a secure value
- Configure `VITE_VERSION` for version tracking
- Set `VITE_SHOW_FPS=false` in production

## 📈 Performance Tips

- Adjust `cubeSpawnProbability` for lower-end devices
- Disable fog with `isFogEnabled: false` if needed
- Modify `rotationSpeed` for smoother animations
- Use `showFPS` to monitor performance during development

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using SvelteKit and Three.js**
