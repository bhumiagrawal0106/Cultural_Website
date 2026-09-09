import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const SESSION_KEY = 'bd_chat_session';

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `s-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function ChatWidget() {
  const { ui, pickTuple, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState(() => [{ id: 'welcome', from: 'bot', text: null, welcome: true }]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, sending]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const send = async (text) => {
    const message = (text || input).trim();
    if (!message || sending) return;
    setInput('');
    const userMsg = { id: `u-${Date.now()}`, from: 'user', text: message };
    setMessages((m) => [...m, userMsg]);
    setSending(true);
    try {
      const res = await api.post('/api/chatbot/message', { message, sessionId: getSessionId() });
      setMessages((m) => [
        ...m,
        {
          id: `b-${Date.now()}`,
          from: 'bot',
          text: res.reply,
          escalate: res.escalate,
          phone: res.phone,
          links: res.links,
        },
      ]);
    } catch (err) {
      setMessages((m) => [...m, { id: `e-${Date.now()}`, from: 'bot', error: true, retry: message }]);
    } finally {
      setSending(false);
    }
  };

  const renderText = (m) => {
    if (m.welcome) return ui('chatWelcome');
    if (typeof m.text === 'string') return m.text;
    return pickTuple(m.text);
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? ui('chatClose') : ui('chatOpen')}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-india-orange text-india-text shadow-lg transition hover:scale-105 hover:bg-orange-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-india-navy/40"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
            <path d="M8 12h.01M12 12h.01M16 12h.01" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <section
          aria-label={ui('chatTitle')}
          className="fixed bottom-24 right-0 z-50 flex h-[70vh] max-h-[560px] w-full flex-col overflow-hidden bg-white shadow-2xl sm:right-5 sm:w-[380px] sm:rounded-2xl animate-fade-up"
        >
          <header className="flex items-center gap-3 bg-india-orange px-4 py-3 text-india-text">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg" aria-hidden="true">
              🤖
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">{ui('chatTitle')}</p>
              <p className="text-[11px] opacity-80">Online</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={ui('chatClose')} className="rounded p-1 hover:bg-white/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-india-bg px-3 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.error ? (
                  <button
                    type="button"
                    onClick={() => send(m.retry)}
                    className="max-w-[85%] rounded-2xl rounded-bl-sm border border-red-200 bg-red-50 px-3 py-2 text-left text-sm text-red-700"
                  >
                    {ui('chatError')}
                  </button>
                ) : m.escalate ? (
                  <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-india-green/30 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-india-green">{ui('connectCare')}</p>
                    <p className="mt-1 text-sm text-india-text">{renderText(m)}</p>
                    <a
                      href={`tel:${m.phone}`}
                      className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-india-green px-4 py-2.5 text-sm font-bold text-white hover:bg-green-700"
                    >
                      <span aria-hidden="true">📞</span> {ui('call')} {m.phone}
                    </a>
                    <p className="mt-2 text-center text-xs text-gray-500">{m.phone}</p>
                  </div>
                ) : (
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      m.from === 'user'
                        ? 'rounded-br-sm bg-india-green text-white'
                        : 'rounded-bl-sm border border-gray-100 bg-white text-india-text'
                    }`}
                    lang={m.from === 'bot' && lang === 'hi' ? 'hi' : undefined}
                  >
                    <p className="whitespace-pre-line">{renderText(m)}</p>
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.to}
                            to={l.to}
                            onClick={() => setOpen(false)}
                            className="chip bg-india-orange/20 text-india-navy hover:bg-india-orange/40"
                          >
                            {lang === 'hi' ? l.label_hi || l.label_en : l.label_en} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3 py-2.5 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t border-gray-100 bg-white px-3 pt-3">
              {['quick1', 'quick2', 'quick3'].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => send(k === 'quick3' ? 'talk to agent' : ui(k))}
                  className="chip border border-india-navy/20 bg-white text-india-navy hover:bg-india-navy/5"
                >
                  {ui(k)}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={ui('chatPlaceholder')}
              aria-label={ui('chatPlaceholder')}
              maxLength={500}
              className="input"
            />
            <button type="submit" disabled={sending || !input.trim()} className="btn-primary shrink-0" aria-label={ui('send')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </form>
        </section>
      )}
    </>
  );
}
