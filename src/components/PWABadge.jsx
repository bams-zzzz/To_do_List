import { useRegisterSW } from 'virtual:pwa-register/react'

export default function PWABadge() {
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {},
    // virtual hook returns arrays in modul; simplified here
  })

  // offlineReady and needRefresh are booleans from useRegisterSW
  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-3 border">
        {offlineReady && <p className="text-sm">Aplikasi siap digunakan offline</p>}
        {needRefresh && (
          <div className="flex gap-2">
            <button onClick={() => updateServiceWorker(true)} className="px-3 py-1 bg-blue-600 text-white rounded">Reload</button>
            <button onClick={() => updateServiceWorker(false)} className="px-3 py-1 border rounded">Close</button>
          </div>
        )}
      </div>
    </div>
  )
}
