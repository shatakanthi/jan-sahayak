import React, { useState } from 'react';
import { MOCK_PROVIDER_APIS } from '../data/mockProviderApis';
import { Code, Server, ShieldCheck, ExternalLink, Check, Copy } from 'lucide-react';

export default function ProviderApiViewer() {
  const [selectedApiId, setSelectedApiId] = useState(MOCK_PROVIDER_APIS[0].providerId);
  const [copied, setCopied] = useState(false);

  const activeApi = MOCK_PROVIDER_APIS.find(a => a.providerId === selectedApiId) || MOCK_PROVIDER_APIS[0];

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(activeApi.schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Server className="w-3.5 h-3.5" />
          <span>Interoperable Provider API Layer</span>
        </div>
        <h2 className="text-xl font-bold text-white">Common Interface for Service Providers</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Demonstrates how external municipal, utility, transport, and health providers plug into the navigator without rebuilding legacy backends.
        </p>
      </div>

      {/* Select Provider API Buttons */}
      <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
        {MOCK_PROVIDER_APIS.map((api) => {
          const isActive = api.providerId === selectedApiId;
          return (
            <button
              key={api.providerId}
              onClick={() => setSelectedApiId(api.providerId)}
              className={`text-xs px-3.5 py-2 rounded-xl border transition font-medium text-left flex items-center space-x-2 ${
                isActive
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-semibold shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-purple-400" />
              <span>{api.providerName}</span>
            </button>
          );
        })}
      </div>

      {/* Active API Schema Viewer */}
      <div className="max-w-3xl mx-auto glass-panel p-5 rounded-3xl border border-purple-500/30 space-y-4">
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                {activeApi.method}
              </span>
              <h3 className="text-base font-bold text-white">{activeApi.providerName}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{activeApi.endpoint}</p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-emerald-400">{activeApi.status}</span>
            <div className="text-[11px] text-slate-400">Data Owner: {activeApi.dataOwner}</div>
          </div>
        </div>

        {/* JSON Schema Code View */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Code className="w-4 h-4 text-purple-400" />
              <span>Interoperable OpenAPI Response Schema</span>
            </span>

            <button
              onClick={handleCopySchema}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center space-x-1 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11px] text-slate-300 font-mono overflow-x-auto max-h-72">
            {JSON.stringify(activeApi.schema, null, 2)}
          </pre>
        </div>

      </div>

    </div>
  );
}
