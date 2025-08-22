
import React from 'react'

export default function ProductPage(){
  return (
    <div className="flex-col" style={{gap:20}}>
      <header className="card p-6">
        <h1 style={{fontSize:28,margin:0}}>inFlow DocsAI</h1>
        <p style={{color:'#475569',marginTop:8}}>Gen AI-powered omnichannel assistants that surface answers from documentation, FAQs, and internal knowledge.</p>
      </header>
      <section className="card p-6">
        <h2 style={{marginTop:0}}>Highlights</h2>
        <ul style={{color:'#334155',lineHeight:1.7}}>
          <li>Omnichannel delivery: web widget, chat, email</li>         
          <li>Grounded responses from your docs & structured content</li>          
          <li>Content safety, guardrails, analytics built-in</li>  
        </ul>
      </section>
    </div>
  )
}
