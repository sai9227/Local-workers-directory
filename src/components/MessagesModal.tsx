import React, { useState } from 'react';
import { X, Search, Phone, Send, MessageCircle, RefreshCw, CheckCheck, ShieldCheck } from 'lucide-react';
import { ChatThread } from '../data/mockData';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  threads: ChatThread[];
  activeThreadId: string;
  onSelectThread: (threadId: string) => void;
  onSendMessage: (threadId: string, text: string) => void;
  onShowToast: (msg: string) => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  isOpen,
  onClose,
  threads,
  activeThreadId,
  onSelectThread,
  onSendMessage,
  onShowToast,
}) => {
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(activeThread.id, inputText.trim());
    setInputText('');
    onShowToast('Message delivered to resident!');
  };

  const handleQuickReply = (text: string) => {
    onSendMessage(activeThread.id, text);
    onShowToast(`Sent: "${text}"`);
  };

  const filteredThreads = threads.filter(
    (t) =>
      t.residentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.residentAddress.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[115] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] animate-in fade-in zoom-in duration-150">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#006c49] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-heading font-bold text-slate-900">
                  Resident Messages &amp; Direct Chat
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006c49] text-[10px] font-bold">
                  Live Ward 14
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Real-time communication with verified local residents</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onShowToast('Inbox refreshed! All messages synced.')}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
              title="Refresh messages"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Split: Thread List & Active Conversation */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Threads Sidebar */}
          <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
            <div className="p-3 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resident conversations..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 outline-none focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredThreads.map((thread) => {
                const isActive = thread.id === activeThread.id;
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => onSelectThread(thread.id)}
                    className={`w-full p-3 text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50/70 border-l-4 border-[#006c49]'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#006c49] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {thread.residentInitials}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{thread.residentName}</h4>
                          <span className="text-[10px] text-slate-500 block truncate max-w-[130px]">
                            {thread.residentAddress}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">{thread.lastTime}</span>
                        {thread.unreadCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-bold">
                            {thread.unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-1">{thread.lastMessage}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chat Column */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Conversation Header */}
            <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006c49] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {activeThread.residentInitials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{activeThread.residentName}</h4>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-[#006c49] text-[10px] font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">{activeThread.residentAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onShowToast(`Calling ${activeThread.residentName} (+91 94401 23456)...`)}
                  className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#006c49] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast(`Opening WhatsApp chat with ${activeThread.residentName} (+91 94401 23456)...`)
                  }
                  className="px-2.5 py-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Chat Message Bubbles */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
              {activeThread.messages.map((m) => {
                const isFromWorker = m.sender === 'worker';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2 max-w-[85%] ${
                      isFromWorker ? 'ml-auto justify-end' : ''
                    }`}
                  >
                    {!isFromWorker && (
                      <div className="w-7 h-7 rounded-full bg-[#006c49] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {activeThread.residentInitials}
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl text-xs shadow-xs ${
                        isFromWorker
                          ? 'bg-[#006c49] text-white rounded-tr-none'
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                      }`}
                    >
                      <p>{m.text}</p>
                      <span
                        className={`text-[9px] block mt-1 text-right flex items-center justify-end gap-1 ${
                          isFromWorker ? 'text-emerald-200' : 'text-slate-400'
                        }`}
                      >
                        {m.time}
                        {isFromWorker && <CheckCheck className="w-3 h-3 inline" />}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick replies bar */}
            <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[10px] text-slate-400 font-semibold shrink-0">Quick reply:</span>
              <button
                type="button"
                onClick={() => handleQuickReply('I am on my way to Danavaipeta!')}
                className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 hover:border-[#006c49] text-[11px] text-slate-700 hover:text-[#006c49] shrink-0 transition-colors cursor-pointer"
              >
                I am on my way
              </button>
              <button
                type="button"
                onClick={() => handleQuickReply('Confirmed for 10:15 AM tomorrow.')}
                className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 hover:border-[#006c49] text-[11px] text-slate-700 hover:text-[#006c49] shrink-0 transition-colors cursor-pointer"
              >
                Confirmed for 10:15 AM
              </button>
              <button
                type="button"
                onClick={() => handleQuickReply('Please share the Gate OTP when I reach.')}
                className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 hover:border-[#006c49] text-[11px] text-slate-700 hover:text-[#006c49] shrink-0 transition-colors cursor-pointer"
              >
                Please share gate OTP
              </button>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message to resident..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-full border border-slate-200 outline-none focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[#006c49] text-white hover:bg-emerald-800 flex items-center justify-center shadow-xs cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
