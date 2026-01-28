# ✨ Portfolio - Interactive 3D Experience

> A modern, multilingual portfolio website featuring an immersive 3D environment powered by Three.js and SvelteKit.

![Portfolio Preview](sample.png)

## 🎯 Overview

This portfolio showcases a unique blend of creativity and technical expertise through an interactive 3D scene. Built with performance and user experience in mind, it features dynamic cube animations, intelligent lighting effects, and smooth transitions - all while maintaining excellent performance.

## �️ Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) - Modern web framework with TypeScript
- **3D Graphics:** [Three.js](https://threejs.org/) - WebGL-powered 3D rendering
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Build Tool:** [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Deployment:** Node.js server with Express

## 🚀 Features

### 🌍 Internationalization
- **Multi-language Support** - Currently supporting English and French
- **Language Switcher** - Easy language selection with persistent preferences

### 📊 Analytics & Admin
- **Built-in Analytics** - Track visitor interactions and page views
- **Admin Dashboard** - Protected admin panel for viewing statistics
- **Secret Access** - Type `ADMIN` anywhere on the site to access the admin panel
- **Performance Monitoring** - Optional FPS counter for development

### ⚡ Performance
- **Optimized 3D Rendering** - Efficient cube spawning with configurable probability
- **Sin Lookup Table** - Pre-computed trigonometric values for smooth animations
- **Resource Preloading** - Smart asset loading for faster initial render

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SHOW_FPS=true              # Show FPS counter (development only)
ADMIN_PASSWORD="your-password"   # Password for admin dashboard (accessed by typing ADMIN)
VITE_VERSION="1.0.0"            # Application version
```

### Scene Settings

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

## 🎨 Customization

### Adding New Languages

1. Create translation file in `src/lib/translations/{lang}.ts`
2. Export translations object with all required keys
3. Update language selector component
4. Add route in `src/routes/[lang]/`

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
