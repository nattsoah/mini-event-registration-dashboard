import React from 'react';

export default function ThemeShowcasePage() {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  return (
    <main className="min-h-screen bg-background p-8 md:p-24 space-y-16">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
          Full Color <span className="text-primary">Palettes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Complete design tokens with full scale palettes (50-950). 
          <br /><span className="text-sm font-normal text-destructive italic">*Fixed: Colors now use direct CSS variable mapping for reliable preview.*</span>
        </p>
      </section>

      {/* Primary Palette */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Primary Palette (Indigo)</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {shades.map((shade) => (
            <PaletteBox key={shade} shade={shade} colorVar={`--primary-${shade}`} />
          ))}
        </div>
      </section>

      {/* Gray Palette */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Neutral Palette (Slate Gray)</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {shades.map((shade) => (
            <PaletteBox key={shade} shade={shade} colorVar={`--gray-${shade}`} />
          ))}
        </div>
      </section>

      {/* Semantic Palettes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Semantic Palettes</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Success</h3>
            <div className="flex gap-2 h-16">
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: 'hsl(var(--success-50))' }}>50</div>
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: 'hsl(var(--success-500))' }}>500</div>
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: 'hsl(var(--success-900))' }}>900</div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Warning</h3>
            <div className="flex gap-2 h-16">
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: 'hsl(var(--warning-50))' }}>50</div>
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: 'hsl(var(--warning-500))' }}>500</div>
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: 'hsl(var(--warning-900))' }}>900</div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Destructive</h3>
            <div className="flex gap-2 h-16">
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: 'hsl(var(--destructive-50))' }}>50</div>
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: 'hsl(var(--destructive-500))' }}>500</div>
               <div className="w-24 rounded border flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: 'hsl(var(--destructive-900))' }}>900</div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Shade Usage Examples</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl shadow-soft border" style={{ backgroundColor: 'hsl(var(--primary-50))', borderColor: 'hsl(var(--primary-100))' }}>
            <h3 className="font-bold" style={{ color: 'hsl(var(--primary-900))' }}>Information Card</h3>
            <p className="text-sm mt-2" style={{ color: 'hsl(var(--primary-700))' }}>Using primary-50 for background and primary-900 for text creates a high-quality branded feel.</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-soft">
            <h3 className="font-bold text-gray-900">Standard Card</h3>
            <p className="text-sm text-gray-500 mt-2">Using gray-200 for borders and gray-500 for muted text is the standard for clean dashboards.</p>
          </div>
          <div className="p-6 rounded-xl shadow-soft border" style={{ backgroundColor: 'hsl(var(--success-50))', borderColor: 'hsl(var(--success-500) / 0.2)' }}>
            <h3 className="font-bold" style={{ color: 'hsl(var(--success-500))' }}>Success Alert</h3>
            <p className="text-sm mt-2" style={{ color: 'hsl(var(--success-900))' }}>Soft backgrounds with strong primary accents are great for feedback.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function PaletteBox({ shade, colorVar }: { shade: number; colorVar: string }) {
  const isDark = shade >= 500;
  return (
    <div className="space-y-1">
      <div 
        className="h-16 w-full rounded-md border border-black/5 flex items-center justify-center transition-transform hover:scale-105"
        style={{ backgroundColor: `hsl(var(${colorVar}))` }}
      >
        <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-black/60'}`}>{shade}</span>
      </div>
    </div>
  );
}
