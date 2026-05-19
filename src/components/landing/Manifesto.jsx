export default function Manifesto() {
  return (
    <section className="relative py-24 md:py-40 bg-blood text-bone overflow-hidden">
      {/* Diagonal lines */}
      <div className="absolute inset-0 diagonal-bg opacity-30" />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 text-center">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-bone/70 mb-8">
          Manifiesto
        </div>

        <p className="font-display text-[12vw] md:text-[8vw] lg:text-[6.5vw] tracking-crush leading-[0.9] uppercase">
          Sin estructura,<br />
          <span className="text-bone/50">no hay cambio.</span>
        </p>

        <div className="mt-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-bone/90 leading-relaxed">
            Los entrenamientos, las comidas y los hábitos diarios. Si no se organizan,
            se improvisa. Y lo improvisado nunca transforma.
          </p>
        </div>

        {/* Firma */}
        <div className="mt-14 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-bone/60">
          <span className="w-12 h-px bg-bone/40" />
          <span>José Mompó · Mompofit</span>
          <span className="w-12 h-px bg-bone/40" />
        </div>
      </div>
    </section>
  );
}
