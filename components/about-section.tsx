export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              ABOUT
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
                GRONINGS KWARTIER
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Gronings Kwartier started as a techno party on the island known as Derde Kwartier, near the Hoornseplas in Groningen. What began as a laid-back gathering with friends has since grown into a full-scale event, complete with ticketed entry, a dedicated location, and a growing audience.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              The festival is organized by a group of friends who all live in Groningen. What connects them is a shared love for electronic music and the energy that comes with organizing something together. Gronings Kwartier keeps that original spirit alive, rooted in community, and driven by the music.
            </p>
          </div>
          <div className="relative">
            <div
              className="aspect-square bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/about.jpg?height=600&width=600')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
