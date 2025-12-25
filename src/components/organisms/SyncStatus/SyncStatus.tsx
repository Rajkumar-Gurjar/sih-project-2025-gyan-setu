import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOfflineSync } from '../../../hooks/useOfflineSync';
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * SyncStatus organism provides a visual indicator of the device's network
 * status and the background synchronization progress.
 */
export const SyncStatus: React.FC = () => {
  const { t } = useTranslation();
  const { isOnline, isSyncing, lastSyncError, triggerSync } = useOfflineSync();

  return (
    <div className="flex items-center gap-2">
      {/* Network Status Badge */}
      <div 
        className={`badge gap-1.5 py-3 px-3 transition-colors ${
          isOnline ? 'badge-success bg-success/10 text-success border-success/20' : 'badge-error bg-error/10 text-error border-error/20'
        }`}
      >
        {isOnline ? (
          <Wifi className="w-3.5 h-3.5" />
        ) : (
          <WifiOff className="w-3.5 h-3.5" />
        )}
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {isOnline ? t('sync.online') : t('sync.offline')}
        </span>
      </div>

      {/* Sync Action / Status */}
      <div className="flex items-center gap-2">
        {isSyncing ? (
          <div className="flex items-center gap-2 text-primary animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-xs font-medium hidden sm:inline">
              {t('sync.syncing')}
            </span>
          </div>
        ) : lastSyncError ? (
          <div className="flex items-center gap-2">
            <div className="tooltip tooltip-bottom tooltip-error" data-tip={lastSyncError}>
              <AlertCircle className="w-4 h-4 text-error" />
            </div>
            <button 
              onClick={triggerSync}
              className="btn btn-ghost btn-xs text-error hover:bg-error/10 gap-1 px-2"
            >
              <RefreshCw className="w-3 h-3" />
              {t('sync.retry')}
            </button>
          </div>
        ) : isOnline ? (
          <div className="flex items-center gap-1.5 text-success/70 py-1 px-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">
              {t('sync.synced')}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};