# Phase 10 Randomizer

A modern web application for generating randomized Phase 10 card game phases. Built with Next.js 15 and optimized for both desktop and mobile experiences.

## Features

- **Randomized Phases**: Generate custom Phase 10 combinations for a fresh gameplay experience
- **Official Phases**: Access the original Phase 10 phases for traditional gameplay
- **Mobile Optimized**: Responsive design with perfect mobile viewport support
- **Shareable URLs**: Each randomized set gets a unique URL for easy sharing
- **Interactive Rules**: Comprehensive rules modal with visual scoring reference
- **Progressive Enhancement**: Works seamlessly across all devices and browsers

## Live Demo

Visit the live application at [your-deployment-url.com]

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chrisae9/phase10randomizer.git
cd phase10randomizer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [slug]/            # Dynamic route for randomized phases
│   ├── official-phases/   # Official Phase 10 phases
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── Button.tsx        # Reusable button component
│   ├── Randomizer.tsx    # Main randomizer component
│   ├── RulesModal.tsx    # Rules modal with scoring chart
│   └── ViewportHeightFix.tsx # Mobile viewport height fix
├── lib/                  # Utility functions
│   ├── phase10logic.ts   # Phase generation logic
│   ├── urlGenerator.ts   # URL encoding/decoding
│   └── viewportHeight.ts # Mobile viewport utilities
└── public/              # Static assets
    ├── phase10logo.png
    ├── phase10withregcards.png
    └── favicon.ico
```

## Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Portals**: Modal rendering outside component tree
- **Progressive Web App**: Mobile-optimized experience

## Features in Detail

### Randomized Phases
- Generates unique combinations from an extensive phase database
- Creates shareable URLs for each randomized set
- Maintains game balance and variety

### Mobile Optimization
- Custom viewport height fixes for mobile browsers
- Responsive container sizing across all breakpoints
- Touch-optimized button interactions
- Loading states for smooth user experience

### Rules Reference
- Comprehensive Phase 10 rules documentation
- Visual scoring chart for regular playing cards
- Responsive modal design with proper overlay

## Development

### Building for Production

```bash
npm run build
npm start
```

### Docker Support

The project includes Docker configuration for containerized deployment:

```bash
docker build -t phase10randomizer .
docker run -p 3000:3000 phase10randomizer
```

### Linting and Type Checking

```bash
npm run lint
npm run type-check
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Phase 10 card game by Mattel
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first approach