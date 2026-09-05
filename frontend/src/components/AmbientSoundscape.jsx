import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AmbientSoundscape() {
  const { isHindi } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState('temple'); // 'temple' | 'sitar' | 'flute'
  const [volume, setVolume] = useState(0.35);
  const [showMenu, setShowMenu] = useState(false);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const timerRef = useRef(null);

  // Initialize Web Audio Engine
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Stop all active procedural sound generators
  const stopSoundscape = () => {
    oscillatorsRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        }, 500);
      } catch (e) {}
    });
    oscillatorsRef.current = [];
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start procedural Indian classical soundscape based on preset
  const startSoundscape = (currentPreset = preset) => {
    initAudio();
    stopSoundscape();

    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    const now = ctx.currentTime;

    if (currentPreset === 'temple') {
      // Procedural Tanpura Drone in D# (Sa: ~155.56Hz, Pa: ~233.08Hz, Tar Sa: ~311.13Hz)
      const baseFreqs = [155.56, 155.56 * 1.5, 155.56 * 2, 155.56 * 2.5];
      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600 + idx * 200, now);

        // Slow organic breathing LFO for natural shimmer
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.15 + idx * 0.05, now);
        lfoGain.gain.setValueAtTime(0.04, now);
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        lfo.start(now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.15 / (idx + 1), now + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start(now);

        oscillatorsRef.current.push({ osc, gain, lfo });
      });

      // Occasional gentle temple bell chime every 8-12 seconds
      timerRef.current = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
        const bellTime = audioCtxRef.current.currentTime;
        const bellOsc = audioCtxRef.current.createOscillator();
        const bellGain = audioCtxRef.current.createGain();

        bellOsc.type = 'sine';
        bellOsc.frequency.setValueAtTime(1174.66, bellTime); // D6 bell
        bellGain.gain.setValueAtTime(0.06, bellTime);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, bellTime + 3.5);

        bellOsc.connect(bellGain);
        bellGain.connect(masterGainRef.current);
        bellOsc.start(bellTime);
        bellOsc.stop(bellTime + 3.6);
      }, 9000);
    } else if (currentPreset === 'sitar') {
      // Warm string resonance (Kharaj, Pancham, Gandhar)
      const sitarFreqs = [146.83, 220.0, 277.18, 293.66];
      sitarFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.8, now);
        filter.Q.setValueAtTime(3.5, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start(now);

        oscillatorsRef.current.push({ osc, gain });
      });
    } else {
      // Bamboo Flute (Bansuri) airy harmonics in C#
      const fluteFreqs = [277.18, 554.37, 830.61];
      fluteFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Breath vibrato
        const vibrato = ctx.createOscillator();
        const vibGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(4.5, now);
        vibGain.gain.setValueAtTime(2.5, now);
        vibrato.connect(vibGain);
        vibGain.connect(osc.frequency);
        vibrato.start(now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + 1.5);

        osc.connect(gain);
        gain.connect(master);
        osc.start(now);

        oscillatorsRef.current.push({ osc, gain, vibrato });
      });
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSoundscape();
      setIsPlaying(false);
    } else {
      startSoundscape(preset);
      setIsPlaying(true);
    }
  };

  const handlePresetChange = (newPreset) => {
    setPreset(newPreset);
    if (isPlaying) {
      startSoundscape(newPreset);
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(newVol, audioCtxRef.current.currentTime + 0.1);
    }
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  const presetsInfo = {
    temple: { label: isHindi ? 'मंदिर तानपुरा व घंटियाँ' : 'Temple Serenity (Tanpura)', icon: '🕉️' },
    sitar: { label: isHindi ? 'दरबारी सितार व संतूर' : 'Royal Court (Sitar)', icon: '🪕' },
    flute: { label: isHindi ? 'वैदिक बांसुरी' : 'Vedic Flute (Bansuri)', icon: '🍃' },
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/90 p-1 shadow-xs backdrop-blur-md">
        {/* Play / Pause Pill */}
        <button
          type="button"
          onClick={toggleSound}
          title={isPlaying ? 'Mute ambient soundscape' : 'Play ambient cultural soundscape'}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition duration-200 ${
            isPlaying
              ? 'bg-gradient-to-r from-amber-500 to-india-orange text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Animated Waveform */}
              <span className="flex items-end gap-0.5 h-3.5 w-3.5" aria-hidden="true">
                <span className="w-0.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                <span className="w-0.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
                <span className="w-0.5 bg-white rounded-full animate-bounce h-3.5" />
              </span>
              <span className="text-[11px] hidden sm:inline">{presetsInfo[preset].icon} Ambient</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span className="text-[11px] text-gray-500 hidden sm:inline">{isHindi ? 'ध्वनि' : 'Ambient'}</span>
            </>
          )}
        </button>

        {/* Settings Toggle */}
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          aria-label="Soundscape Settings"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Settings Dropdown Modal */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white p-4 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <span>🎵</span>
              <span>{isHindi ? 'भारतीय ध्वनि वातावरण' : 'Cultural Soundscape'}</span>
            </h4>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              Web Audio 4K
            </span>
          </div>

          {/* Sound Presets */}
          <div className="mt-3 space-y-1.5">
            {Object.entries(presetsInfo).map(([key, info]) => (
              <button
                key={key}
                type="button"
                onClick={() => handlePresetChange(key)}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                  preset === key
                    ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                </span>
                {preset === key && <span className="text-amber-600 font-bold">✓</span>}
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
              <span>{isHindi ? 'आवाज़' : 'Volume'}</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-india-orange"
            />
          </div>

          {/* Quick Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`mt-3 w-full rounded-xl py-2 text-xs font-bold transition shadow-xs ${
              isPlaying
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-india-navy text-white hover:bg-opacity-90'
            }`}
          >
            {isPlaying ? (isHindi ? 'ध्वनि बंद करें' : 'Mute Soundscape') : (isHindi ? 'ध्वनि शुरू करें' : 'Start Soundscape')}
          </button>
        </div>
      )}
    </div>
  );
}
