import React from 'react'
import { Link } from 'react-router-dom'

const products = [
  { slug: 'docs', name: 'inFlow DocsAI', blurb: 'Gen AI-powered omnichannel assistants.', cta: 'Explore DocsAI' },
  { slug: 'insights', name: 'inFlow InsightsAI', blurb: 'Comprehensive analysis for all data types.', cta: 'Explore InsightsAI' },
  { slug: 'engage', name: 'inFlow EngageAI', blurb: 'Transform data into insightful visuals instantly.', cta: 'Explore EngageAI' },
  { slug: 'assist', name: 'inFlow AssistAI', blurb: 'Elevate customer interactions with AI chat.', cta: 'Try AssistAI Chat' },
]

export default function Home(){
  return (
    <div className="flex-col" style={{gap:20}}>
      <section className="card p-6" style={{textAlign:'center'}}>
        <h1 style={{fontSize:32,margin:'8px 0'}}>iNextLabs AI Products — Modern, Responsive SPA</h1>
        <p style={{color:'#475569',maxWidth:760,margin:'0 auto'}}>
          Built with React, Redux, and Express (mock API). Fully responsive, clean code, and a polished AssistAI chat demo.
        </p>
      </section>
      <section className="grid grid-4">
        {products.map(p => (
          <article key={p.slug} className="card p-5" style={{display:'flex',flexDirection:'column'}}>
            <div className="badge" style={{marginBottom:12}}>New</div>
            <h2 style={{fontSize:20,margin:0}}>{p.name}</h2>
            <p style={{color:'#475569',marginTop:8,flex:1}}>{p.blurb}</p>
            <Link className="btn btn-primary" style={{marginTop:12}} to={`/${p.slug}`}>{p.cta}</Link>
          </article>
        ))}
      </section>
      <section className="card p-6">
        <h3 style={{marginTop:0}}>What’s inside</h3>
        <ul style={{color:'#334155', lineHeight:1.6}}>
          <li>Responsive layout with modern CSS grid/flex</li>
          <li>Dedicated pages for each product</li>
          <li>AssistAI Chat: history, typing, status, uploads, search, mock API</li>
          <li>Clean, concise, production-ready structure</li>
        </ul>
      </section>
    </div>
  )
}
