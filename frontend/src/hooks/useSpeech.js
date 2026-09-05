import { useCallback, useEffect, useState } from 'react';

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

export default function useSpeech() {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!supported) return undefined;
    return () => window.speechSynthesis.cancel();
  }, []);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text, lang = 'en') => {
      if (!supported || !text) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(utterance.lang.toLowerCase()));
      if (match) utterance.voice = match;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return { supported, speaking, speak, stop };
}
