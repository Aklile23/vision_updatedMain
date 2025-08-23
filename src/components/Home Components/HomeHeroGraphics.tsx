import React, { useRef, useEffect, useState } from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

const HomeHeroGraphics: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMedia = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);

  // Auto-rotate cards every 3 seconds (desktop only)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 768) {
        setActiveCard((prev) => (prev + 1) % 3);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const renderMobileCard = () => (
    <div className="md:hidden">
      <div className="absolute inset-4 rounded-3xl bg-fg/25 md:backdrop-blur-sm border border-fg/20 shadow-xl md:shadow-2xl overflow-hidden">
        <div className="p-6 h-full flex flex-col bg-bg/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-fg/60 rounded-full animate-pulse" />
            <span className="text-xs text-fg/80 font-medium">3D VISUALIZATION</span>
          </div>

          <div className="flex-1 relative bg-gradient-to-br from-fg/5 to-fg/10 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fg/95 via-fg/85 to-fg/95">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 200 150">
                  <defs>
                    <pattern id="grid-mobile" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-mobile)" />
                </svg>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="relative w-24 h-24"
                  style={{
                    animation: "spin 8s linear infinite"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-bg/80 to-bg/60 rounded-lg shadow-lg transform rotate-12 skew-x-12" />
                  <div className="absolute inset-0 bg-gradient-to-br from-bg/70 to-bg/50 rounded-lg shadow-lg transform -rotate-6 skew-y-6" />
                  <div className="absolute inset-0 bg-gradient-to-br from-bg/90 to-bg/70 rounded-lg shadow-lg" />
                </div>
              </div>

              <div className="absolute inset-0">
                <svg className="w-full h-full text-bg/60" viewBox="0 0 200 200">
                  <path d="M50 80 L100 50 L150 80 L150 130 L100 160 L50 130 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
                  <path d="M50 80 L50 130 M100 50 L100 100 M150 80 L150 130" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                </svg>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="px-2 py-1 bg-bg/20 rounded text-xs text-bg/80 font-mono">Vertices: 2,847</div>
                  <div className="flex gap-1">
                    <div className="w-6 h-1 bg-bg/40 rounded-full" />
                    <div className="w-2 h-1 bg-bg/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const render3DModelCard = () => (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-fg/60 rounded-full animate-pulse" />
        <span className="text-xs text-fg/80 font-medium">3D VISUALIZATION</span>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-fg/95 via-fg/85 to-fg/95 rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 200 150">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative w-32 h-32"
            style={{
              animation: "spin 8s linear infinite"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-bg/80 to-bg/60 rounded-lg shadow-lg transform rotate-12 skew-x-12" />
            <div className="absolute inset-0 bg-gradient-to-br from-bg/70 to-bg/50 rounded-lg shadow-lg transform -rotate-6 skew-y-6" />
            <div className="absolute inset-0 bg-gradient-to-br from-bg/90 to-bg/70 rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="absolute inset-0">
          <svg className="w-full h-full text-bg/60" viewBox="0 0 200 200">
            <path d="M50 80 L100 50 L150 80 L150 130 L100 160 L50 130 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
            <path d="M50 80 L50 130 M100 50 L100 100 M150 80 L150 130" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
          </svg>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="px-2 py-1 bg-bg/20 rounded text-xs text-bg/80 font-mono">Vertices: 2,847</div>
            <div className="flex gap-1">
              <div className="w-6 h-1 bg-bg/40 rounded-full" />
              <div className="w-2 h-1 bg-bg/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderBIMCard = () => (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-fg/60 rounded-full" />
        <span className="text-xs text-fg/80 font-medium">BIM SYSTEMS</span>
      </div>

      <div className="flex-1 relative bg-bg/90 rounded-xl overflow-hidden shadow-inner">
        <div className="absolute inset-4">
          <svg className="w-full h-full text-fg/70" viewBox="0 0 300 200">
            <rect x="20" y="30" width="260" height="140" stroke="currentColor" strokeWidth="3" fill="none" />
            
            <rect x="20" y="30" width="80" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
            <rect x="100" y="30" width="100" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
            <rect x="200" y="30" width="80" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
            <rect x="20" y="100" width="130" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.12" />
            <rect x="150" y="100" width="130" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.08" />
            
            <path d="M60 30 A15 15 0 0 1 75 45" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
            <path d="M160 100 A10 10 0 0 1 170 110" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
            
            <line x1="20" y1="50" x2="20" y2="80" stroke="currentColor" strokeWidth="4" opacity="0.6"/>
            <line x1="260" y1="50" x2="280" y2="50" stroke="currentColor" strokeWidth="4" opacity="0.6"/>
            
            <text x="150" y="20" textAnchor="middle" className="text-[8px] fill-current opacity-60" fontFamily="monospace">26.0m</text>
            <text x="10" y="100" textAnchor="middle" className="text-[8px] fill-current opacity-60" fontFamily="monospace" transform="rotate(-90 10 100)">14.0m</text>
            
            <circle cx="60" cy="65" r="8" fill="currentColor" opacity="0.4" />
            <circle cx="240" cy="65" r="8" fill="currentColor" opacity="0.4" />
            <rect x="170" y="120" width="20" height="30" rx="2" fill="currentColor" opacity="0.4" />
            
            <circle cx="140" cy="50" r="2" fill="currentColor" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="180" cy="130" r="2" fill="currentColor" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="absolute top-4 right-4">
          <div className="bg-fg/10 backdrop-blur-sm rounded-lg p-2 border border-fg/20">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-fg/60 rounded-full animate-pulse" />
                <span className="font-mono text-fg/80">T: 22°C</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-fg/60 rounded-full animate-pulse" />
                <span className="font-mono text-fg/80">H: 45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAIDashboardCard = () => (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-fg/60 rounded-full animate-pulse" />
        <span className="text-xs text-fg/80 font-medium">AI SYSTEMS</span>
      </div>

      <div className="flex-1 space-y-4">
        <div className="h-24 bg-fg/90 rounded-lg p-3 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 60">
            <defs>
              <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(255 255 255)" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="rgb(255 255 255)" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            
            <path d="M10 45 Q30 35 50 25 T90 15 T130 20 T170 10 T190 15" stroke="rgb(255 255 255)" strokeWidth="2" fill="none" opacity="0.8">
              <animate attributeName="stroke-dasharray" values="0 400;200 200;400 0" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" values="0;-200;-400" dur="3s" repeatCount="indefinite"/>
            </path>
            
            <path d="M10 45 Q30 35 50 25 T90 15 T130 20 T170 10 T190 15 L190 55 L10 55 Z" fill="url(#aiGradient)" opacity="0.3"/>
            
            <circle cx="50" cy="25" r="2" fill="white" opacity="0.8">
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="90" cy="15" r="2" fill="white" opacity="0.8">
              <animate attributeName="r" values="2;4;2" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="130" cy="20" r="2" fill="white" opacity="0.8">
              <animate attributeName="r" values="2;4;2" dur="2s" begin="1s" repeatCount="indefinite"/>
            </circle>
          </svg>
          
          <div className="absolute top-2 left-2 text-bg/80 text-xs font-mono">
            Model Accuracy: 94.7%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg/10 rounded-lg p-3 border border-fg/10">
            <div className="text-xs text-fg/70 mb-1">Processing</div>
            <div className="text-lg font-bold text-fg">1.2k/s</div>
            <div className="w-full bg-fg/20 rounded-full h-1 mt-2">
              <div 
                className="bg-fg/60 h-1 rounded-full" 
                style={{width: "78%"}}
              >
                <div className="h-full bg-fg/80 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-bg/10 rounded-lg p-3 border border-fg/10">
            <div className="text-xs text-fg/70 mb-1">Uptime</div>
            <div className="text-lg font-bold text-fg">99.9%</div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1 bg-fg/40 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-bg/10 rounded-lg p-3 border border-fg/10">
          <div className="text-xs text-fg/70 mb-2">Neural Network</div>
          <div className="flex justify-between items-center">
            {Array.from({ length: 3 }, (_, layer) => (
              <div key={layer} className="flex flex-col gap-1">
                {Array.from({ length: layer === 1 ? 5 : 3 }, (_, node) => (
                  <div
                    key={node}
                    className="w-2 h-2 bg-fg/40 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${(layer * 0.5) + (node * 0.1)}s`
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  interface CardConfig {
    opacity: string;
    rotate: string;
    content: 'bim-view' | 'ai-dashboard' | '3d-model';
    zIndex: number;
    scale: number;
    y: number;
  }

  const getCardConfigs = (): CardConfig[] => [
    {
      opacity: "bg-fg/15",
      rotate: "-6deg",
      content: "3d-model",
      zIndex: activeCard === 0 ? 30 : 10,
      scale: activeCard === 0 ? 1.02 : 0.95,
      y: activeCard === 0 ? -10 : 0,
    },
    {
      opacity: "bg-fg/20",
      rotate: "3deg", 
      content: "bim-view",
      zIndex: activeCard === 1 ? 30 : 20,
      scale: activeCard === 1 ? 1.02 : 0.98,
      y: activeCard === 1 ? -10 : 20,
    },
    {
      opacity: "bg-fg/25",
      rotate: "-2deg",
      content: "ai-dashboard",
      zIndex: activeCard === 2 ? 30 : 10,
      scale: activeCard === 2 ? 1.02 : 0.96,
      y: activeCard === 2 ? -10 : 40,
    },
  ];

  const renderCardContent = (content: string) => {
    switch (content) {
      case '3d-model':
        return render3DModelCard();
      case 'bim-view':
        return renderBIMCard();
      case 'ai-dashboard':
        return renderAIDashboardCard();
      default:
        return <div />;
    }
  };

  const renderDesktopCards = () => (
    <div className="hidden md:block">
      {getCardConfigs().map((card, i) => (
        <div
          key={i}
          className={`absolute inset-4 rounded-3xl ${card.opacity} backdrop-blur-sm border border-fg/20 shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer`}
          style={{
            transform: `rotate(${activeCard === i ? '0deg' : card.rotate}) translateY(${card.y}px) scale(${card.scale})`,
            zIndex: card.zIndex,
            opacity: activeCard === i ? 1 : 0.8,
            willChange: "transform",
          }}
          onMouseEnter={() => setActiveCard(i)}
        >
          <div className="p-6 h-full flex flex-col bg-transparent">
            {renderCardContent(card.content)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFloatingElements = () => (
    <div className="hidden md:block">
      <div
        className="absolute -top-4 -right-4 w-16 h-16 bg-fg/15 rounded-full shadow-lg border border-fg/25 flex items-center justify-center"
        style={{ 
          willChange: "transform", 
          transform: "translateZ(0)",
          animation: "bounce 6s ease-in-out infinite"
        }}
      >
        <svg className="w-8 h-8 text-fg/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
        </svg>
      </div>

      <div
        className="absolute -bottom-4 -left-4 w-12 h-12 bg-fg/10 rounded-full shadow-lg border border-fg/20 flex items-center justify-center"
        style={{ 
          willChange: "transform", 
          transform: "translateZ(0)",
          animation: "bounce 4s ease-in-out infinite reverse"
        }}
      >
        <svg className="w-6 h-6 text-fg/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    </div>
  );

  const renderNavigationDots = () => (
    <div className="hidden md:flex absolute -bottom-8 left-1/2 transform -translate-x-1/2 gap-2">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => setActiveCard(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeCard === index 
              ? 'bg-fg/80 w-6' 
              : 'bg-fg/40 hover:bg-fg/60'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden py-30 md:py-42">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fg/5 via-transparent to-fg/8" />

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-72 h-72 md:w-96 md:h-96 bg-fg/10 rounded-full blur-xl md:blur-3xl"
          style={{ 
            willChange: "transform", 
            transform: "translateZ(0)",
            animation: "float1 8s ease-in-out infinite"
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 md:w-80 md:h-80 bg-fg/8 rounded-full blur-lg md:blur-3xl"
          style={{ 
            willChange: "transform", 
            transform: "translateZ(0)",
            animation: "float2 10s ease-in-out infinite"
          }}
        />
      </div>

      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.04] [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:64px_64px]" />

      <Container>
          {/* Right: Interactive visual element */}
          <div
            ref={heroMedia}
            className="lg:col-span-5 relative"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            <div className="relative h-80 md:h-96 lg:h-[500px]">
              {renderMobileCard()}
              {renderDesktopCards()}
              {renderFloatingElements()}
              {renderNavigationDots()}
            </div>
          </div>
        
      </Container>

      {/* Global CSS animations - would normally be in a separate CSS file */}
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translateZ(0) translate(0, 0) scale(1); }
            50% { transform: translateZ(0) translate(50px, -30px) scale(1.1); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateZ(0) translate(0, 0) scale(1); }
            50% { transform: translateZ(0) translate(-30px, 40px) scale(0.9); }
          }
          @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
          @keyframes bounce { 
            0%, 100% { transform: translateY(0); } 
            50% { transform: translateY(-20px); } 
          }
        `}
      </style>
    </section>
  );
};

export default HomeHeroGraphics;