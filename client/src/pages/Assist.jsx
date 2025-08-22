import React, { useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setStatus, addAssistantReply, selectMessages } from '../store/messagesSlice'
import { nanoid } from '../utils/uid'

export default function Assist(){
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const [q, setQ] = useState('')
  const [typing, setTyping] = useState(false)
  const [files, setFiles] = useState([])
  const [filter, setFilter] = useState('all') // all | user | assistant | withFiles
  const [search, setSearch] = useState('')
  const inputRef = useRef(null)

  const filtered = useMemo(() => {
    const byFilter = messages.filter(m => {
      if (filter === 'all') return true
      if (filter === 'withFiles') return (m.attachments?.length || 0) > 0
      return m.role === filter
    })
    if (!search.trim()) return byFilter
    const s = search.toLowerCase()
    return byFilter.filter(m => m.text.toLowerCase().includes(s))
  }, [messages, filter, search])

  async function send(){
    const text = q.trim()
    if (!text && files.length === 0) return
    setQ('')
    inputRef.current?.focus()

    const id = nanoid()
    const attachments = files.map(f => ({ name: f.name, size: f.size }))
    setFiles([])

    dispatch(addMessage({ id, role:'user', text, attachments }))
    setTimeout(() => dispatch(setStatus({ id, status:'sent' })), 200)
    setTimeout(() => dispatch(setStatus({ id, status:'delivered' })), 600)

    setTyping(true)
    try{
      const res = await fetch('/.netlify/functions/server', { method: 'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify({ prompt: text }), });
      const data = await res.json()
      dispatch(setStatus({ id, status:'read' }))
      dispatch(addAssistantReply({ text: data.reply }))
    }catch(e){
      dispatch(addAssistantReply({ text: 'Sorry, something went wrong. (Mock API)' }))
    }finally{
      setTyping(false)
    }
  }

  function onDrop(e){
    e.preventDefault()
    const incoming = Array.from(e.dataTransfer.files || [])
    if (incoming.length) setFiles(prev => ([...prev, ...incoming]))
  }

  return (
    <div className="flex-col" style={{gap:20}}>
      <header className="card p-6" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{margin:'0 0 6px', fontSize:28}}>inFlow AssistAI — Chat Demo</h1>
          <p style={{color:'#475569'}}>History, typing indicators, statuses, file uploads, search — with a mock API.</p>
        </div>
        <div className="flex" style={{flexWrap:'wrap'}}>
          <select className="select" value={filter} onChange={e => setFilter(e.target.value)} style={{minWidth:160}}>
            <option value="all">All messages</option>
            <option value="user">Only you</option>
            <option value="assistant">Only AssistAI</option>
            <option value="withFiles">With files</option>
          </select>
          <input className="input" placeholder="Search messages…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </header>

      <section className="chat-wrap">
        <div className="card chat-box">
          <div
            className="chat-history"
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
          >
            {filtered.map(m => (
              <div key={m.id} className={'bubble ' + (m.role === 'user' ? 'user' : '')}>
                <div className="meta">
                  <span>{m.role === 'user' ? 'You' : 'AssistAI'}</span>
                  <span suppressHydrationWarning>{new Date(m.createdAt).toLocaleTimeString()}</span>
                </div>
                <div style={{whiteSpace:'pre-wrap'}}>{m.text}</div>
                {!!(m.attachments?.length) && (
                  <div className="mt-2">
                    {m.attachments.map((a,i) => (
                      <span key={i} className="attach">{a.name} · {(a.size/1024).toFixed(1)} KB</span>
                    ))}
                  </div>
                )}
                {m.role === 'user' && (
                  <div style={{fontSize:11, color:'#64748b', marginTop:4}}>
                    {m.status}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="bubble">
                <div className="meta">AssistAI</div>
                <div className="typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span style={{fontSize:12,color:'#64748b'}}>typing…</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="flex">
              <input
                ref={inputRef}
                className="input"
                placeholder="Ask about DocsAI, InsightsAI, EngageAI, AssistAI…"
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button className="btn btn-primary" onClick={send}>Send</button>
            </div>
            <div className="flex mt-2" style={{flexWrap:'wrap'}}>
              <label className="btn">
                <input type="file" multiple hidden onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])} />
                Attach files
              </label>
              {!!files.length && files.map((f,i) => <span key={i} className="attach">{f.name}</span>)}
            </div>
            <p style={{fontSize:12, color:'#64748b'}} className="mt-2">Tip: Drag & drop files into the chat history area.</p>
          </div>
        </div>

        <aside className="card p-5">
          <h3 style={{marginTop:0}}>Demo Capabilities</h3>
          <ul style={{color:'#334155', lineHeight:1.7}}>
            <li>Message history (Redux + localStorage)</li>
            <li>Typing indicators & status transitions</li>
            <li>File attachments (client-side)</li>
            <li>Search & filter</li>
            <li>Mock API responses</li>
          </ul>
          <div style={{borderTop:'1px solid #e2e8f0',marginTop:12,paddingTop:12,color:'#475569'}}>
            This demo focuses on UX polish and responsiveness. The API is mocked for fast iteration.
          </div>
        </aside>
      </section>
    </div>
  )
}
