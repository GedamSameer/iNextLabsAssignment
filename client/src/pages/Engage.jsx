
import React from 'react'

export default function ProductPage(){
  return (
    <div className="flex-col" style={{gap:20}}>
      <header className="card p-6">
        <h1 style={{fontSize:28,margin:0}}>inFlow EngageAI</h1>
        <p style={{color:'#475569',marginTop:8}}>Transform data into visuals — charts, dashboards, and narratives for every audience.</p>
      </header>
      <section className="card p-6">
        <h2 style={{marginTop:0}}>Highlights</h2>
        <ul style={{color:'#334155',lineHeight:1.7}}>
          <li>Auto-generated charts and reports</li>   
          <li>Shareable, embeddable, exportable</li>   
          <li>Audience-aware narratives and data stories</li>      
        </ul>
      </section>
    </div>
  )
}
