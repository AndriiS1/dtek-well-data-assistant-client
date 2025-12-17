import { useEffect, useState } from "react";
import { fetchAssets } from "../../api/services/AssetService";
import type { Asset } from "../../types/asset";
import type { Device } from "../../types/device";

const HomePage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetchAssets().then(setAssets);
  }, []);

  const getDeviceItem = (device: Device) => {
    return (
      <li
        key={device.id}
        className="text-sm text-gray-600 flex justify-between"
      >
        <span>{device.name}</span>
        <span
          className={
            device.status === "online" ? "text-green-500" : "text-red-400"
          }
        >
          ●
        </span>
      </li>
    );
  };

  const getAssetItem = (asset: Asset) => {
    return (
      <div key={asset.id} className="group">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          {asset.name}
        </h3>

        <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
          {asset.devices.map((device) => getDeviceItem(device))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-50">
      <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Assets & Devices
        </h2>

        <div className="space-y-6">
          {assets.map((asset) => getAssetItem(asset))}
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-light text-gray-400">
          Select an asset to view analytics...
        </h1>
      </main>
    </div>
  );
};

export default HomePage;
