import React from 'react';
import { servicePages } from '../scripts/service-content.mjs';

type Service = (typeof servicePages)[number];
export default function ServicePage({ page }: { page: Service }) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="service-nav"><a className="wordmark" href="/">ANURAG PATIAL<span>®</span></a><a href="/#contact">Discuss your business ↗</a></header>
    <main id="main" className="service-document">
      <nav aria-label="Breadcrumb" className="service-breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><span aria-current="page">{page.label}</span></nav>
      <section className="service-intro"><p className="service-eyebrow">ANURAG PATIAL / {page.label.toUpperCase()}</p><h1>{page.heading}</h1><p className="service-lead">{page.intro}</p><a className="service-cta" href="/#contact">{page.contact} ↗</a></section>
      <div className="service-content-grid"><article><section><h2>Is this the right fit?</h2><p>{page.fit}</p></section>{page.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<section><h2>Relevant work</h2><p>{page.example}</p><a href="/#work">Explore selected projects ↗</a></section></article>
      <aside className="service-delivery"><p className="service-eyebrow">A PRACTICAL SCOPE</p><h2>What we can build together</h2><ul>{page.deliverables.map(item => <li key={item}>{item}</li>)}</ul><p>Final deliverables are agreed around your business needs.</p><a href="/#about">Meet your technical partner ↗</a></aside></div>
      <section className="service-faq"><h2>Before we start</h2>{page.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <section className="service-next"><h2>Start with the problem you want to solve.</h2><p>Share your current setup, the bottleneck and what a useful outcome would look like. We can define a sensible next step from there.</p><a className="service-cta" href="/#contact">{page.contact} ↗</a></section>
      <nav aria-label="Related services" className="service-related"><h2>Other ways I can help</h2>{servicePages.filter(item => item.slug !== page.slug).map(item => <a key={item.slug} href={`/services/${item.slug}/`}>{item.label} ↗</a>)}</nav>
    </main><footer><a href="/">Anurag Patial</a><span>Mohali, India</span><a href="/#contact">Get in touch ↗</a></footer>
  </>;
}
