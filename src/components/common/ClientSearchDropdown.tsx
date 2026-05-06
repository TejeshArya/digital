import { useState, useRef, useEffect } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  gstin?: string;
}

const mockClients: Client[] = [
  { id: '1', name: 'Acme Corporation', email: 'contact@acme.com', gstin: '27AABCU9603R1ZM' },
  { id: '2', name: 'TechStart Inc.', email: 'info@techstart.com', gstin: '29AABCT1332L1ZG' },
  { id: '3', name: 'Global Industries', email: 'sales@global.com', gstin: '24AABCG1234F1Z5' },
  { id: '4', name: 'Innovation Labs', email: 'hello@innovlabs.com', gstin: '07AABCI9638N1ZP' },
  { id: '5', name: 'Future Systems', email: 'contact@futuresys.com', gstin: '33AABCF1234M1ZT' },
  { id: '6', name: 'Digital Ventures', email: 'info@digitalvent.com', gstin: '09AABCD1234E1Z1' },
  { id: '7', name: 'Metro Solutions', email: 'support@metrosol.com', gstin: '27AABCM1234K1Z8' },
  { id: '8', name: 'Smart Tech Co.', email: 'contact@smarttech.com', gstin: '29AABCS1234H1Z3' },
];

interface ClientSearchDropdownProps {
  value: string;
  onChange: (clientId: string) => void;
}

export function ClientSearchDropdown({ value, onChange }: ClientSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedClient = mockClients.find(client => client.id === value);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.gstin?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (clientId: string) => {
    onChange(clientId);
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev < filteredClients.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredClients.length) {
          handleSelect(filteredClients[focusedIndex].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }}
        className={`w-full px-5 py-4 bg-white border-2 rounded-xl text-left flex items-center justify-between transition-all
          ${isOpen
            ? 'border-blue-500 ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
            : 'border-slate-200 hover:border-slate-300'
          }`}
      >
        <div className="flex-1 min-w-0">
          {selectedClient ? (
            <div>
              <div className="font-bold text-slate-900 text-base">{selectedClient.name}</div>
              <div className="text-sm text-slate-600 font-medium mt-0.5">{selectedClient.email}</div>
            </div>
          ) : (
            <span className="text-slate-500 font-medium">Select a client</span>
          )}
        </div>
        <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform ml-3 flex-shrink-0 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-3 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl max-h-96 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search clients by name, email, or GSTIN..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setFocusedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => handleSelect(client.id)}
                  className={`w-full px-5 py-4 text-left hover:bg-blue-50 transition-all duration-150 flex items-center justify-between group border-b border-slate-100 last:border-b-0
                    ${focusedIndex === index ? 'bg-blue-50' : ''}
                    ${value === client.id ? 'bg-blue-50' : ''}
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 text-base">{client.name}</div>
                    <div className="text-sm text-slate-600 font-medium mt-0.5">{client.email}</div>
                    {client.gstin && (
                      <div className="text-xs text-slate-500 mt-1.5 font-medium">GSTIN: {client.gstin}</div>
                    )}
                  </div>
                  {value === client.id && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-5 py-12 text-center text-slate-500">
                <p className="font-semibold">No clients found</p>
                <p className="text-sm mt-2">Try adjusting your search</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
