
import React from 'react'

export default function ProductPage(){
  return (
    <div className="flex-col" style={{gap:20}}>
      <header className="card p-6">
        <h1 style={{fontSize:28,margin:0}}>inFlow InsightsAI</h1>
        <p style={{color:'#475569',marginTop:8}}>Comprehensive analysis for text, tables, and images. Extract patterns and present actionable insights.</p>
      </header>
      <section className="card p-6">
        <h2 style={{marginTop:0}}>Highlights</h2>
        <ul style={{color:'#334155',lineHeight:1.7}}>
          <li>Connect files and data sources securely</li>       
          <li>Promptable pipelines that turn raw data into insights</li>          
          <li>Visual summaries with drill-downs and filters</li>      
        </ul>
      </section>
    </div>
  )
}
