import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Allen’s Page | Firehawk Analytics",
  description: "A concise briefing on Australia’s government structure and political system.",
}

const highlights = [
  {
    title: "Federal system",
    body: "Australia consists of six states and two mainland territories; powers are split between the federal government and the states, with the Constitution outlining concurrent, exclusive, and residual areas of authority.",
  },
  {
    title: "Constitutional monarchy",
    body: "The British monarch is Australia’s head of state, represented locally by the governor-general, while effective governing authority resides with elected representatives acting within constitutional limits.",
  },
  {
    title: "Responsible government",
    body: "The prime minister and Cabinet are accountable to parliament, and the lower house can trigger the government’s fall via a no-confidence vote, ensuring executive responsiveness to elected members.",
  },
]

const branchDescriptions = [
  {
    title: "Legislative",
    body: "Parliament is bicameral, formed by the House of Representatives (435 members) and the Senate (76 members). Bills need approval from both chambers before becoming law, and the Senate represents states equally.",
  },
  {
    title: "Executive",
    body: "The monarch (through the governor-general) officially appoints ministers, but the prime minister—usually the leader of the majority in the House—selects and leads the Cabinet to enact policy.",
  },
  {
    title: "Judicial",
    body: "An independent High Court interprets the Constitution, resolves federal-state disputes, and safeguards rights, with lower federal and state courts handling appeals, civil matters, and criminal law.",
  },
]

export default function AllensPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="max-w-6xl mx-auto px-4">
          <div className="bg-brand-purple/10 border border-brand-purple/30 rounded-3xl px-8 py-12 shadow-xl shadow-brand-purple/20">
            <p className="text-sm uppercase tracking-widest text-brand-orange mb-3">Allen’s Perspective</p>
            <h1 className="text-4xl font-semibold text-brand-blue mb-6">Australia’s Government Structure & Political System</h1>
            <p className="text-lg text-brand-neutral leading-relaxed">
              Australia blends a federal model with traditions inherited from Westminster. This short article outlines how the Constitution, responsible government, and electoral rhythm keep power balanced across levels.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="bg-white border border-brand-neutral/60 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-brand-blue mb-3">{item.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="max-w-6xl mx-auto px-4 mt-16 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold text-brand-blue mb-4">Branches of government</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              The Constitution delineates three branches to avoid concentration of authority. Each branch operates within checks and balances shaped by conventions and legal safeguards.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {branchDescriptions.map((branch) => (
              <article key={branch.title} className="bg-brand-light-blue/10 border border-brand-light-blue/40 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-brand-blue mb-2">{branch.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{branch.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 mt-16 space-y-5">
          <h2 className="text-3xl font-semibold text-brand-blue">Key political features</h2>
          <ul className="list-disc pl-5 space-y-3 text-slate-600 leading-relaxed">
            <li>Compulsory voting fortifies legitimacy and encourages broad representation in the House and Senate.</li>
            <li>A preferential (instant-runoff) system determines the House of Representatives, while the Senate uses proportional representation to ensure smaller parties have a voice.</li>
            <li>State governments mirror the federal model, each with their own parliaments, premiers, and courts, yet they remain accountable to the national Constitution.</li>
            <li>Federalism allows states to manage localized concerns like education and transport while the Commonwealth handles defense, trade, and foreign policy.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
